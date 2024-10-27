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
import { useDispatch } from 'react-redux'
import { login } from '../../State/Auth/Action'
import { useNavigate } from 'react-router-dom'

const Signin = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const form = useForm({
    resolver: "",
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const onSubmit = (data) => {
    dispatch(login({ data, navigate }))
    console.log(data)
  }
  return (
    <div>
      <h1 className='text-xl font-bold text-center pb-3'>Login</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-4">
                  <FormLabel className="w-1/4">Email :</FormLabel >
                  <FormControl className="w-3/4">
                    <Input
                      className="border w-full border-gray-700 p-5 style={{ width: '300px' }} "
                      placeholder="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-4">
                  <FormLabel className="w-1/4">Password :</FormLabel>
                  <FormControl className="w-3/4">
                    <Input
                      className="border w-full border-gray-700 p-5 style={{ width: '300px' }} "
                      placeholder="*********" {...field} />
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

export default Signin