import { AvatarImage } from '@radix-ui/react-avatar';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { BookmarkIcon, DotIcon } from 'lucide-react';
import { BookmarkFilledIcon } from '@radix-ui/react-icons';
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";
import TreadingForm from './TreadingForm';
import StockChart from '../Home/StockChart';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCoinDetails } from '../../State/Coin/Action';
import { addItemToWatchlist } from '../../State/Watchlist/Action';

const StockDetails = () => {
  const { coinDetails } = useSelector(store => store.coin);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    dispatch(fetchCoinDetails(id, jwt));
  }, [id, dispatch]);

  if (!coinDetails) {
    return <div>Loading...</div>;
  }

  const handleAddToWatchlist = async () => {
    try {
      await dispatch(addItemToWatchlist({
        coinId: coinDetails?.id,
        jwt: localStorage.getItem("jwt")
      }));
      setIsBookmarked(!isBookmarked); // Mengubah status bookmark jika berhasil
    } catch (error) {
      console.log("Gagal menambahkan ke watchlist", error);
    }
  };

  const { image, symbol, name, market_data } = coinDetails;

  return (
    <div className='p-5 mt-5'>
      <div className='flex justify-between'>
        <div className='flex gap-5 items-center'>
          <div>
            <Avatar>
              <AvatarImage
                src={image.large}>
              </AvatarImage>
            </Avatar>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p>{symbol}</p>
              <DotIcon className="text-gray-400" />
              <p className="text-gray-400">{name}</p>
            </div>
            <div className="flex items-end gap-2">
              <p className="text-xl font-bold">${market_data?.current_price?.usd || 'N/A'}</p>
              <p className={`text-center ${market_data?.market_cap_change_percentage_24h < 0 ? 'text-red-600' : 'text-green-600'}`}>
                <span>{market_data?.market_cap_change_24h || 'N/A'}</span>
                <span> ({market_data?.market_cap_change_percentage_24h || 0}%)</span>
              </p>
            </div>
          </div>
        </div>
        <div className='flex items-center gap-4'>
          <Button onClick={handleAddToWatchlist}>
            {isBookmarked ? (
              <BookmarkFilledIcon className='h-6 w-6' />
            ) : (
              <BookmarkIcon className='h-6 w-6' />
            )}
          </Button>
          <Dialog>
            <DialogTrigger>
              <Button size='lg'>Tread</Button>
            </DialogTrigger>
            <DialogContent aria-describedby="dialog-description">
              <DialogHeader>
                <DialogTitle>How Much Do you want to spend?</DialogTitle>
              </DialogHeader>
              <p id="treading-description" className="text-gray-500 mb-4">
                Please enter the amount you would like to spend for the treading process.
              </p>
              <TreadingForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className='mt-14'>
        <StockChart coinId={id} />
      </div>
    </div>
  );
}

export default StockDetails;
