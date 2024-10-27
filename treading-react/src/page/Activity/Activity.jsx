import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@/components/ui/table';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllOrdersForUser } from '../../State/Order/Action';
import { calculatteProfite } from '../../Util/calculatteProfite';

const Activity = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector(store => store.order);
  const jwt = localStorage.getItem('jwt');

  useEffect(() => {
    if (jwt) {
      dispatch(getAllOrdersForUser({ jwt }));
    }
  }, [dispatch, jwt])

  return (
    <div className="p-5 lg:px-20">
      <h1 className="font-bold text-3xl pb-5 text-left">Activity</h1>
      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Date & Time</TableHead>
            <TableHead className="text-left">Trading Pair</TableHead>
            <TableHead className="text-center">Buy Price</TableHead>
            <TableHead className="text-center">Selling Price</TableHead>
            <TableHead className="text-center">Order Type</TableHead>
            <TableHead className="text-center">Profit/Loss</TableHead>
            <TableHead className="text-right">Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length > 0 ? (
            orders.map((item) => {
              return (
                <TableRow key={item.id}>
                  <TableCell className="text-center">{new Date(item.timestamp).toLocaleString()}</TableCell>
                  <TableCell className="font-medium flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src={item.orderItem.coin.image} alt={item.orderItem.coin.name} className="w-10 h-10" />
                    </Avatar>
                    <span>{item.orderItem.coin.symbol.toUpperCase()}</span>
                  </TableCell>
                  <TableCell className="text-center">${item.orderItem.buyPrice.toLocaleString()}</TableCell>
                  <TableCell className="text-center">{item.orderItem.sellPrice > 0 ? `$${item.orderItem.sellPrice.toLocaleString()}` : '-'}</TableCell>
                  <TableCell className="text-center">{item.orderType}</TableCell>
                  <TableCell className="text-center">{calculatteProfite(item)}</TableCell>
                  <TableCell className="text-right">{item.price}</TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center">No activity found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Activity;