import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { useState } from "react";

const DateRangePickerModal = (props) => {
  const [calendarStartDate, setCalendarStartDate] = useState(new Date());
  const [calendarEndDate, setCalendarEndDate] = useState(new Date());

  const {
    setCalendarToggle,
    getTransactions,
    setTransactions,
    setIsFiltered,
    setFormattedEnd,
    setFormattedStart,
    formattedEnd,
    formattedStart
  } = props;

  const todaysDate = new Date();

  const handleSelect = (ranges) => {
    setCalendarStartDate(ranges.selection.startDate);
    setCalendarEndDate(ranges.selection.endDate);
    console.log(ranges);
    // {
    //   selection: {
    //     startDate: [native Date Object],
    //     endDate: [native Date Object],
    //   }
    // }
  };

  // converting start date object to str

  const startYear = calendarStartDate.getFullYear();
  const startMonth = String(calendarStartDate.getMonth() + 1).padStart(2, "0");
  const startDay = String(calendarStartDate.getDate()).padStart(2, "0");

  setFormattedStart(`${startYear}-${startMonth}-${startDay}`);

  // converting end date object to str

  const endYear = calendarEndDate.getFullYear();
  const endMonth = String(calendarEndDate.getMonth() + 1).padStart(2, "0");
  const endDay = String(calendarEndDate.getDate()).padStart(2, "0");

  setFormattedEnd(`${endYear}-${endMonth}-${endDay}`);

  console.log(calendarStartDate);

  const applyDates = () => {
    console.log(formattedStart, formattedEnd);
    getTransactions(formattedStart, formattedEnd)
      .then((data) => setTransactions(data))
      .catch((err) => console.error(err));
    setCalendarToggle(false);
    setIsFiltered(true);
  };

  const selectionRange = {
    startDate: calendarStartDate,
    endDate: calendarEndDate,
    key: "selection",
  };

  return (
    <div id="date-range-modal">
      {/* back drop */}
      <div
        id="date-range-backdrop"
        onClick={(e) => {
          e.stopPropagation();
          setCalendarToggle(false);
        }}
        className="fixed inset-0 w-full h-full bg-slate-300/70 z-40"
      ></div>
      {/* DateRangePicker component */}
      <div
        className="absolute right-0 top-0 z-50 flex flex-col items-end"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <DateRangePicker
            ranges={[selectionRange]}
            onChange={handleSelect}
            maxDate={todaysDate}
          />
        </div>
        <button
          className="align-right bg-green-200"
          onClick={applyDates}
        >
          Apply Dates
        </button>
      </div>
    </div>
  );
};

export default DateRangePickerModal;
