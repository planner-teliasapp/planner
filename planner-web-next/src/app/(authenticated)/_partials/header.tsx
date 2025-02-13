import React from "react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import UserButton from "./user-button"
import { ToggleThemeButton } from "@/components/ui/toggle-theme"

export default function AppHeader() {
  return (
    <header className='flex flex-row justify-between items-center w-full py-2 pl-2 pr-4 bg-popover'>
      <div className='flex gap-2 items-center'>
        <SidebarTrigger />
        <h1>Planner</h1>
      </div>
      <div className='flex gap-2'>
        <ToggleThemeButton />
        <UserButton />
      </div>
    </header>
  )
}
