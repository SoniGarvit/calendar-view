

import React from "react";
import { Button } from "../primitives/Button";
import { getMonthName, getYear } from "../../utils/date.utils";
import type { ViewMode } from "../../types/calendar.types";

interface CalendarHeaderProps {
  currentDate: Date;
  view: ViewMode;
  onPrevious: () => void;
  onNext: () => void;
  onToday: () => void;
  onViewChange: (view: ViewMode) => void;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  view,
  onPrevious,
  onNext,
  onToday,
  onViewChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-7 px-4 py-3 bg-white rounded-xl shadow 
    border border-neutral-200 w-full">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold text-neutral-900 tracking-tight w-48 text-center ">
          {`${getMonthName(currentDate)} ${getYear(currentDate)}`}
        </h1>
      </div>

      <div className="flex items-center gap-2 bg-neutral-50 p-2 rounded-lg shadow-sm">
        <Button
          variant="secondary"
          size="sm"
          onClick={onPrevious}
          aria-label="Previous Month"
          className="rounded-full transition focus:ring-2 focus:ring-primary-500"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 12H7m0 0 4-4m-4 4 4 4"
            />
          </svg>
        </Button>
        <Button variant="primary" size="sm" onClick={onToday}
          className="font-semibold px-4 py-2"
        >
          Today
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={onNext}
          aria-label="Next Month"
          className="rounded-full transition focus:ring-2 focus:ring-primary-500"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h12m0 0-4-4m4 4-4 4"
            />
          </svg>
        </Button>
      </div>

      <div className="flex gap-2 bg-neutral-50 p-2 rounded-lg shadow-sm">
        <Button
          variant={view === "month" ? "primary" : "ghost"}
          size="sm"
          onClick={() => onViewChange("month")}
          className={`rounded-full font-medium px-4 py-2 
              ${view === "month" ? "shadow-lg" : ""}`}
        >
          Month
        </Button>
        <Button
          variant={view === "week" ? "primary" : "ghost"}
          size="sm"
          onClick={() => onViewChange("week")}
          className={`rounded-full font-medium px-4 py-2 
              ${view === "week" ? "shadow-lg" : ""}`}
        >
          Week
        </Button>
      </div>
    </div>
  );
};
