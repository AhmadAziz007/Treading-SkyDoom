import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts';
import { Button } from "@/components/ui/button"
import { useDispatch, useSelector } from 'react-redux';
import { fetchMarketChart } from '../../State/Coin/Action';

const timeSeries = [
  {
    keyword: "DIGITAL_CURRENCY_DAILY",
    Key: "Time Series (Daily)",
    label: "1 Day",
    value: 1,
  },
  {
    keyword: "DIGITAL_CURRENCY_DAILY",
    Key: "Weekly Times Series",
    label: "1 Week",
    value: 7,
  },
  {
    keyword: "DIGITAL_CURRENCY_DAILY",
    Key: "Monthly Times Series",
    label: "1 Month",
    value: 30,
  },
];

const StockChart = ({ coinId }) => {
  const dispatch = useDispatch();
  const { marketChart } = useSelector(store => store.coin);
  const [activeLabel, setActiveLabel] = useState("1 Day");

  const series = marketChart?.data?.length ? [{ data: marketChart.data }] : [{ data: [] }]; // Periksa data sebelum menampilkan chart

  const handleActiveLabel = (label, value) => {
    setActiveLabel(label);
    const jwt = localStorage.getItem("jwt");
    dispatch(fetchMarketChart({ coinId, days: value, jwt }));
  };

  const options = {
    chart: {
      id: "area-datetime",
      type: "area",
      height: 350,
      zoom: {
        autoScaleYaxis: true
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      type: "datetime",
      tickAmount: 6
    },
    colors: ["#758AA2"],
    market: {
      colors: ["#fff"],
      strokeColor: "#fff",
      size: 0,
      strokeWith: 1,
      stockeDashArray: 0,
      style: "hollow"
    },
    tooltip: {
      theme: "dark"
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100]
      }
    },
    grid: {
      borderColor: "#4753SE",
      strokeDashArray: 4,
      show: true
    }
  };

  useEffect(() => {
    const selectedTime = timeSeries.find(item => item.label === activeLabel);
    if (selectedTime && coinId) {
      const jwt = localStorage.getItem("jwt");
      dispatch(fetchMarketChart({ coinId, days: selectedTime.value, jwt }));
    }
  }, [dispatch, coinId, activeLabel]);

  return (
    <div>
      <div className="flex gap-4 mb-4">
        {timeSeries.map(({ label, value }) => (
          <Button
            key={label}
            variant={label === activeLabel ? "solid" : "outline"}
            className={label === activeLabel ? "bg-white text-black" : ""}
            onClick={() => handleActiveLabel(label, value)}
          >
            {label}
          </Button>
        ))}
      </div>
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={350}
      />
    </div>
  );
};

export default StockChart;
