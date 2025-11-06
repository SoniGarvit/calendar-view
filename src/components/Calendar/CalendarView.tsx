import React, { useState } from "react";
import { useCalendar } from "../../hooks/useCalendar";
import { CalendarHeader } from "./CalendarHeader";
import { MonthView } from "./MonthView";
import { WeekView } from "./WeekView";
import { EventModal } from "./EventModal";
import type {
  CalendarEvent,
  CalendarViewProps,
} from "../../types/calendar.types";

export const CalendarView: React.FC<CalendarViewProps> = ({
  events,
  onEventAdd,
  onEventUpdate,
  onEventDelete,
  initialDate,
}) => {
  const calendar = useCalendar(initialDate);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const handleDateClick = (date: Date) => {
    calendar.setSelectedDate(date);
    setSelectedEvent(null);
    setIsModalOpen(true);
  };

  const handleClickEvent = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handlePrevious = () => {
    if (calendar.view === "month") {
      calendar.goToPreviousMonth();
    } else {
      calendar.goToPreviousWeek();
    }
  };

  const handleNext = () => {
    if (calendar.view === "month") {
      calendar.goToNextMonth();
    } else {
      calendar.goToNextWeek();
    }
  };

  return (
    <div className="max-w-7xl mx-auto w-full p-3 sm:p-4 md:p-8 min-h-[80vh] bg-neutral-50 rounded-xl shadow-lg">
      <CalendarHeader
        currentDate={calendar.currentDate}
        view={calendar.view}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onToday={calendar.goToToday}
        onViewChange={calendar.setView}
      />

      <div className="w-full mt-2 sm:mt-4">
        {calendar.view === "month" ? (
          <MonthView
            currentDate={calendar.currentDate}
            events={events}
            selectedDate={calendar.selectedDate}
            onDateClick={handleDateClick}
            onEventClick={handleClickEvent}
          />
        ) : (
          <WeekView
            currentDate={calendar.currentDate}
            events={events}
            onDateClick={handleDateClick}
            onEventClick={handleClickEvent}
          />
        )}
      </div>

      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedDate={calendar.selectedDate}
        selectedEvent={selectedEvent}
        onEventAdd={onEventAdd}
        onEventUpdate={onEventUpdate}
        onEventDelete={onEventDelete}
      />
    </div>
  );
};
