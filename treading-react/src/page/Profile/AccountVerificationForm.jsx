import React, { useState } from 'react'
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogContent,
} from "@/components/ui/dialog"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Button } from '@/components/ui/button'

const AccountVerificationForm = () => {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    console.log(value);
  }

  return (
    <div className='flex justify-center'>
      <div className='space-y-5 mt-10 w-full'>
        <div className='flex justify-between items-center'>
          <p>Email :</p>
          <p>azizahmad@gmail.com</p>
          <Dialog>
            <DialogTrigger>
              <Button>Send OTP</Button>
            </DialogTrigger>
            <DialogContent aria-describedby="dialog-description">
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
              </DialogHeader>
              <p id="otp-description" className="text-gray-500 mb-4">
                Please enter the One-Time Password (OTP) sent to your registered number to proceed.
              </p>
              <div className='py-5 flex gap-10 justify-center items-center'>
                <InputOTP
                  value={value}
                  onChange={(value) => setValue(value)}
                  maxLength={6}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
                <DialogClose>
                  <Button onClick={handleSubmit} className="w-full py-7 text-xl">
                    Submit
                  </Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>

        </div>
      </div>
    </div>
  )
}

export default AccountVerificationForm