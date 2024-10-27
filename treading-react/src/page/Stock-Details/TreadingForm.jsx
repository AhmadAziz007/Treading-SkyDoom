import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DotIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserWallet } from "../../State/Wallet/Action";
import { getAssetDetails } from "../../State/Asset/Action";
import { payOrder } from "../../State/Order/Action";

const TreadingForm = () => {
  const [orderType, setOrderType] = useState("BUY");
  const [amount, setAmount] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();

  const { coinDetails } = useSelector((store) => store.coin);
  const { userWallet } = useSelector((store) => store.wallet);
  const { assetDetails } = useSelector((store) => store.asset); // Fix typo

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      dispatch(getUserWallet(jwt));

      if (coinDetails && coinDetails.id) {
        dispatch(
          getAssetDetails({
            coinId: coinDetails.id,
            jwt,
          })
        );
      }
    }
  }, [dispatch, coinDetails]);

  const handleChange = (e) => {
    const inputAmount = parseFloat(e.target.value);
    setAmount(inputAmount);

    if (coinDetails && coinDetails.market_data) {
      const volume = calculateBuyCost(
        inputAmount,
        coinDetails.market_data.current_price.usd
      );
      setQuantity(volume);
    }
  };

  const calculateBuyCost = (amount, price) => {
    if (!price || price === 0) return 0;
    let volume = amount / price;
    let decimalPlaces = Math.max(2, price.toString().split(".")[0].length);
    return parseFloat(volume.toFixed(decimalPlaces));
  };

  const handleBuyCrypto = () => {
    if (amount > 2000) return; // Prevent order if balance insufficient

    dispatch(
      payOrder({
        jwt: localStorage.getItem("jwt"),
        amount,
        orderData: {
          coinId: coinDetails?.id,
          quantity,
          orderType,
        },
      })
    );
  };

  if (!coinDetails) {
    return <div>Loading...</div>;
  }

  const { symbol, name, market_data } = coinDetails;

  return (
    <div className="space-y-10">
      {/* Input Amount */}
      <div>
        <div className="flex gap-4 items-center justify-between">
          <Input
            className="py-7 text-2xl focus:outline-none"
            placeholder="Enter Amount..."
            onChange={handleChange}
            value={amount} // Add value to control input
            type="number"
            name="amount"
          />
          <div className="flex items-center justify-center w-36 h-14 border rounded-md">
            <p className="text-2xl">{quantity}</p>
          </div>
        </div>
        {amount > 2000 && (
          <h1 className="text-red-700 text-center pt-4">
            Insufficient wallet balance to buy
          </h1>
        )}
      </div>

      {/* Coin Info */}
      <div>
        <div className="flex gap-5 items-center">
          <Avatar>
            <AvatarImage
              src={
                "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400"
              }
            />
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <p>{symbol}</p>
              <DotIcon className="text-gray-400" />
              <p className="text-gray-400">{name}</p>
            </div>
            <div className="flex items-end gap-2">
              <p className="text-xl font-bold">
                ${market_data?.current_price?.usd || "N/A"}
              </p>
              <p
                className={`text-center ${market_data?.market_cap_change_percentage_24h < 0
                  ? "text-red-600"
                  : "text-green-600"
                  }`}
              >
                <span>{market_data?.market_cap_change_24h || "N/A"}</span>
                <span>
                  {" "}
                  ({market_data?.market_cap_change_percentage_24h || 0}%)
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Type & Buttons */}
      <div>
        <div className="flex items-center justify-between">
          <p>Order Type</p>
          <p>Market Order</p>
        </div>
        <div className="flex items-center justify-between mt-8">
          <p>{orderType === "BUY" ? "Available Cash" : "Available Quantity"}</p>
          <p>
            {orderType === "BUY"
              ? "$" + userWallet?.balance
              : assetDetails?.quantity || 0}
          </p>
        </div>

        <div>
          <Button
            onClick={handleBuyCrypto}
            className={`w-full py-6 mt-8 ${orderType === "SELL"
              ? "bg-red-600 text-white"
              : "bg-green-600 text-white"
              }`}
            disabled={amount > 2000} // Disable button if balance insufficient
          >
            {orderType}
          </Button>
          <Button
            variant="link"
            className="w-full mt-5 text-xl"
            onClick={() => setOrderType(orderType === "BUY" ? "SELL" : "BUY")}
          >
            {orderType === "BUY" ? "Or Sell" : "Or Buy"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TreadingForm;
