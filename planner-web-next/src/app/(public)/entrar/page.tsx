"use client"

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z } from "@/lib/pt-zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { buttonVariants } from "@/components/ui/button"
import GitHubButton from "./_components/github_button"
import GoogleButton from "./_components/google_button"
import Image from "next/image"
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs"
import { useState } from "react"

const formSchema = z.object({
  email: z.string().min(3),
})

export default function EntrarPage() {
  const [input, setInput] = useState("")
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      form.reset()
    } catch (error) {
      throw error
    }
  }

  return (
    <div className='max-w-sm mx-auto space-y-8 flex flex-col w-full h-full justify-center items-center relative'>
      <div className='flex flex-col justify-start items-center sm:items-start w-full'>
        <h1 className='text-2xl font-bold'>Bem vindo ao Planner</h1>
        <p className='text-muted-foreground mt-2'>Selecione uma forma de entrar</p>
        <div className='mt-4 flex flex-col w-full sm:max-w-[244px] gap-2 mx-auto'>
          <GoogleButton />
          <GitHubButton />
        </div>
      </div>

      <div className='w-full flex flex-row justify-center items-center gap-4'>
        <div className='h-[1px] bg-muted-foreground flex-1'></div>
        <span className='uppercase text-muted-foreground text-xs'>ou continue com</span>
        <div className='h-[1px] bg-muted-foreground flex-1'></div>
      </div>
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='Digite seu email ou nome de usuário' />
      <LoginLink
        className={buttonVariants({
          variant: "default",
          size: "lg",
          className: "w-full mt-2",
        })}
        authUrlParams={{
          lang: "pt-BR",
          connection_id: process.env.KINDE_USERNAME_AND_PASSWORD_CONNECTION_ID || "",
          login_hint: input,
        }}
      >Continuar com Email ou Usuário</LoginLink>

      <div>
        <p className='text-muted-foreground text-center text-sm'>Ao continuar você concorda com nossos Termos de Serviço e Política de Privacidade</p>
      </div>

      <div className="border-2 border-destructive rounded-md p-4 w-full text-muted-foreground text-sm">
        <h2 className="text-lg font-bold text-foreground">Atenção Visitantes</h2>
        <p className="mt-2">Aplicação não está habilitada para novos cadastros públicos</p>
        <p className="mt-2">Para <strong>acesso de demonstração</strong> utlizar as credenciais:</p>
        <p className="font-bold">Usuário = convidado</p>
        <p className="font-bold">Senha = convidado</p>
        <p className="mt-2">Algumas funções ficam desabilitadas na conta de convidado e todos os dados são reiniciados semanalmente</p>
      </div>

      <div className='w-full mt-2 flex justify-center items-center gap-2 text-muted-foreground absolute bottom-0'>
        <p>Login gerenciado por</p>
        <a href='https://kinde.com/' target='_blank'>
          <Image
            src='/icons/kinde-logo.jpeg'
            alt='Kinde logo'
            width={56}
            height={56}
          />
        </a>
      </div>
    </div>
  )
}