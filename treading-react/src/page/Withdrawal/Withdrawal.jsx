import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@/components/ui/table';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWithdrawalHistory } from '../../State/Withdrawal/Action';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};


const Withdrawal = () => {
  const { history, loading, error } = useSelector(store => store.withdrawal)
  const dispatch = useDispatch();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      dispatch(getWithdrawalHistory(jwt)); // Ensure jwt exists before dispatching
    }
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  if (history.length === 0) return <p>No withdrawal history available.</p>;

  return (
    <div className="p-5 lg:px-20">
      <h1 className="font-bold text-3xl pb-5 text-left">Withdrawal</h1>
      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead className="text-left py-5">Date & Time</TableHead>
            <TableHead className="text-center">Method</TableHead>
            <TableHead className="text-center">Amount</TableHead>
            <TableHead className="text-center">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {history.map((item, index) => (
            <TableRow key={index}>
              {/* Format the date properly */}
              <TableCell className="text-left">{formatDate(item.date)}</TableCell>
              <TableCell className="text-center">BANK ****</TableCell>
              <TableCell className="text-center">${item.amount}</TableCell>
              <TableCell
                className={`text-center font-semibold ${item.status === 'Success' ? 'text-green-500' : 'text-red-500'}`}
              >
                {item.status}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Withdrawal