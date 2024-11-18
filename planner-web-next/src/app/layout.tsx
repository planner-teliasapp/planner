import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import QueryContext from "@/contexts/query-context"
import { Mulish } from "next/font/google"

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// })
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// })

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
        <QueryContext>
          {children}
        </QueryContext>
      </body>
    </html>
  )
}
