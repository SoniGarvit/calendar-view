import { useState, useCallback } from "react";
import type { CalendarState, ViewMode } from "../types/calendar.types";

export const useCalendar = (initialDate: Date = new Date()) => {
  const [state, setState] = useState<CalendarState>({
    currentDate: initialDate,
    view: "month",
    selectedDate: null,
  });

  const goToNextMonth = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentDate: new Date(
        prev.currentDate.getFullYear(),
        prev.currentDate.getMonth() + 1,
        1
      ),
    }));
  }, []);

  const goToPreviousMonth = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentDate: new Date(
        prev.currentDate.getFullYear(),
        prev.currentDate.getMonth() - 1,
        1
      ),
    }));
  }, []);

  const goToNextWeek = useCallback(() => {
    setState((prev) => {
      const nextWeek = new Date(prev.currentDate);
      nextWeek.setDate(nextWeek.getDate() + 7);
      return { ...prev, currentDate: nextWeek };
    });
  }, []);

  const goToPreviousWeek = useCallback(() => {
    setState((prev) => {
      const prevWeek = new Date(prev.currentDate);
      prevWeek.setDate(prevWeek.getDate() - 7);

      return { ...prev, currentDate: prevWeek };
    });
  }, []);

  const goToToday = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentDate: new Date(),
    }));
  }, []);

  const setView = useCallback((view: ViewMode) => {
    setState((prev) => ({ ...prev, view }));
  }, []);

  const setSelectedDate = useCallback((date: Date | null) => {
    setState((prev) => ({ ...prev, selectedDate: date }));
  }, []);

  const setCurrentDate = useCallback((date: Date) => {
    setState((prev) => ({ ...prev, currentDate: date }));
  }, []);

  return {
    ...state,
    goToNextMonth,
    goToPreviousMonth,
    goToNextWeek,
    goToPreviousWeek,
    goToToday,
    setView,
    setSelectedDate,
    setCurrentDate,
  }
};
