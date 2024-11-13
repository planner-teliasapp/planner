"use client"

import { buttonVariants } from "@/components/ui/button"
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs"
import Image from "next/image"

export default function GoogleButton() {
  return (
    <LoginLink
      className={buttonVariants({
        variant: "secondary",
        size: "lg",
        className: "w-full",
      })}
      authUrlParams={{
        lang: "pt-BR",
      }}
    >

      <Image
        aria-hidden={true}
        src="/icons/google.svg"
        width={24}
        height={24}
        alt="github logo"
      />
      <span>Google</span>

    </LoginLink>
  )
}