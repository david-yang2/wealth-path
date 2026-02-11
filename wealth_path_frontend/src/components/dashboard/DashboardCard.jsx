const DashboardCard = ({ children }) => {
  return (
    <div className="
      bg-white
      rounded-2xl
      border border-gray-100
      shadow-sm
      p-6
      transition
      hover:shadow-md
    ">
      {children}
    </div>
  );
};

export default DashboardCard;
