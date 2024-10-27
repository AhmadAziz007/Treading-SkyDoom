import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'

const Signup = () => {

  const form = useForm({
    resolver: "",
    defaultValues: {
      email: ""
    }
  })

  const onSubmit = (data) => {
    console.log(data)
  }
  return (
    <div>
      <h1 className='text-xl font-bold text-center pb-3'>Forgot Password</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-4">
                  <FormLabel className="w-1/4">Email :</FormLabel>
                  <FormControl className="w-3/4">
                    <Input
                      className="border w-full border-gray-700 p-5"
                      placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full py-5">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default Signup