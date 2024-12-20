import React from 'react';
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { DotFilledIcon } from '@radix-ui/react-icons';
import { Label } from '@/components/ui/label';
import { DialogClose } from '@radix-ui/react-dialog';
import { useDispatch } from 'react-redux';
import { paymentHandler } from '../../State/Wallet/Action';


const TopUpForm = () => {
  const [amount, setAmount] = React.useState('')
  const [paymentMethod, setPaymentMethod] = React.useState("PAYPAL")
  const dispatch = useDispatch();
  const handlePaymentMethodChange = (value) => {
    setPaymentMethod(value)
  }

  const handleChange = (e) => {
    setAmount(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !paymentMethod) {
      alert('Please fill in all fields');
      return;
    }
    dispatch(paymentHandler({
      jwt: localStorage.getItem("jwt"),
      paymentMethod,
      amount
    }));
    console.log(amount, paymentMethod);
  };

  return (
    <div className="pt-10 space-y-5">
      <div>
        <h1 className='pb-1'>Enter Amount</h1>
        <Input
          type="number"
          onChange={handleChange}
          value={amount}
          className="py-7"
          placeholder="$9999"
        />
      </div>

      <div>
        <h1 className='pb-1'>Select payment method</h1>
        <RadioGroup
          onValueChange={(value) => handlePaymentMethodChange(value)}
          className="flex"
          defaultValue="PAYPAL">

          <div className="flex items-center space-x-2 border p-3 px-5 rounded-md">

            <RadioGroupItem
              icon={DotFilledIcon}
              className="h-9 w-9"
              value="PAYPAL"
              id="r1"
            />
            <Label htmlFor="r1">
              <div className='bg-white rounded-md px-5 py-2 w-32'>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/120px-PayPal.svg.png?20230314142951" alt="" />
              </div>
            </Label>

          </div>

          <div className="flex items-center space-x-2 border p-3 px-5 rounded-md">

            <RadioGroupItem
              icon={DotFilledIcon}
              className="h-9 w-9"
              value="STRIPE"
              id="r1"
            />
            <Label htmlFor="r2">
              <div className='bg-white rounded-md px-5 w-32'>
                <img className="h-9" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/640px-Stripe_Logo%2C_revised_2016.svg.png" alt="" />
              </div>
            </Label>

          </div>
        </RadioGroup>
      </div>
      <DialogClose className="w-full">
        <Button onClick={handleSubmit} className="w-full py-7">
          Submit
        </Button>
      </DialogClose>
    </div>
  );
};

export default TopUpForm;
