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

export interface RecurringTransaction {
  id: string
  userId: string
  description: string
  referenceValue: number
  type: TransactionType
  paymentMethod: PaymentMethod
  frequency: TransactionFrequency
  expectedDayOfMonth: number
  expectedDayOfWeek: number
  expectedMonthOfYear: number
  startDate: Date
  endDate: Date
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

export class RecurringTransaction implements RecurringTransaction {
  public id: string
  public userId: string
  public description: string
  public referenceValue: number
  public type: TransactionType
  public paymentMethod: PaymentMethod
  public frequency: TransactionFrequency
  public expectedDayOfMonth: number
  public expectedDayOfWeek: number
  public expectedMonthOfYear: number
  public startDate: Date
  public endDate: Date
  public transactions: ITransaction[]

  constructor(data: RecurringTransaction) {
    Object.assign(this, data)
  }
}

export interface CreateTransactionDto {
  description: string
  amount: number
  date: Date
  type: TransactionType
  paymentMethod: PaymentMethod
}