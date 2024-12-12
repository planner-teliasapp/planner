"use client"

import { buttonVariants } from "@/components/ui/button"
import { useAssets } from "@/hooks/use-assets"
import Link from "next/link"

export default function PatrimonioPage() {
  const { assets, isLoadingAssets } = useAssets()

  console.log(assets)

  return (
    <div>
      <h1>Patrimônio</h1>
      <div className="flex gap-4">
        <Link
          href={"patrimonio/tickers"}
          className={buttonVariants({
            className: "mt-4",
          })}
        >
          Tickers
        </Link>
        <Link
          href={"patrimonio/tickers/ordens"}
          className={buttonVariants({
            className: "mt-4",
          })}
        >
          Ordens
        </Link>
        <Link
          href={"patrimonio/renda-variavel"}
          className={buttonVariants({
            className: "mt-4",
          })}
        >
          Renda Variável
        </Link>
      </div>
      {isLoadingAssets ? (
        <div>Carregando...</div>
      ) : (
        <ul>
          {assets?.variableIncome.stocks.map((stock) => (
            <li key={stock.symbol} className="flex gap-2">
              <p>{stock.name}</p>
              <p>{stock.quantity}</p>
              <p>{stock.symbol}</p>
              <p>{stock.price}</p>
              <p>{stock.meanPrice}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
