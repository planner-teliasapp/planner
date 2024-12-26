import { autoUpdateTickersAction, createFixedIncomeAction, createOtherAssetsAction, createTickerAction, createTickerOrderAction, getFixedIncomesAction, getOtherAssetsAction, getTickerOrdersAction, getTickersAction } from "@/actions/assets"
import { updateAssetsHistoryForCurrentMonthAction } from "@/actions/assets/history/update-assets-history-for-current-month"
import { VariableIncome } from "@/models/assets"
import { Assets } from "@/models/assets/assets"
import { FixedIncome, FixedIncomes, ICreateFixedIncomeDto } from "@/models/assets/fixed-income"
import { ICreateOtherAssetDto, OtherAsset, OtherAssets } from "@/models/assets/other-asset"
import { CreateTickerDto, Ticker } from "@/models/assets/ticker"
import { CreateTickerOrderDto, TickerOrder } from "@/models/assets/ticker-order"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import { OthersAssetsTypes } from "@prisma/client"
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

      queryClient.invalidateQueries({ queryKey: ["assets", user?.id] })
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

      queryClient.invalidateQueries({ queryKey: ["assets", user?.id] })
    }
  })

  const { data: tickerOrders, isPending: isLoadingTickerOrders } = useQuery({
    queryKey: ["tickerOrders", user?.id],
    queryFn: async () => {
      if (!user) {
        throw new Error("User not found")
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

      queryClient.invalidateQueries({ queryKey: ["assets", user?.id] })
    },
  })

  const { mutateAsync: createFixedIncome, isPending: isCreatingFixedIncome } = useMutation({
    mutationKey: ["createFixedIncome"],
    mutationFn: async (data: ICreateFixedIncomeDto) => {
      if (!user) {
        return []
      }

      const result = await createFixedIncomeAction(data, user?.id)
      const fixedIncome = FixedIncome.fromString(result)

      queryClient.invalidateQueries({ queryKey: ["assets", user?.id] })
    },
  })

  const { mutateAsync: createOtherAssets, isPending: isCreatingOtherAssets } = useMutation({
    mutationKey: ["createOtherAssets"],
    mutationFn: async (data: ICreateOtherAssetDto) => {
      if (!user) {
        return []
      }

      const result = await createOtherAssetsAction(data, user?.id)
      const asset = OtherAsset.fromString(result)

      queryClient.invalidateQueries({ queryKey: ["assets", user?.id] })
    },
  })

  const { data: assets, isPending: isLoadingAssets } = useQuery({
    queryKey: ["assets", user?.id],
    queryFn: async () => {
      if (!user) {
        throw new Error("User not found")
      }

      const data = await getTickerOrdersAction(user?.id)
      const tempTickerOrders: TickerOrder[] = TickerOrder.orderOrdersByTicker(TickerOrder.fromStringArray(data), true)

      queryClient.setQueryData(["tickerOrders", user?.id], tempTickerOrders)
      const tickerOrdersWithMeanPrice = TickerOrder.includeMeanPrice(tempTickerOrders || [])

      const fixedIncomeData = await getFixedIncomesAction(user?.id)
      const fixedIncomes = FixedIncome.fromStringArray(fixedIncomeData)

      const otherAssetsData = await getOtherAssetsAction(user?.id)

      const variableIncome = new VariableIncome(tickers || [], tickerOrdersWithMeanPrice)
      const fixedIncome = new FixedIncomes(fixedIncomes)

      const otherAssets = OtherAsset.fromStringArray(otherAssetsData)

      const cashBoxItems = otherAssets.filter(item => item.type === OthersAssetsTypes.CASH_BOX)
      const pensionItems = otherAssets.filter(item => item.type === OthersAssetsTypes.PENSION)
      const propertyItems = otherAssets.filter(item => item.type === OthersAssetsTypes.PROPERTY)
      const shareItems = otherAssets.filter(item => item.type === OthersAssetsTypes.SHARE)
      const financialInjectionItems = otherAssets.filter(item => item.type === OthersAssetsTypes.FINANCIAL_INJECTION)

      const cashBox = new OtherAssets(cashBoxItems)
      const pension = new OtherAssets(pensionItems)
      const property = new OtherAssets(propertyItems)
      const share = new OtherAssets(shareItems)
      const financialInjection = new OtherAssets(financialInjectionItems)

      const assets = new Assets({
        variableIncome,
        fixedIncome,
        cashBox,
        pension,
        property,
        share,
        financialInjection
      })

      console.log("Assets To up", assets)
      await updateAssetsHistoryForCurrentMonthAction(JSON.stringify(assets), user.id)
      console.log("Assets Updated")

      return assets
    },
    staleTime: 60_000 * 10
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
    isCreatingTickerOrder,

    createFixedIncome,
    isCreatingFixedIncome,

    createOtherAssets,
    isCreatingOtherAssets,

    assets,
    isLoadingAssets
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
