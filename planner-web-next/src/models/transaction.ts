import { PaymentMethod, Prisma, TransactionFrequency, TransactionType } from "@prisma/client"

export interface ITransaction {
  id: string
  userId: string
  description: string
  amount: number
  date: Date
  type: TransactionType
  paymentMethod: PaymentMethod
}

export interface IRecurringTransaction {
  id: string
  userId: string
  description: string
  referenceValue: number
  type: TransactionType
  paymentMethod: PaymentMethod
  frequency: TransactionFrequency
  expectedDayOfMonth?: number | null
  expectedDayOfWeek?: number | null
  expectedMonthOfYear?: number | null
  startDate: Date
  endDate?: Date | null
  transactions: ITransaction[]
}

export interface ITransactionSummary {
  balance: number
  income: number
  expense: number
  invested: number
  wallet: number
  creditCard: number
}

export class Transaction implements ITransaction {
  public id: string
  public userId: string
  public description: string
  public amount: number
  public date: Date
  public type: TransactionType
  public paymentMethod: PaymentMethod

  constructor(data: ITransaction) {
    Object.assign(this, data)
  }

  static fromPrisma(data: Prisma.TransactionGetPayload<{

  }>): Transaction {
    return new Transaction({
      id: data.id,
      userId: data.userId,
      description: data.description,
      amount: Number(data.amount),
      date: data.date,
      type: data.type,
      paymentMethod: data.paymentMethod
    })
  }

  static fromString(data: string): Transaction {
    const parsedData = JSON.parse(data) as ITransaction
    return new Transaction(parsedData)
  }

  static fromStringArray(data: string, options?: { orderByData?: boolean }): Transaction[] {
    const parsedData = JSON.parse(data) as ITransaction[]
    const transactions = parsedData.map(transaction => new Transaction(transaction))

    return transactions
  }

  static orderByDate(transactions: Transaction[], asc?: boolean): Transaction[] {
    return transactions.sort((a, b) => {
      if (asc) {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      }

      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
  }

  static getSummary(transactions: Transaction[]): ITransactionSummary {
    const income = transactions.filter(transaction => transaction.type === TransactionType.INCOME).reduce((acc, transaction) => acc + transaction.amount, 0)
    const expense = transactions.filter(transaction => (transaction.type === TransactionType.EXPENSE && transaction.paymentMethod != PaymentMethod.CREDIT)).reduce((acc, transaction) => acc + transaction.amount, 0)
    const invested = transactions.filter(transaction => transaction.type === TransactionType.INVESTMENT || transaction.type === TransactionType.PENSION).reduce((acc, transaction) => acc + transaction.amount, 0)
    const wallet = transactions.filter(transaction => transaction.type === TransactionType.WALLET).reduce((acc, transaction) => acc + transaction.amount, 0)
    const creditCard = transactions.filter(transaction => transaction.paymentMethod === PaymentMethod.CREDIT).reduce((acc, transaction) => acc + transaction.amount, 0)

    const balance = income - expense - invested - wallet

    return {
      balance,
      income,
      expense,
      invested,
      wallet,
      creditCard
    }
  }
}

export class RecurringTransaction implements IRecurringTransaction {
  public id: string
  public userId: string
  public description: string
  public referenceValue: number
  public type: TransactionType
  public paymentMethod: PaymentMethod
  public frequency: TransactionFrequency
  public expectedDayOfMonth?: number | null
  public expectedDayOfWeek?: number | null
  public expectedMonthOfYear?: number | null
  public startDate: Date
  public endDate?: Date | null
  public transactions: ITransaction[]

  constructor(data: RecurringTransaction) {
    Object.assign(this, data)

    this.startDate = new Date(data.startDate)
    this.endDate = data.endDate ? new Date(data.endDate) : null
  }

  static fromPrisma(data: Prisma.RecurringTransactionGetPayload<{}>): RecurringTransaction {
    return new RecurringTransaction({
      id: data.id,
      userId: data.userId,
      description: data.description,
      referenceValue: Number(data.referenceValue),
      type: data.type,
      paymentMethod: data.paymentMethod,
      frequency: data.frequency,
      expectedDayOfMonth: data.expectedDayOfMonth,
      expectedDayOfWeek: data.expectedDayOfWeek,
      expectedMonthOfYear: data.expectedMonthOfYear,
      startDate: data.startDate,
      endDate: data.endDate,
      transactions: []
    })
  }

  static fromString(data: string): RecurringTransaction {
    const parsedData = JSON.parse(data) as IRecurringTransaction
    return new RecurringTransaction(parsedData)
  }

  static fromStringArray(data: string): RecurringTransaction[] {
    const parsedData = JSON.parse(data) as IRecurringTransaction[]
    const transactions = parsedData.map(transaction => new RecurringTransaction(transaction))

    return transactions
  }

  static getFromSpecificDate(transactions: RecurringTransaction[], date: Date): RecurringTransaction[] {
    return transactions.filter(transaction =>
      //Está entre a data de inicio e fim
      transaction.startDate <= date && (!transaction.endDate || transaction.endDate >= date)
      //A frequencia é mensal ou anual e está no mes correto
      && (transaction.frequency === TransactionFrequency.MONTHLY || (transaction.frequency === TransactionFrequency.YEARLY && transaction.expectedMonthOfYear === date.getMonth()))
    )
  }
}

export interface CreateTransactionDto {
  description: string
  amount: number
  date: Date
  type: TransactionType
  paymentMethod: PaymentMethod
  recurringTransactionId?: string
}

export interface CreateRecurringTransactionDto {
  description: string
  referenceValue: number
  type: TransactionType
  paymentMethod: PaymentMethod
  startDate: Date
  endDate?: Date
  frequency: TransactionFrequency
  expectedDayOfMonth?: number
  expectedDayOfWeek?: number
  expectedMonthOfYear?: number
}