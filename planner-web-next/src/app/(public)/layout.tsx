import React, { PropsWithChildren } from "react"
import Image from "next/image"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"

export default async function PublicLayout({ children }: PropsWithChildren) {
  const { isAuthenticated } = getKindeServerSession()
  const isLoggedIn = await isAuthenticated()

  if (isLoggedIn) { redirect("/dashboard") }

  return (
    <main className='flex flex-row w-full h-screen px-10'>
      <div className='hidden sm:block w-1/2 relative rounded-2xl'>
        <Image
          src="/background/entrar-bg-image.webp"
          layout='fill'
          objectFit='cover'
          objectPosition='center'
          alt='imagem de fundo'
          className='rounded-2xl' />

      </div>
      {children}
    </main>
  )
}
