import DashboardCard from "./DashboardCard";
import { generateDateRange } from "./generateDateRange";
import { getTotals } from "../transactionsApi";
import { useState, useEffect } from "react";

const SpendingInsights = () => {
  

  // get date ranges
  const dateRanges = generateDateRange();
  const initialStartDate = dateRanges[0].start_date
  const initialEndDate = dateRanges[0].end_date
  
  const [startDate, setStartDate] = useState(initialStartDate)
  const [endDate, setEndDate] = useState(initialEndDate)
  const [food, setFood] = useState(null)
  const [rent, setRent] = useState(null)
  const [transportation, setTransportation] = useState(null)
  const [entertainment, setEntertainment] = useState(null)
  const [utilities, setUtilities] = useState(null)
  const [health, setHealth] = useState(null)
  const [other, setOther] = useState(null)
  const [totalIncome, setTotalIncome] = useState(null)
  const [savings, setSavings] = useState(null)
  
  const totalExpense =
    food + rent + transportation + entertainment + utilities + health + other;

  // set initial data
  useEffect(() => {
    getTotals(startDate, endDate)
      .then((data) => {
        console.log(data)
        setFood(data.total_food)
        setRent(data.total_rent)
        setTransportation(data.total_transportation)
        setEntertainment(data.total_entertainment)
        setUtilities(data.total_utilities)
        setHealth(data.total_health)
        setOther(data.total_other)
        setTotalIncome(data.total_income)
        const savingsCalc = data.total_income - data.total_food - data.total_rent - data.total_transportation - data.total_entertainment - data.total_utilities - data.total_health - data.total_other 
        setSavings(savingsCalc)
      })
      .catch((err) => console.error(err))
  }, [startDate, endDate])
  


  // date selection
  const handleChange = async (e) => {
 
    setStartDate(JSON.parse(e.target.value).start_date)
    setEndDate(JSON.parse(e.target.value).end_date)
  };


  const dateRangeSelection = () => {

    return dateRanges.map((range, i) => (
      <option key={i} value={JSON.stringify(range)}>
        {range.label}
      </option>
    ));
  };

  // pie chart info
  const segments = [
    { color: "#808080", value: rent, name: "rent" },
    { color: "#153bfc", value: food, name: "food" },
    { color: "#ffb200", value: transportation, name: "transportaiton" },
    { color: "#ffc3a0", value: entertainment, name: "entertainment" },
    { color: "#bfff0c", value: utilities, name: "utilities" },
    { color: "#bd0006", value: health, name: "health" },
    { color: "#a855ff", value: other, name: "other" },
    { color: "#90EE90", value: savings, name:"savings"}
  ];

  let startAngle = 0;
  const gradientStops = segments.map((seg) => {
    const endAngle = startAngle + (seg.value / totalIncome) * 360;
    const result = `${seg.color} ${startAngle}deg ${endAngle}deg`;
    startAngle = endAngle;
    return result;
  });

  const renderLegends = () => {
    return segments.map((item, index) => (
      <div key={index} className="flex items-center">
        <div
          className="w-3 h-3 rounded-full mr-2"
          style={{ backgroundColor: item.color }}
        ></div>
        <div>{item.name}</div>
      </div>
    ));
  };

  return (
    <DashboardCard>
      <div className="flex flex-col justify-between h-full">
        {/* Title + Dropdown */}
        <div className="flex w-full items-center justify-between mb-3">
          <div className="text-2xl font-bold">Monthly Spending Insights</div>
          <select className="px-5 py-1 rounded-lg" onChange={handleChange}>
            <option value="">-- Select a range --</option>
            {dateRangeSelection()}
          </select>
        </div>
        {/* content */}
        <div className="w-full flex justify-between">
          {/* piechart */}
          <div
            className="w-[50%] aspect-square rounded-full"
            style={{
              background: `conic-gradient(${gradientStops.join(", ")})`,
            }}
          ></div>
          <div className="flex flex-col">
            {/* legends */}

            {renderLegends()}
          </div>
        </div>
      </div>
    </DashboardCard>
  );
};

export default SpendingInsights;
