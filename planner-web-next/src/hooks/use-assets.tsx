import { getTickersAction } from "@/actions/assets"
import { Ticker } from "@/models/assets/ticker"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import { useQuery, useQueryClient } from "@tanstack/react-query"

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

  return {
    tickers,
    isLoadingTickers
  }
}