import React, { useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import PaymentDetailsForm from './PaymentDetailsForm';
import { useDispatch, useSelector } from 'react-redux';
import { getPaymentDetails } from '../../State/Withdrawal/Action';

const PaymentDetails = () => {
  const { paymentDetails } = useSelector(store => store.withdrawal)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPaymentDetails({ jwt: localStorage.getItem("jwt") }))
  }, [dispatch])

  // Fungsi ini akan dipanggil setelah form berhasil disubmit
  const handleFormSubmit = () => {
    // setPaymentDetails(data);
    // setIsDetailsFilled(true);
  };

  return (
    <div className="px-10 sm:px-20 py-10">
      <h1 className="text-3xl font-bold mb-6">Payment Details</h1>

      {paymentDetails ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">{paymentDetails.bankName}</CardTitle>
            <CardDescription className="text-gray-600">
              A/C No: {paymentDetails.accountNumber}
            </CardDescription>
          </CardHeader>

          <CardContent className="mt-4 space-y-3">
            <div className="flex items-center">
              <p className="w-32 font-semibold">A/C Holder</p>
              <p className="text-gray-600">: {paymentDetails.accountHolderName}</p>
            </div>
            <div className="flex items-center">
              <p className="w-32 font-semibold">IFSC Code</p>
              <p className="text-gray-600">: {paymentDetails.ifsc}</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="py-6">Add payment details</Button>
          </DialogTrigger>
          <DialogContent aria-describedby="dialog-description">
            <DialogHeader>
              <DialogTitle>Add Payment Details</DialogTitle>
            </DialogHeader>
            <p id="payment-description" className="text-gray-500 mb-4">
              Please fill out the following form to add your payment details for processing.
            </p>
            <PaymentDetailsForm onSubmit={handleFormSubmit} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default PaymentDetails;
