"use client"

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z } from "@/lib/pt-zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import GitHubButton from "./_components/github_button"
import GoogleButton from "./_components/google_button"
import Image from "next/image"

const formSchema = z.object({
  email: z.string().email(),
})

export default function EntrarPage() {
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
    <div className='max-w-sm mx-auto space-y-8 flex flex-col w-full h-[80%] sm:h-full justify-center items-center relative'>
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

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className=''>
                <FormControl>
                  <Input type='email' placeholder='Digite seu email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='w-full mt-4'>Entrar com Email</Button>
        </form>
      </Form>

      <div>
        <p className='text-muted-foreground text-center text-sm'>Ao continuar você concorda com nossos Termos de Serviço e Política de Privacidade</p>
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