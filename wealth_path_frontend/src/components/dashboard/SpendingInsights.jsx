import DashboardCard from "./DashboardCard";

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

  const segments = [
    { color: "#153bfc", value: food, name: "food"},
    { color: "#65af51", value: rent, name:"rent"},
    { color: "#ffb200", value: transportation, name:"transportaiton"},
    { color: "#ffc3a0", value: entertainment, name:"entertainment" },
    { color: "#bfff0c", value: utilities, name:"utilities" },
    { color: "#bd0006", value: health, name:"health" },
    { color: "#a855ff", value: other, name:"other" },
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
      <div>
        <div className="text-2xl font-bold mb-3">SpendingInsights</div>
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
