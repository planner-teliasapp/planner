"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z } from "@/lib/pt-zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { useTasks } from "@/hooks/use-tasks"

interface Props {
  onSuccessfulSubmit?: () => void
}

export default function CreateTaskListForm({ onSuccessfulSubmit }: Props) {
  const formSchema = z.object({
    title: z.string().min(3).max(255),
  })

  const { createList, isCreatingList } = useTasks()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await createList(values)
      form.reset()
      if (onSuccessfulSubmit) { onSuccessfulSubmit() }
    } catch (error) {
      throw error
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className=''>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input type='text' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type='submit'
          className='w-full mt-4'
          isLoading={isCreatingList}
        >Adicionar</Button>
      </form>
    </Form>
  )
}