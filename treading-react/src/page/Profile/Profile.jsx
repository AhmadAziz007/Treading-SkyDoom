import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card'
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { VerifiedIcon } from 'lucide-react'
import AccountVerificationForm from './AccountVerificationForm'
import { useSelector } from 'react-redux'

const Profile = () => {
  const { auth } = useSelector(store => store);
  const handleEnableTwoStepVerification = () => {
    console.log("two step verification")
  }

  return (
    <div className="flex flex-col items-center mb-5">
      <div className="pt-10 w-full lg:w-[70%]">
        <Card>
          <CardHeader>
            <CardTitle>Your Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="lg:flex gap-32">
              <div className='space-y-7'>
                <div className='flex'>
                  <p className='w-[9rem] text-left'>Emaiil :</p>
                  <p className='text-gray-500'>{auth.user?.email}</p>
                </div>
                <div className='flex'>
                  <p className='w-[9rem] text-left'>Full Name :</p>
                  <p className='text-gray-500'>{auth.user?.fullName}</p>
                </div>
                <div className='flex'>
                  <p className='w-[9rem] text-left'>Date of Birth :</p>
                  <p className='text-gray-500'>10/10/1994</p>
                </div>
                <div className='flex'>
                  <p className='w-[9rem] text-left'>National :</p>
                  <p className='text-gray-500'>Indonesia</p>
                </div>
              </div>
              <div className='space-y-7'>
                <div className='flex'>
                  <p className='w-[9rem] text-left'>Emaiil :</p>
                  <p className='text-gray-500'>{auth.user?.email}</p>
                </div>
                <div className='flex'>
                  <p className='w-[9rem] text-left'>Full Name :</p>
                  <p className='text-gray-500'>{auth.user?.fullName}</p>
                </div>
                <div className='flex'>
                  <p className='w-[9rem] text-left'>Date of Birth :</p>
                  <p className='text-gray-500'>10/10/1994</p>
                </div>
                <div className='flex'>
                  <p className='w-[9rem] text-left'>National :</p>
                  <p className='text-gray-500'>Indonesia</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className='mt-6'>
          <Card className='w-full'>
            <CardHeader className='pb-7'>
              <div className='flex items-center gap-3'>
                <CardTitle>2 Step Varification</CardTitle>
                {true ? <Badge className={"space-x-2 text-white bg-green-600"}>
                  <VerifiedIcon />
                  <span>
                    Enabled
                  </span>
                </Badge> : <Badge className='bg-orange-500'>
                  Disabled
                </Badge>}
              </div>
            </CardHeader>
            <CardContent>
              <div>
                <Dialog>
                  <DialogTrigger>
                    <Button>Enabled Two Step Verification</Button>
                  </DialogTrigger>
                  <DialogContent aria-describedby="dialog-description">
                    <DialogHeader>
                      <DialogTitle>Verification your account</DialogTitle>
                    </DialogHeader>
                    <p id="verification-description" className="text-gray-500 mb-4">
                      To enable two-step verification, please verify your account by entering the required information.
                    </p>
                    <AccountVerificationForm handleSubmit={handleEnableTwoStepVerification} />
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  )
}

export default Profile