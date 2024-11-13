"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function GitHubButton() {
  return (
    <Button
      variant="secondary"
    // onClick={async () => await signIn('github', { callbackUrl: "/home" })}
    >
      <Image
        aria-hidden={true}
        src="/icons/github-white.svg"
        width={24}
        height={24}
        alt="github logo"
        className='fill-slate-100 stroke-slate-100 text-slate-100'
      />
      <span>GitHub</span>
    </Button>
  )
}