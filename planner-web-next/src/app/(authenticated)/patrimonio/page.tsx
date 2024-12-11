import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"

export default function PatrimonioPage() {
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
      </div>
    </div>
  )
}
