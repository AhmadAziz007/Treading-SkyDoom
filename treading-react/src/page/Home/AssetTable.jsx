import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@/components/ui/table';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ScrollArea } from "@/components/ui/scroll-area"

const AssetTable = ({ coin, category = [] }) => {
  const navigate = useNavigate();

  return (
    <div>
      <Table>
        <ScrollArea className={`${category == "all" ? "h-[74vh]" : "h-[82vh]"}`}>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Coin</TableHead>
              <TableHead className="text-center">SYMBOL</TableHead>
              <TableHead className="text-center">VOLUME</TableHead>
              <TableHead className="text-center">MARKET CAP</TableHead>
              <TableHead className="text-center">24h</TableHead>
              <TableHead className="text-right">PRICE</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.isArray(coin) && coin.length > 0 ? (
              coin.map((item) => (
                <TableRow key={item.id}>
                  <TableCell onClick={() => navigate(`/market/${item.id}`)} className="font-medium flex items-center gap-2">
                    <Avatar className="-z-50">
                      <AvatarImage src={item.image} />
                    </Avatar>
                    <span>{item.name}</span>
                  </TableCell>
                  <TableCell>{item.symbol}</TableCell>
                  <TableCell>{item.total_volume}</TableCell>
                  <TableCell>{item.market_cap}</TableCell>
                  <TableCell>{item.price_change_percentage_24h}</TableCell>
                  <TableCell className="text-right">{item.current_price}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center">No data available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </ScrollArea>
      </Table>
    </div>
  );
};

AssetTable.propTypes = {
  coin: PropTypes.arrayOf(PropTypes.object),
};

export default AssetTable;
