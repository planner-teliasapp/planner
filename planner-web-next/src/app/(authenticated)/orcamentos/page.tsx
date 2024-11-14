"use client"

import Link from "next/link"

export default function OrcamentosPage() {
  return (
    <div>
      <Link href={"orcamentos/mensal"}>
        <p>Este Mes</p>
      </Link>
    </div>
  )
}
