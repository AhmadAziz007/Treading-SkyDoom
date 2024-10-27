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
import { DialogClose } from '@/components/ui/dialog'
import { useDispatch } from 'react-redux'
import { addPaymentDetails } from '../../State/Withdrawal/Action'

const PaymentDetailsForm = () => {
  const dispatch = useDispatch();
  const form = useForm({
    resolver: "",
    defaultValues: {
      accountHolderName: "",
      ifsc: "",
      accountNumber: "",
      confirmAccountNumber: "",
      bankName: ""
    }
  })

  const onSubmit = (data) => {
    dispatch(addPaymentDetails({
      paymentDetails: data,
      jwt: localStorage.getItem("jwt")
    }))
    console.log(data);
  }
  return (
    <div className="px-10 py-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="accountHolderName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Holder Name</FormLabel>
                <FormControl>
                  <Input
                    className="border w-full border-gray-700 p-5"
                    placeholder="Input name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ifsc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>IFSC Code</FormLabel>
                <FormControl>
                  <Input
                    className="border w-full border-gray-700 p-5"
                    placeholder="confirm ifsc code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="accountNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Number</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    className="border w-full border-gray-700 p-5"
                    placeholder="*********8978" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmAccountNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Account Number</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    className="border w-full border-gray-700 p-5"
                    placeholder="confirm account number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bankName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Bank Name</FormLabel>
                <FormControl>
                  <Input
                    className="border w-full border-gray-700 p-5"
                    placeholder="Bank Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogClose className="w-full">
            <Button type="submit" className="w-full py-5">
              Submit
            </Button>
          </DialogClose>
        </form>
      </Form>
    </div>
  )
}

export default PaymentDetailsForm