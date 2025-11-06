import { useState, useCallback } from "react";
import type { CalendarEvent } from "../types/calendar.types";

export const useEventManager = (initialEvents: CalendarEvent[] = []) => {
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);

  const addEvent = useCallback(
    (event: CalendarEvent) => {
      setEvents((prev) => ([ ...prev, event ]));
    },
    []
  );

  const updateEvent = useCallback(
    (id: string, updates: Partial<CalendarEvent>) => {
      setEvents((prev) => {
        return prev.map((curEvent) => {
          return curEvent.id === id ? { ...curEvent, ...updates } : curEvent;
        });
      });
    },
    []
  );

  const deleteEvent = useCallback(
    (id: string) => {
      setEvents((prev) => {
        return prev.filter((curEvent) => curEvent.id !== id);
      });
    },
    []
  );

  const getEventsForDate = useCallback(
    (date: Date): CalendarEvent[] => {
      return events.filter((curEvent) => {
        const eventStart = new Date(curEvent.startDate);
        const eventEnd = new Date(curEvent.endDate);

        return (
          date >= new Date(eventStart.setHours(0, 0, 0, 0)) &&
          date <= new Date(eventEnd.setHours(23, 59, 59, 999))
        );
      });
    },
    [events]
  );

  return {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    getEventsForDate,
  };
};
