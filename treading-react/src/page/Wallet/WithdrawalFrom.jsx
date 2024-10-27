import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import { useDispatch, useSelector } from 'react-redux';
import { getPaymentDetails, withdrawalRequest } from '../../State/Withdrawal/Action';

const WithdrawalForm = () => {
  const { paymentDetails, loading, error } = useSelector(store => store.withdrawal)
  const dispatch = useDispatch();
  const [amount, setAmount] = useState('');

  const handleChange = (e) => {
    setAmount(e.target.value);
  };

  useEffect(() => {
    dispatch(getPaymentDetails({ jwt: localStorage.getItem("jwt") }))
  }, [dispatch])

  const handleSubmit = () => {
    if (amount > 0) {
      dispatch(withdrawalRequest({ amount, jwt: localStorage.getItem("jwt") }));
      console.log(`Withdrawal Amount: $${amount}`);
    } else {
      console.log("Please enter a valid amount.");
    }
  };

  return (
    <div className='pt-10 space-y-5'>
      <div className='flex justify-between items-center rounded-md bg-slate-900 text-xl font-bold px-5 py-4'>
        <p>Available balance</p>
        {/* Nilai saldo sebaiknya diambil dari store atau API */}
        <p>$9000</p>
      </div>
      <div className='flex flex-col items-center'>
        <h1>Enter Withdrawal Amount</h1>
        <div className='flex items-center justify-center'>
          <Input
            onChange={handleChange}
            value={amount}
            className="withdrawalInput py-7 border-none outline-none px-0 text-2xl text-center"
            placeholder="$9999"
            type="number"
          />
        </div>
      </div>

      {error && <p className="text-red-500">{error}</p>} {/* Menampilkan error jika ada */}
      {loading && <p className="text-gray-500">Processing...</p>} {/* Menampilkan loading jika dalam proses */}

      <div>
        <p className="pb-2">Transfer to</p>
        {/* Pastikan paymentDetails ada sebelum menampilkannya */}
        {paymentDetails ? (
          <div className="flex items-center gap-5 border px-5 py-2 rounded-md">
            <img
              className="h-8 w-8"
              src="https://cdn.pixabay.com/photo/2020/02/18/11/03/bank-4859142_1280.png"
              alt="Bank Logo"
            />
            <div>
              <p className="text-xl font-bold">{paymentDetails?.bankName}</p>
              <p className="text-xs">{paymentDetails?.accountNumber}</p>
            </div>
          </div>
        ) : (
          <p className="text-red-500">No payment details available. Please add your payment details.</p>
        )}
      </div>
      <DialogClose className="w-full">
        <Button onClick={handleSubmit} className="w-full py-7 text-xl" disabled={loading}>
          {loading ? "Processing..." : "Withdraw"}  {/* Tombol berubah ketika loading */}
        </Button>
      </DialogClose>
    </div>
  );
};

export default WithdrawalForm;