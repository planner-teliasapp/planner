"use client"

import { buttonVariants } from "@/components/ui/button"
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs"
import Image from "next/image"

export default function GitHubButton() {
  return (
    <LoginLink
      className={buttonVariants({
        variant: "secondary",
        size: "lg",
        className: "w-full",
      })}
      authUrlParams={{
        lang: "pt-BR",
        connection_id: process.env.KINDE_GITHUB_CONNECTION_ID || "",
      }}
    >

      <Image
        aria-hidden={true}
        src="/icons/github-white.svg"
        width={24}
        height={24}
        alt="github logo"
      />
      <span>Github</span>

    </LoginLink>
  )
}