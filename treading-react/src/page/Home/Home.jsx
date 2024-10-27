import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { DotIcon, MessageCircle } from 'lucide-react';
import { Cross1Icon } from '@radix-ui/react-icons';
import AssetTable from './AssetTable';
import StockChart from './StockChart';
import { useDispatch, useSelector } from 'react-redux';
import { getCoinList, getTop50CoinList } from '../../State/Coin/Action';
// import { useParams } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const [category, setCategory] = React.useState("all");
  const [showChat, setShowChat] = React.useState(false);
  const [messages, setMessages] = React.useState([
    { sender: 'bot', text: 'Hi, You can ask any crypto-related questions, like price, market cap, etc...' }
  ]);

  const { coinList, top50 } = useSelector(store => store.coin); // Changed from 'coins' to 'coinList'
  // const { id } = useParams();

  console.log(coinList)
  const [message, setMessage] = useState('');

  const handleCategory = (value) => {
    setCategory(value);
  };

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  const handleSendMessage = () => {
    if (message.trim() === '') return;

    const userMessage = { sender: 'user', text: message };
    setMessages([...messages, userMessage]);
    setMessage('');

    // Simulate bot response (replace this with actual logic)
    setTimeout(() => {
      const botResponse = { sender: 'bot', text: 'This is a placeholder bot response.' };
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    }, 1000);
  };

  useEffect(() => {
    if (category === "top50") {
      dispatch(getTop50CoinList())
    } else {
      dispatch(getCoinList(1))
    }
  }, [category, dispatch])

  // useEffect(() => {
  //   if (id) {
  //     dispatch(fetchCoinDetails(id));
  //   }
  // }, [id, dispatch]);

  // if (!coinDetails) {
  //   return <div>Loading...</div>;
  // }

  // const { image, symbol, name, market_data } = coinDetails;


  return (
    <div className='relative'>
      <div className='lg:flex'>
        {/* Left section: Category buttons and AssetTable */}
        <div className='lg:w-[50%] lg:border-r'>
          <div className='p-3 flex items-center gap-4'>
            <Button
              onClick={() => handleCategory("all")}
              variant={category === "all" ? "default" : "outline"}
              className="rounded-full"
            >
              All
            </Button>
            <Button
              onClick={() => handleCategory("top50")}
              variant={category === "top50" ? "default" : "outline"}
              className="rounded-full"
            >
              Top 50
            </Button>
            <Button
              onClick={() => handleCategory("topGainers")}
              variant={category === "topGainers" ? "default" : "outline"}
              className="rounded-full"
            >
              Top Gainers
            </Button>
            <Button
              onClick={() => handleCategory("topLosers")}
              variant={category === "topLosers" ? "default" : "outline"}
              className="rounded-full"
            >
              Top Losers
            </Button>
          </div>
          {/* file AssetTable */}
          <AssetTable coin={category == "all" ? coinList : top50} category={category} />
        </div>

        {/* Right section: StockChart and Ethereum display */}
        <div className='lg:w-[50%] p-5'>

          {/* file StockChart */}
          <StockChart coinId={"bitcoin"} />
          <div className='flex gap-5 items-center'>
            <div>
              <Avatar>
                <AvatarImage
                  src={"https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400"}>
                </AvatarImage>
              </Avatar>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p>BTC</p>
                <DotIcon className="text-gray-400" />
                <p className="text-gray-400">Bitcoin</p>
              </div>
              {/* <div className="flex items-end gap-2">
                <p className="text-xl font-bold">$5464</p>
                <p className="text-red-600">
                  <span>-1319049822.578</span>
                  <span>(-0.29803%)</span>
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </div>


      {/* Chat Bot Section */}
      <section className="absolute bottom-5 right-5 z-40 flex flex-col justify-end items-end gap-2">
        {showChat && (
          <div className="rounded-md w-[20rem] md:w-[25rem] lg:w-[25rem] h-[70vh] bg-slate-900 shadow-lg border border-gray-700">
            <div className="flex justify-between items-center border-b px-6 h-[12%] bg-gray-800">
              <p className="text-white">Chat Bot</p>
              <Button variant="ghost" size="icon" onClick={toggleChat}>
                <Cross1Icon className="text-white" />
              </Button>
            </div>
            <div className="h-[76%] flex flex-col overflow-y-auto gap-5 py-2 px-4 bg-gray-900 text-white">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg max-w-[75%] ${msg.sender === 'user' ? 'bg-gray-600 self-end' : 'bg-gray-700 self-start'}`}
                >
                  <p>{msg.text}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-2 p-3 bg-gray-800">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 bg-gray-700 text-white p-2 rounded-md"
                placeholder="Type a message..."
              />
              <Button onClick={handleSendMessage} className="rounded-full">
                Send
              </Button>
            </div>
          </div>
        )}

        <Button className="w-[10rem] h-[3rem] flex items-center gap-2 bg-blue-600 text-white" onClick={toggleChat}>
          <MessageCircle size={30} className="fill-current text-white -rotate-90" />
          <span className="text-lg">Chat Bot</span>
        </Button>
      </section>
    </div>
  );
};

export default Home;
