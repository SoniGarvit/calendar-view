import React from "react";
import { getWeekDays } from "../../utils/date.utils";
import type { CalendarEvent } from "../../types/calendar.types";

interface WeekViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onDateClick: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
}

const HOURS = Array.from({ length: 24 }, (_, i) => i);
console.log(HOURS);

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const WeekView: React.FC<WeekViewProps> = ({
  currentDate,
  events,
  onDateClick,
  onEventClick,
}) => {
  const weekDays = getWeekDays(currentDate);

  const getEventsForDay = (date: Date): CalendarEvent[] => {
    return events.filter((e) => {
      const eventDate = new Date(e.startDate);
      return (
        eventDate.getFullYear() === date.getFullYear() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getDate() === date.getDate()
      );
    });
  };

  const getEventPosition = (event: CalendarEvent) => {
    const start = new Date(event.startDate);
    const end = new Date(event.endDate);
    const startHour = start.getHours() + start.getMinutes() / 60;
    const duration = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    return {
      top: `${(startHour / 24) * 100}%`,
      height: `${(duration / 24) * 100}%`,
    };
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
      {/* Header row */}
      <div className="grid grid-cols-8 border-b border-neutral-200 sticky top-0 bg-white z-10">
        <div className="p-3 border-r border-neutral-200 bg-neutral-50" />
        {weekDays.map((day, index) => (
          <div
            key={day.toISOString()}
            className="p-3 text-center border-r last:border-r-0 border-neutral-200 bg-neutral-50"
          >
            <div className="text-base font-bold text-primary-700">{DAYS_OF_WEEK[index]}</div>
            <div className="text-xl font-bold text-neutral-900 mt-1">{day.getDate()}</div>
          </div>
        ))}
      </div>
      <div className="relative">
        {HOURS.map((hour) => (
          <div
            key={hour}
            className="grid grid-cols-8 border-b border-neutral-200"
          >
            <div className="p-2 text-sm text-neutral-500 border-r border-neutral-200 h-14 sm:h-16 bg-neutral-50">{hour === 0 
              ? "12 AM" 
              : hour < 12 
              ? `${hour} AM` 
              : hour === 12 
              ? "12 PM" 
              : `${hour - 12} PM`}
            </div>
            {weekDays.map((day) => (
              <div
                key={`${day.toISOString()}-${hour}`}
                className="relative border-r last:border-r-0 border-neutral-200 h-14 sm:h-16 hover:bg-neutral-100 cursor-pointer transition-colors"
                onClick={() => {
                  const clickedDate = new Date(day);
                  clickedDate.setHours(hour, 0, 0, 0);
                  onDateClick(clickedDate);
                }}
              />
            ))}
          </div>
        ))}
        {/* Overlay events for the week */}
        {weekDays.map((day, dayIndex) => {
          const dayEvents = getEventsForDay(day);
          return dayEvents.map((event) => {
            const position = getEventPosition(event);
            return (
              <div
                key={event.id}
                className="absolute rounded-lg px-2 py-1 text-xs sm:text-sm text-white cursor-pointer hover:opacity-90 transition-shadow shadow-md overflow-hidden"
                style={{
                  ...position,
                  left: `${((dayIndex + 1) / 8) * 100}%`,
                  width: `${(1 / 8) * 100}%`,
                  backgroundColor: event.color || "#3b82f6",
                  zIndex: 20,
                }}
                onClick={() => onEventClick(event)}
              >
                <div className="font-semibold truncate">{event.title}</div>
              </div>
            );
          });
        })}
      </div>
    </div>
  );
};
