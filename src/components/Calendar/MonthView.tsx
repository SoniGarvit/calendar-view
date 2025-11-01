import React from "react";
import { CalendarCell } from "./CalendarCell";
import { getCalenderGrid } from "../../utils/date.utils";
import type { CalendarEvent } from "../../types/calendar.types";

interface MonthViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  selectedDate: Date | null;
  onDateClick: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
}

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const MonthView: React.FC<MonthViewProps> = ({
  currentDate,
  events,
  selectedDate,
  onDateClick,
  onEventClick,
}) => {
  const calendarGrid = getCalenderGrid(currentDate);

  const getEventsForDate = (date: Date): CalendarEvent[] => {
    return events.filter((curEvent) => {
      const eventStart = new Date(curEvent.startDate);
      const eventEnd = new Date(curEvent.endDate);
      eventStart.setHours(0, 0, 0, 0);
      eventEnd.setHours(23, 59, 59, 999);

      const checkDate = new Date(date);
      checkDate.setHours(12, 0, 0, 0);
      return checkDate >= eventStart && checkDate <= eventEnd;
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-2 sm:p-4">
      <div className="grid grid-cols-7 border-b border-neutral-200">
        {DAYS_OF_WEEK.map((day) => (
          <div
            key={day}
            className="p-3 text-center text-base font-bold text-primary-700 border-r last:border-r-0 border-neutral-200 bg-neutral-50"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {calendarGrid.map((date) => (
          <CalendarCell
            key={date.toISOString()}
            date={date}
            events={getEventsForDate(date)}
            currentDate={currentDate}
            isSelected={
              selectedDate
                ? date.toDateString() === selectedDate.toDateString()
                : false
            }
            onClick={onDateClick}
            onEventClick={onEventClick}
          />
        ))}
      </div>
    </div>
  );
};
