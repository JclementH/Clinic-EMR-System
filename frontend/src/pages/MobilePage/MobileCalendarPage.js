import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import { TextField } from "@mui/material";
import dayjs from "dayjs";

function MobileCalendarPage() {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    console.log(dayjs(date).format('MM-DD-YYYY'))
    setSelectedDate(date);
  };


  return (
    <div className="scale-[110%] ">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar value={selectedDate} onChange={(newValue) => handleDateChange(newValue)}/>
      </LocalizationProvider>
    </div>
  );
}

export default MobileCalendarPage;
