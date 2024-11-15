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
  public readonly completionRate: number

  public readonly createdAt: Date

  constructor(data: ITaskList) {
    Object.assign(this, data)

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
}

export interface CreateTaskListDto {
  title: string
}