import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@/components/ui/table';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserWarchlist, removeItemFromWatchlist } from '../../State/Watchlist/Action';
import { BookmarkFilledIcon } from '@radix-ui/react-icons';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';


const Watchlist = () => {
  const { items } = useSelector(store => store.watchlist)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    dispatch(getUserWarchlist({ jwt }));
  }, [dispatch, jwt]);

  const handleRemoveFromWatchlist = (coinId) => {
    dispatch(removeItemFromWatchlist({ coinId, jwt }));
  };

  return (
    <div className="p-5 mt-5 lg:px-20">
      <h1 className="font-bold text-3xl pb-5 text-left">Watchlist</h1>
      <div className='flex justify-between'>
        <Table className="border">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Coin</TableHead>
              <TableHead className="text-center">SYMBOL</TableHead>
              <TableHead className="text-center">VOLUME</TableHead>
              <TableHead className="text-center">MARKET CAP</TableHead>
              <TableHead className="text-center">24h</TableHead>
              <TableHead className="text-right">PRICE</TableHead>
              <TableHead className="text-right text-red-600">REMOVE</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length > 0 ? (
              items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell onClick={() => navigate(`/market/${item.id}/`)} className="font-medium flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src={item.image} />
                    </Avatar>
                    <span>{item.name}</span>
                  </TableCell>
                  <TableCell className="text-center">{item.symbol}</TableCell>
                  <TableCell className="text-center">{item.total_volume.toLocaleString()}</TableCell>
                  <TableCell className="text-center">{item.market_cap.toLocaleString()}</TableCell>
                  <TableCell className={`text-center ${item.price_change_percentage_24h < 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {item.price_change_percentage_24h.toFixed(2)}%
                  </TableCell>
                  <TableCell className="text-right">${item.current_price.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      onClick={() => handleRemoveFromWatchlist(item.id)}
                      size="icon"
                      className="h-10 w-10"
                    >
                      <BookmarkFilledIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center">No items in watchlist</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Watchlist;
