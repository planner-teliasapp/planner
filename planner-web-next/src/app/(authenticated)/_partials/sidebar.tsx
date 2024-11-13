"use client"

import { HouseIcon, ListChecksIcon } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: HouseIcon
  },
  {
    title: "Tarefas",
    url: "/tarefas",
    icon: ListChecksIcon,
  },
]

export default function AppSidebar() {
  const { setOpenMobile } = useSidebar()
  const pathname = usePathname()
  const router = useRouter()

  function handleMenuClick(url: string) {
    setOpenMobile(false)
    router.push(url)
  }

  return (
    <Sidebar collapsible='icon'>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={pathname.startsWith(item.url)}
                    onClick={() => handleMenuClick(item.url)}
                    className="py-6"
                  >
                    {/* <Link href={item.url}> */}
                    <item.icon />
                    <span className="text-base">{item.title}</span>
                    {/* </Link> */}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
