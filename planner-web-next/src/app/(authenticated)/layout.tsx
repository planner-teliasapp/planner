import React, { PropsWithChildren } from "react"
import { redirect } from "next/navigation"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { SidebarProvider } from "@/components/ui/sidebar"
import AppSidebar from "./_partials/sidebar"
import AppHeader from "./_partials/header"

export default async function AuthenticatedLayout({ children }: PropsWithChildren) {
  const { isAuthenticated } = getKindeServerSession()
  const isLoggedIn = await isAuthenticated()

  if (!isLoggedIn) { redirect("/entrar") }

  return (
    <SidebarProvider className='flex flow-row w-full' defaultOpen={false}>
      <AppSidebar />
      <div className='w-full'>
        <AppHeader />
        <main className='p-4'>
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}


