import DashboardCard from "./DashboardCard";
import { generateDateRange } from "./generateDateRange";

const SpendingInsights = () => {
  // example data
  const food = 400;
  const rent = 1200;
  const transportation = 50;
  const entertainment = 100;
  const utilities = 120;
  const health = 20;
  const other = 70;
  const totalExpense =
    food + rent + transportation + entertainment + utilities + health + other;

  
  // date selection

  const handleChange = (e) => {
 
    const start_date = JSON.parse(e.target.value).start_date;
    const end_date = JSON.parse(e.target.value).end_date
  };


  const dateRangeSelection = () => {
    const dateRanges = generateDateRange();

    return dateRanges.map((range, i) => (
      <option key={i} value={JSON.stringify(range)}>
        {range.label} ({range.start_date} - {range.end_date})
      </option>
    ));
  };

  // pie chart info
  const segments = [
    { color: "#153bfc", value: food, name: "food" },
    { color: "#65af51", value: rent, name: "rent" },
    { color: "#ffb200", value: transportation, name: "transportaiton" },
    { color: "#ffc3a0", value: entertainment, name: "entertainment" },
    { color: "#bfff0c", value: utilities, name: "utilities" },
    { color: "#bd0006", value: health, name: "health" },
    { color: "#a855ff", value: other, name: "other" },
  ];

  let startAngle = 0;
  const gradientStops = segments.map((seg) => {
    const endAngle = startAngle + (seg.value / totalExpense) * 360;
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
          <div className="text-2xl font-bold">SpendingInsights</div>
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
