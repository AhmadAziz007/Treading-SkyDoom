import React from 'react';
import {
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useDispatch, useSelector } from 'react-redux';
import { transferMoney } from '../../State/Wallet/Action';

const TransferForm = () => {
  const dispatch = useDispatch();
  const { userWallet } = useSelector(store => store.wallet); // Perbaikan di sini

  const [formData, setFormData] = React.useState({
    amount: "",
    walletId: "",
    purpose: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  };


  const handleSubmit = () => {
    dispatch(transferMoney({
      jwt: localStorage.getItem('jwt'),
      walletId: formData.walletId,
      reqData: {
        amount: formData.amount,
        purpose: formData.purpose,
      }
    }))
    console.log(formData);
  };

  return (
    <DialogContent className="sm:max-w-[500px]" aria-describedby="dialog-description">
      <DialogHeader>
        <DialogTitle>Top Up Your Wallet</DialogTitle>
      </DialogHeader>

      <p id="top-up-description" className="text-gray-500 mb-4">
        Please fill out the form below to top up your wallet. Ensure the details are correct before submitting.
      </p>

      <div className="pt-1 space-x-5">
        <div>
          <h1 className='pb-1'>Enter Amount</h1>
          <Input
            name="amount"
            type="number"
            onChange={handleChange}
            value={formData.amount}
            className="p-y-7"
            placeholder="$9999"
          />
        </div>
      </div>
      <div className="pt-1 space-x-5">
        <div>
          <h1 className='pb-1'>Enter Wallet Id</h1>
          <Input
            name="walletId"
            onChange={handleChange}
            value={formData.walletId}
            className="py-7"
            placeholder="#ADER455"
          />
        </div>
      </div>

      <div className="pt-1 spacol-span-3ce-x-5">
        <div>
          <h1 className='pb-1'>Purpose</h1>
          <Input
            name="purpose"
            onChange={handleChange}
            value={formData.purpose}
            className="py-7"
            placeholder="gift for your friend"
          />
        </div>
      </div>

      <DialogClose className="w-full">
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit} className="w-full py-7">
            Submit
          </Button>
        </DialogFooter>
      </DialogClose>
    </DialogContent>
  );
};

export default TransferForm