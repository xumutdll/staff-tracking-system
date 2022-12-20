import React, { useState } from "react";

const CalendarTable = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const tableRows = [];

  let currentDay = 1;

  for (let i = 0; i < 6; i++) {
    const tableCells = [];
    for (let j = 0; j < 7; j++) {
      if (currentDay > daysInMonth) {
        tableCells.push(<td key={j}></td>);
      } else {
        const dayClass =
          weekdays[j] === "Sun" || weekdays[j] === "Sat"
            ? "weekend"
            : "weekday";
        tableCells.push(
          <td key={j} className={dayClass}>
            {currentDay}
          </td>
        );
        currentDay++;
      }
    }
    tableRows.push(<tr key={i}>{tableCells}</tr>);
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName = monthNames[currentMonth];

  const handlePreviousClick = () => {
    const previousMonthDate = new Date(currentYear, currentMonth - 1, 1);
    setCurrentDate(previousMonthDate);
  };

  const handleNextClick = () => {
    const nextMonthDate = new Date(currentYear, currentMonth + 1, 1);
    setCurrentDate(nextMonthDate);
  };

  return (
    <div>
      <div>
        <button onClick={handlePreviousClick}>Previous</button>
        <span>
          {monthName} {currentYear}
        </span>
        <button onClick={handleNextClick}>Next</button>
      </div>
      <table>
        <thead>
          <tr>
            {weekdays.map((weekday, index) => (
              <th key={index}>{weekday}</th>
            ))}
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </div>
  );
};

export default CalendarTable;
