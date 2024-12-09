export class TickerAlreadyExists extends Error {
  constructor(...params: any[]) {
    super(...params)
    this.name = "TickerAlreadyExists"
    this.message = "Ticker already exists"
  }
}