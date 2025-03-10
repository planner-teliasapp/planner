import { autoUpdateTickersAction, createFixedIncomeAction, createOtherAssetsAction, createTickerAction, createTickerOrderAction, getAssetHistoryAction, getFixedIncomesAction, getOtherAssetsAction, getTickerOrdersAction, getTickersAction, massUpdateAssetsAction } from "@/actions/assets"
import { getBalanceStrategyAction, updateBalanceStrategyAction } from "@/actions/assets/balance-strategy/get-balance-strategy"
import { updateAssetsHistoryForCurrentMonthAction } from "@/actions/assets/history/update-assets-history-for-current-month"
import { VariableIncome } from "@/models/assets"
import { AssetBalanceStrategy } from "@/models/assets/asset-balance-strategy"
import { AssetHistory } from "@/models/assets/asset-history"
import { Assets } from "@/models/assets/assets"
import { FixedIncome, FixedIncomes, ICreateFixedIncomeDto } from "@/models/assets/fixed-income"
import { MassUpdatable } from "@/models/assets/mass-update"
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
      if (!user || user?.id === process.env.NEXT_PUBLIC_KINDE_GUEST_USER_ID) {
        throw new Error("Usuário não autorizado")
      }

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

      await updateAssetsHistoryForCurrentMonthAction(JSON.stringify(assets), user.id)

      return assets
    },
    staleTime: 60_000 * 10
  })

  const { mutateAsync: massUpdateAssets, isPending: isMassUpdatingAssets } = useMutation({
    mutationKey: ["massUpdateAssets"],
    mutationFn: async (data: MassUpdatable[]) => {
      if (!user) {
        return []
      }

      await massUpdateAssetsAction(data)

      queryClient.invalidateQueries({ queryKey: ["assets", user?.id] })
    },
  })

  const { data: assetHistory, isPending: isLoadingAssetHistory } = useQuery({
    queryKey: ["assetHistory", user?.id],
    queryFn: async () => {
      if (!user) {
        throw new Error("User not found")
      }

      const data = await getAssetHistoryAction(user?.id)
      const items = AssetHistory.fromStringArray(data)

      return items
    },
    staleTime: 60_000 * 10
  })

  const { data: balanceStrategy, isPending: isLoadingBalanceStrategy } = useQuery({
    queryKey: ["balanceStrategy", user?.id],
    queryFn: async () => {
      if (!user) {
        throw new Error("User not found")
      }

      const data = await getBalanceStrategyAction(user?.id)


      return AssetBalanceStrategy.fromString(data)
    },
    staleTime: 60_000 * 10
  })

  const { mutateAsync: updateAssetStrategy, isPending: isUpdatingAssetStrategy } = useMutation({
    mutationKey: ["updateAssetStrategy"],
    mutationFn: async (data: Partial<AssetBalanceStrategy>) => {
      if (!user) {
        return []
      }

      await updateBalanceStrategyAction(data, user.id)

      queryClient.invalidateQueries({ queryKey: ["balanceStrategy", user?.id] })
    },
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
    isLoadingAssets,
    assetHistory,
    isLoadingAssetHistory,
    massUpdateAssets,
    isMassUpdatingAssets,

    balanceStrategy,
    isLoadingBalanceStrategy,
    updateAssetStrategy,
    isUpdatingAssetStrategy
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
