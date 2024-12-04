import { Prisma, TaskStatus } from "@prisma/client"
import { Task } from "./task"

export interface ITaskList {
  id: string
  title: string
  tasks: Task[]

  createdAt: Date
}

export class TaskList implements ITaskList {
  public readonly id: string
  public title: string
  public tasks: Task[]
  public completionRate: number

  public readonly createdAt: Date

  constructor(data: ITaskList) {
    Object.assign(this, data)
    this.updateCompletionRate()
  }

  addTask(task: Task) {
    this.tasks.push(task)
    this.updateCompletionRate()
  }

  private updateCompletionRate() {
    const tasksCount = this.tasks.length
    const completedTasks = this.tasks.filter(task => task.status === TaskStatus.DONE).length
    this.completionRate = tasksCount === 0 ? 0 : completedTasks / tasksCount
  }

  static fromPrisma(data: Prisma.TaskListGetPayload<{
    include: {
      Tasks: {
        include: {
          TaskList: {
            select: {
              title: true,
              id: true
            }
          }
        }
      }
    }
  }>): TaskList {
    return new TaskList({
      id: data.id,
      title: data.title,
      tasks: data.Tasks.map(task => Task.fromPrisma(task)),
      createdAt: data.createdAt
    })
  }

  static fromTasks(data: Task[]): TaskList[] {
    const lists: TaskList[] = []

    data.forEach(task => {
      if (!task.listId || !task.listTitle) return
      const listIndex = lists.findIndex(list => list.id === task.listId)

      if (listIndex === -1) {
        lists.push(new TaskList({
          id: task.listId!,
          title: task.listTitle!,
          tasks: [task],
          createdAt: new Date()
        }))
      } else {
        lists[listIndex].addTask(task)
      }
    })

    return lists
  }
}

export interface CreateTaskListDto {
  title: string
}