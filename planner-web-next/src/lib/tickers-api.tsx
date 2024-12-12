import axios from "axios"
import { Ticker } from "@/models/assets/ticker"

export interface GlobalQuoteResponse {
  "Global Quote": GlobalQuote
}

export interface GlobalQuote {
  "01. symbol": string
  "02. open": string
  "03. high": string
  "04. low": string
  "05. price": string
  "06. volume": string
  "07. latest trading day": Date
  "08. previous close": string
  "09. change": string
  "10. change percent": string
}

export async function getUpdatedTicker(ticker: Ticker): Promise<Ticker | null> {
  try {
    const apiKey = process.env.ALPHA_VANTAGE_API_KEY

    const response = await axios.get<GlobalQuoteResponse>(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker.symbol}.SAO&apikey=${apiKey}`)

    if (!response || response.data["Global Quote"]["05. price"] === "0.0000") {
      return null
    }

    return new Ticker({
      ...ticker,
      price: parseFloat(response.data["Global Quote"]["05. price"]),
      change: parseFloat(response.data["Global Quote"]["09. change"]),
      changePercent: parseFloat(response.data["Global Quote"]["10. change percent"].replace("%", "")) / 100,
    })

  } catch (error) {
    throw new Error(`Error fetching ticker ${ticker}: ${error}`)
  }
}