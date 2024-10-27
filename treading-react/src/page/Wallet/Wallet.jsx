import {
  Dialog,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
  DialogContent,
} from '@/components/ui/dialog'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card"
import {
  CopyIcon,
  DollarSign,
  DownloadIcon,
  ShuffleIcon,
  UploadIcon,
  WalletIcon
} from 'lucide-react'
import { ReloadIcon, UpdateIcon } from '@radix-ui/react-icons'
import TopUpForm from './TopUpForm'
import TransferForm from './TransferForm'
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { depositMoney, getUserWallet, getWalletTransaction } from '../../State/Wallet/Action'
import WithdrawalForm from './WithdrawalFrom'
import { useLocation } from 'react-router-dom'

function useQuery () {
  return new URLSearchParams(useLocation().search);
}

const Wallet = () => {
  const dispatch = useDispatch();
  const { userWallet, loading, transaction } = useSelector((store) => store.wallet); // Ensure proper state destructuring
  const query = useQuery();
  const orderId = query.get('order_id');
  const paymentId = query.get('payment_id');
  const paypalPaymentId = query.get('paypal_payment_id');

  useEffect(() => {
    handleFetchUserWallet();
    handleFetchWalletTransaction();
  }, []);

  useEffect(() => {
    if (orderId) {
      dispatch(
        depositMoney({
          jwt: localStorage.getItem('jwt'),
          orderId,
          paymentId: paypalPaymentId || paymentId,
        })
      );
    }
  }, [orderId, paymentId, paypalPaymentId]);

  const handleFetchUserWallet = () => {
    dispatch(getUserWallet(localStorage.getItem('jwt')));
  };

  const handleFetchWalletTransaction = () => {
    dispatch(getWalletTransaction({ jwt: localStorage.getItem('jwt') }));
  };

  return (
    <div className="flex flex-col items-center">
      <div className="pt-10 w-full lg:w-[60%]">
        <Card>
          <CardHeader className="pb-9">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-5">
                <WalletIcon size={30} />
                <CardTitle className="text-2xl">My Wallet</CardTitle>
                <div className="flex items-center gap-2">
                  <p className="text-gray-200">#{userWallet?.id || 'N/A'}</p>
                  <CopyIcon size={12} className="cursor-pointer hover:text-slate-300" />
                </div>
              </div>
              <div>
                <ReloadIcon onClick={handleFetchUserWallet} className="w-6 h-6 cursor-pointer hover:text-gray-400" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="flex items-center">
                <DollarSign />
                <span className="text-2xl font-semibold">
                  {userWallet?.balance || 0}
                </span>
              </div>
            )}
            <div className="flex gap-7 mt-5">
              {/* Add Money Dialog */}
              <Dialog>
                <DialogTrigger>
                  <div className="h-24 w-24 hover:text-gray-400 cursor-pointer flex flex-col items-center justify-center rounded-md shadow-slate-800 shadow-md">
                    <UploadIcon />
                    <span className="text-sm mt-2">Add Money</span>
                  </div>
                </DialogTrigger>
                <DialogContent aria-describedby="dialog-description">
                  <DialogHeader>
                    <DialogTitle>Top Up Your Wallet</DialogTitle>
                  </DialogHeader>
                  <p id="top-up-description">Please fill the form below to top up your wallet.</p>
                  <TopUpForm />
                </DialogContent>
              </Dialog>

              {/* Withdrawal Dialog */}
              <Dialog>
                <DialogTrigger>
                  <div className="h-24 w-24 hover:text-gray-400 cursor-pointer flex flex-col items-center justify-center rounded-md shadow-slate-800 shadow-md">
                    <DownloadIcon />
                    <span className="text-sm mt-2">Withdrawal</span>
                  </div>
                </DialogTrigger>
                <DialogContent aria-describedby="dialog-description">
                  <DialogHeader>
                    <DialogTitle>Request Withdrawal</DialogTitle>
                  </DialogHeader>
                  <p id="withdrawal-description">Complete the form below to request a withdrawal.</p>
                  <WithdrawalForm />
                </DialogContent>
              </Dialog>

              {/* Transfer Dialog */}
              <Dialog>
                <DialogTrigger>
                  <div className="h-24 w-24 hover:text-gray-400 cursor-pointer flex flex-col items-center justify-center rounded-md shadow-slate-800 shadow-md">
                    <ShuffleIcon />
                    <span className="text-sm mt-2">Transfer</span>
                  </div>
                </DialogTrigger>
                <DialogContent aria-describedby="transfer-description">
                  <DialogHeader>
                    <DialogTitle>Transfer to other wallet</DialogTitle>
                  </DialogHeader>
                  <p id="transfer-description">Use the form below to transfer funds to another wallet.</p>
                  <TransferForm />
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Transaction History */}
        <div className="py-5 pt-10">
          <div className="flex gap-2 items-center pb-5">
            <h1 className="text-2xl font-semibold">History</h1>
            <UpdateIcon className="h-7 w-7 p-0 cursor-pointer hover:text-gray-400" />
          </div>
          <div className="span-y-5">
            {transaction.length > 0 ? (
              transaction.map((item, i) => (
                <div key={i}>
                  <Card className="px-5 flex justify-between items-center p-2">
                    <div className="flex items-center gap-5">
                      <Avatar>
                        <AvatarFallback>
                          <ShuffleIcon />
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h1>{item.type || item.purpose}</h1>
                        <p className="text-sm text-gray-500">{item.date}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-green-500">{item.amount}</p>
                    </div>
                  </Card>
                </div>
              ))
            ) : (
              <p>No transactions available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;