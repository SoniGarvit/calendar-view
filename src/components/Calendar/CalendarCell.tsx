

import React, { useCallback, useMemo } from "react";
import clsx from "clsx";
import type { CalendarEvent } from "../../types/calendar.types";
import { isToday, isCurrentMonth } from "../../utils/date.utils";

interface CalendarCellProps {
  date: Date;
  events: CalendarEvent[];
  currentDate: Date;
  isSelected: boolean;
  onClick: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
}

export const CalendarCell = React.memo<CalendarCellProps>(
  ({ date, events, currentDate, isSelected, onClick, onEventClick }) => {
    const handleClck = useCallback(() => {
      onClick(date);
    }, [date, onClick]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick(date);
        }
      },
      [date, onClick]
    );

    const handleEventClick = useCallback(
      (e: React.MouseEvent, event: CalendarEvent) => {
        e.stopPropagation();
        onEventClick(event);
      },
      [onEventClick]
    );
    const dayNumber = date.getDate();
    const isTodayDate = isToday(date);
    const isInCurrentMonth = isCurrentMonth(date, currentDate);
    const eventCount = useMemo(() => events.length, [events]);
    const monthName = date.toLocaleDateString("en-IN", { month: "long" });
    const year = date.getFullYear();

    return (
      <div
        role="button"
        tabIndex={0}
        aria-label={`${monthName} , ${dayNumber} , ${year} , ${eventCount} events.`}
        aria-pressed={isSelected}
        onClick={handleClck}
        onKeyDown={handleKeyDown}
        className={clsx(
          // Responsive, interactive styles
          "border border-neutral-200 h-28 sm:h-32 p-2 sm:p-3 transition-colors cursor-pointer",
          "rounded-xl bg-white shadow-sm hover:bg-neutral-50 focus-visible:ring-2 focus-visible:ring-primary-500",
          !isInCurrentMonth && "bg-neutral-50 opacity-70",
          isSelected && "ring-2 ring-primary-500",
          "flex flex-col"
        )}
      >
        <div className="flex justify-between items-center mb-1">
          {isTodayDate ? (
            <span className="w-7 h-7 bg-primary-500 rounded-full text-white text-sm flex items-center justify-center font-bold ring-2 ring-primary-400 shadow">
              {dayNumber}
            </span>
          ) : (
            <span
              className={clsx(
                "text-base font-bold",
                isInCurrentMonth ? "text-neutral-900" : "text-neutral-400"
              )}
            >
              {dayNumber}
            </span>
          )}
          <span className="text-xs text-neutral-400 hidden sm:block">{monthName}</span>
        </div>

        <div className="flex flex-col gap-1 sm:gap-2 overflow-hidden mt-2">
          {events.slice(0, 3).map((curEvent) => (
            <div
              key={curEvent.id}
              role="button"
              tabIndex={0}
              onClick={(e) => handleEventClick(e, curEvent)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  e.stopPropagation();
                  onEventClick(curEvent);
                }
              }}
              className={clsx(
                "text-xs px-2 py-1 rounded-lg truncate shadow-sm transition hover:opacity-90 cursor-pointer",
                "flex items-center gap-1"
              )}
              style={{ backgroundColor: curEvent.color || "#3b82f6" }}
              aria-label={`Event: ${curEvent.title}`}
            >
              <span className="text-white font-medium truncate">{curEvent.title}</span>
            </div>
          ))}

          {eventCount > 3 && (
            <button
              className="text-xs text-primary-600 hover:underline font-semibold mt-1 transition"
              aria-label={`${eventCount - 3} more events`}
            >
              {eventCount - 3} more
            </button>
          )}
        </div>
      </div>
    );
  }
);

CalendarCell.displayName = "CalendarCell";
