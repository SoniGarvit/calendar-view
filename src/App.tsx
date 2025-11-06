import { useState } from "react";
import { CalendarView } from "./components/Calendar/CalendarView";
import type { CalendarEvent } from "./types/calendar.types";

const initialEvents = [
  {
    id: "evt-1",
    title: "Design Review",
    description: "Initial review of new UI.",
    startDate: new Date(2025, 10, 2, 13, 30),
    endDate: new Date(2025, 10, 2, 15, 0),
    color: "#10b981",
    category: "Review",
  },
  {
    id: "evt-2",
    title: "Team Sync",
    description: "",
    startDate: new Date(2025, 10, 3, 10, 0),
    endDate: new Date(2025, 10, 3, 11, 0),
    color: "#3b82f6",
    category: "Meeting",
  },
];

function App() {
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);

  const handleEventAdd = (event: CalendarEvent) => {
    setEvents((prev) => [...prev, event]);
  };

  const handleEventUpdate = (id: string, updates: any) => {
    setEvents((prev) =>
      prev.map((evt) => (evt.id === id ? { ...evt, ...updates } : evt))
    );
  };

  const handleEventDelete = (id: string) => {
    setEvents((prev) => prev.filter((evt) => evt.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-primary-50 via-white to-primary-100 py-6">
      <header className="w-full max-w-xl sm:max-w-2xl md:max-w-4xl mx-auto px-3 sm:px-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-primary-700 mb-7 tracking-tight">
          Calendar View App
        </h1>
      </header>
      <main className="w-full max-w-lg sm:max-w-2xl md:max-w-4xl lg:max-w-7xl mx-auto px-2 sm:px-4 md:px-8">
        <CalendarView
          events={events}
          onEventAdd={handleEventAdd}
          onEventUpdate={handleEventUpdate}
          onEventDelete={handleEventDelete}
        />
      </main>
    </div>
  );
}

export default App;
