// import { Task, TaskCreateRequest, TaskUpdateRequest } from "@/models/task"
// import { TaskGroup, TaskGroupCreateRequest } from "@/models/task-group"
import { createTaskAction, getTasksAction } from "@/actions/tasks"
import { addTaskToListAction } from "@/actions/tasks/add-task-to-list"
import { createTaskListAction } from "@/actions/tasks/create-task-list"
import { deleteTaskAction } from "@/actions/tasks/delete-task"
import { deleteTaskListAction } from "@/actions/tasks/delete-task-list"
import { getTaskListsAction } from "@/actions/tasks/get-task-lists"
import { updateTaskAction } from "@/actions/tasks/update-task"
import { CreateTaskDto, ITask, Task, UpdateTaskDto } from "@/models/task"
import { CreateTaskListDto, ITaskList, TaskList } from "@/models/task-list"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useTasks = () => {
  const queryClient = useQueryClient()
  const { user } = useKindeBrowserClient()

  const { mutateAsync: createTask, isPending: isCreatingTask } = useMutation({
    mutationKey: ["createTask"],
    mutationFn: async (data: CreateTaskDto) => {
      if (!user) {
        throw new Error("User not found")
      }

      await createTaskAction(data, user.id)

      queryClient.invalidateQueries({
        queryKey: ["tasks"]
      })
      queryClient.invalidateQueries({
        queryKey: ["taskLists"]
      })
    }
  })

  const { data: tasks, isPending: isLoadingTasks } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      if (!user) {
        throw new Error("User not found")
      }

      const data = await getTasksAction(user.id)
      const parsedData = JSON.parse(data) as ITask[]

      return parsedData.map(task => new Task(task))
    },
    staleTime: 60_000 * 10
  })

  const { mutateAsync: updateTask, isPending: isUpdatingTask } = useMutation({
    mutationKey: ["updateTask"],
    mutationFn: async (data: UpdateTaskDto) => {
      const task = await updateTaskAction(data)
      const parsedTask = JSON.parse(task) as ITask

      queryClient.setQueryData(["tasks"], (data: Task[]) => {
        return replaceTask(data, new Task(parsedTask))
      })

      queryClient.invalidateQueries({
        queryKey: ["taskLists"]
      })
    }
  })

  const { mutateAsync: deleteTask } = useMutation({
    mutationKey: ["deleteTask"],
    mutationFn: async (taskId: string) => {

      await deleteTaskAction(taskId)

      queryClient.invalidateQueries({
        queryKey: ["tasks"]
      })
      queryClient.invalidateQueries({
        queryKey: ["taskLists"]
      })
    }
  })

  const { mutateAsync: createList, isPending: isCreatingList } = useMutation({
    mutationKey: ["createList"],
    mutationFn: async (data: CreateTaskListDto) => {
      if (!user) {
        throw new Error("User not found")
      }

      await createTaskListAction(data, user.id)

      queryClient.invalidateQueries({
        queryKey: ["taskLists"]
      })
    }
  })

  const { data: lists, isPending: isLoadingLists } = useQuery({
    queryKey: ["taskLists"],
    queryFn: async () => {
      if (!user) {
        throw new Error("User not found")
      }

      const data = await getTaskListsAction(user.id)
      const parsedData = JSON.parse(data) as ITaskList[]
      const lists = parsedData.map(list => new TaskList(list))
      const listsWithTasks = lists.map(list => {
        list.tasks = list.tasks.map(task => new Task(task))
        return list
      })

      return listsWithTasks
    },
    staleTime: 60_000 * 10
  })

  const { mutateAsync: addTaskToList } = useMutation({
    mutationKey: ["addTaskToGroup"],
    mutationFn: async ({ taskId, taskListId }: { taskId: string, taskListId: string }) => {
      const task = await addTaskToListAction({ taskId, taskListId })
      const parsedTask = JSON.parse(task) as ITask

      queryClient.setQueryData(["tasks"], (data: Task[]) => {
        return replaceTask(data, new Task(parsedTask))
      })

      queryClient.invalidateQueries({
        queryKey: ["taskLists"]
      })

      return
    }
  })

  const { mutateAsync: deleteList } = useMutation({
    mutationKey: ["deleteGroup"],
    mutationFn: async (groupId: string) => {

      await deleteTaskListAction(groupId)

      queryClient.invalidateQueries({
        queryKey: ["tasks"]
      })
      queryClient.invalidateQueries({
        queryKey: ["taskLists"]
      })
    }
  })

  return {
    tasks,
    isLoadingTasks,
    createTask,
    isCreatingTask,
    updateTask,
    isUpdatingTask,
    deleteTask,

    lists,
    isLoadingLists,
    createList,
    isCreatingList,
    addTaskToList,
    deleteList
  }
}

function replaceTask(data: Task[], task: Task): Task[] {
  return data.map(taskItem => {
    if (taskItem.id === task.id) {
      return task
    }
    return taskItem
  })
}