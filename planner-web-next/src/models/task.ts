import { Prisma, TaskStatus } from "@prisma/client"

export interface ITask {
  id: string
  title: string
  status: TaskStatus
  listId?: string
  listTitle?: string
  completedAt?: Date | null
  createdAt: Date
  updatedAt: Date
}

export class Task implements ITask {
  public readonly id: string
  public title: string
  public status: TaskStatus
  public listId?: string
  public listTitle?: string

  public completedAt?: Date | null
  public readonly createdAt: Date
  public readonly updatedAt: Date

  constructor(data: ITask) {
    Object.assign(this, data)
  }

  public toggleStatus(): TaskStatus {
    if (this.status === TaskStatus.DONE) {
      this.status = TaskStatus.PENDING
      this.completedAt = null
    } else {
      this.status = TaskStatus.DONE
      this.completedAt = new Date()
    }

    return this.status
  }

  static fromPrisma(data: Prisma.TaskGetPayload<{
    include: {
      TaskList: {
        select: {
          title: true,
          id: true
        }
      }
    }
  }>): Task {
    return new Task({
      id: data.id,
      title: data.title,
      status: data.status,
      listId: data.TaskList?.id,
      listTitle: data.TaskList?.title,
      completedAt: data.completedAt,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    })
  }

  static fromString(data: string): Task {
    const parsedData = JSON.parse(data) as ITask
    return new Task(parsedData)
  }
}

export interface CreateTaskDto {
  title: string
  listId?: string
}

export interface UpdateTaskDto extends Partial<CreateTaskDto> {
  id: string
  status?: TaskStatus
  completedAt?: Date | null
}