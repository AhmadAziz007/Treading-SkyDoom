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
import { getUserAssets } from '../../State/Asset/Action';

const Portfolio = () => {
  const dispatch = useDispatch();
  const { userAssets, loading, error } = useSelector((store) => store.asset);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      dispatch(getUserAssets(jwt));
    }
  }, [dispatch]);

  if (loading) {
    return <div>Loading Assets...</div>;
  }

  if (error) {
    return <div>Error fetching assets: {error}</div>;
  }

  if (userAssets.length === 0) {
    return <div>No assets availabel in your portfolio</div>;
  }

  return (
    <div className="p-5 lg:px-20">
      <h1 className="font-bold text-3xl pb-5 text-left">Portfolio</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ASSET</TableHead>
            <TableHead className="text-center">PRICE</TableHead>
            <TableHead className="text-center">UNIT</TableHead>
            <TableHead className="text-center">CHANGE</TableHead>
            <TableHead className="text-center">CHANGE(%)</TableHead>
            <TableHead className="text-right">VALUE</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userAssets.map((item) => {
            const { coin, quantity, buyPrice } = item;
            const value = (quantity * coin.current_price).toFixed(2);
            const change = (coin.current_price - buyPrice).toFixed(2);
            const changePercentage = (
              ((coin.current_price - buyPrice) / buyPrice) * 100).toFixed(2);
            return (
              <TableRow key={item.id}>
                <TableCell className="font-medium flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src={coin.image} alt={coin.name} className="w-10 h-10" />
                  </Avatar>
                  <span>{coin.name}</span>
                </TableCell>
                <TableCell className="text-center">${coin.current_price.toLocaleString()}</TableCell>
                <TableCell className="text-center">{quantity.toFixed(6)}</TableCell>
                <TableCell className={`text-center ${change < 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {change}
                </TableCell>
                <TableCell className={`text-center ${changePercentage < 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {changePercentage}%
                </TableCell>
                <TableCell className="text-right">${value.toLocaleString()}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default Portfolio;
