import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z } from "@/lib/pt-zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Task } from "@/models/task"

interface Props {
  task: Task | null
  onSuccessful?: () => void
}

export default function EditTaskForm({ task, onSuccessful }: Props) {
  const formSchema = z.object({
    title: z.string().min(3).max(255),
  })

  // const { updateTask, isUpdatingTask } = useTasks();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: task?.title || "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!task) { return }
    // await updateTask({ id: task.id, status: task.status, ...values })
    form.reset()
    if (onSuccessful) { onSuccessful() }
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
                <Input autoFocus type='text' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type='submit'
          className='w-full mt-4'
        // isLoading={isUpdatingTask}
        >Salvar</Button>
      </form>
    </Form>
  )
}