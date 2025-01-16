import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/react"
import "./globals.css"
import QueryContext from "@/contexts/query-context"
import { Mulish } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"

const mulish = Mulish({
  subsets: ["latin-ext"],
})

export const metadata: Metadata = {
  title: "Planner",
  description: "Planner",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className='dark'>
      <body
        className={`${mulish.className} antialiased`}
      >
        <Analytics />
        <QueryContext>
          {children}
          <Toaster />
        </QueryContext>
      </body>
    </html>
  )
}
