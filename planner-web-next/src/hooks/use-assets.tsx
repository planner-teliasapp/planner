import { autoUpdateTickersAction, createTickerAction, createTickerOrderAction, getTickerOrdersAction, getTickersAction } from "@/actions/assets"
import { CreateTickerDto, Ticker } from "@/models/assets/ticker"
import { CreateTickerOrderDto, TickerOrder } from "@/models/assets/ticker-order"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useAssets = () => {
  const queryClient = useQueryClient()
  const { user } = useKindeBrowserClient()

  const { data: tickers, isPending: isLoadingTickers } = useQuery({
    queryKey: ["tickers"],
    queryFn: async () => {
      const data = await getTickersAction()
      const items = Ticker.fromStringArray(data)

      return items
    },
    staleTime: 60_000 * 10
  })

  const { mutateAsync: createTicker, isPending: isCreatingTicker } = useMutation({
    mutationKey: ["createTicker"],
    mutationFn: async (data: CreateTickerDto) => {
      const result = await createTickerAction(data)
      const ticker = Ticker.fromString(result)

      queryClient.setQueryData(["tickers"], (curr: Ticker[]) => {
        return addCreatedTickerToTickers(curr, ticker)
      })
    }
  })

  const { mutateAsync: autoUpdateTickers, isPending: isAutoUpdatingTickers } = useMutation({
    mutationKey: ["autoUpdateTickers"],
    mutationFn: async () => {
      const result = await autoUpdateTickersAction()
      const tickers = JSON.parse(result) as Ticker[]

      queryClient.setQueryData(["tickers"], (curr: Ticker[]) => {
        return tickers.reduce((acc, t) => {
          return replaceTicker(acc, t)
        }, curr)
      })
    }
  })

  const { data: tickerOrders, isPending: isLoadingTickerOrders } = useQuery({
    queryKey: ["tickerOrders", user?.id],
    queryFn: async () => {
      if (!user) {
        return []
      }
      const data = await getTickerOrdersAction(user?.id)
      const items = TickerOrder.fromStringArray(data)

      return items
    },
    staleTime: 60_000 * 10
  })

  const { mutateAsync: createTickerOrder, isPending: isCreatingTickerOrder } = useMutation({
    mutationKey: ["createTickerOrder"],
    mutationFn: async (data: CreateTickerOrderDto) => {
      if (!user) {
        return []
      }

      const result = await createTickerOrderAction(data, user?.id)
      const ticker = TickerOrder.fromString(result)

      queryClient.setQueryData(["tickerOrders", user?.id], (curr: TickerOrder[]) => {
        return addCreatedTickerOrderToTickerOrders(curr, ticker)
      })
    }
  })

  return {
    tickers,
    isLoadingTickers,
    createTicker,
    isCreatingTicker,
    autoUpdateTickers,
    isAutoUpdatingTickers,

    tickerOrders,
    isLoadingTickerOrders,
    createTickerOrder,
    isCreatingTickerOrder
  }
}

function addCreatedTickerToTickers(tickers: Ticker[], ticker: Ticker): Ticker[] {
  return [ticker, ...tickers]
}

function replaceTicker(tickers: Ticker[], ticker: Ticker): Ticker[] {
  return tickers.map((t) => {
    if (t.id === ticker.id) {
      return ticker
    }

    return t
  })
}

function addCreatedTickerOrderToTickerOrders(tickerOrders: TickerOrder[], tickerOrder: TickerOrder): TickerOrder[] {
  return [tickerOrder, ...tickerOrders]
}
