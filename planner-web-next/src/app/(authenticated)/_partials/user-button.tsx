"use client"

import React from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogoutLink, useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"


export default function UserButton() {
  const { user } = useKindeBrowserClient()


  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='flex gap-1 justify-end items-center'>
        <Avatar className='w-8 h-8'>
          <AvatarImage src={user?.picture || undefined} />
          <AvatarFallback>{user?.given_name?.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <p className='ml-1'>{user?.given_name} {user?.family_name}</p>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem>
          <LogoutLink className='hover:bg-transparent w-full'>
            Sair
          </LogoutLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
