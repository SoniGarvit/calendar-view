import { useState } from "react";
import { CalendarView } from "./components/Calendar/CalendarView";
import type { CalendarEvent } from "./types/calendar.types";

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();
const randomDateArr = Array.from({ length: 30 }, (_, i) => i + 1)
  .sort(() => 0.5 - Math.random())
  .slice(0, 5);

const initialEvents = [
  {
    id: "evt-1",
    title: "Design Review",
    description: "Initial review of new UI.",
    startDate: new Date(currentYear, currentMonth, randomDateArr[0], 13, 30),
    endDate: new Date(currentYear, currentMonth, randomDateArr[0], 15, 0),
    color: "#10b981",
    category: "Review",
  },
  {
    id: "evt-2",
    title: "Team Sync",
    description: "",
    startDate: new Date(currentYear, currentMonth, randomDateArr[1], 10, 0),
    endDate: new Date(currentYear, currentMonth, randomDateArr[1], 11, 0),
    color: "#3b82f6",
    category: "Meeting",
  },
  {
    id: "evt-3",
    title: "Project Kickoff",
    description: "",
    startDate: new Date(currentYear, currentMonth, randomDateArr[2], 12, 30),
    endDate: new Date(currentYear, currentMonth, randomDateArr[2], 13, 0),
    color: "#8b5cf6",
    category: "Development",
  },
  {
    id: "evt-4",
    title: "Training Session",
    description: "",
    startDate: new Date(currentYear, currentMonth, randomDateArr[3], 16, 0),
    endDate: new Date(currentYear, currentMonth, randomDateArr[3], 17, 0),
    color: "#ec4899",
    category: "Personal",
  },
  {
    id: "evt-5",
    title: "Client Presentation",
    description: "",
    startDate: new Date(currentYear, currentMonth, randomDateArr[4], 11, 0),
    endDate: new Date(currentYear, currentMonth, randomDateArr[4], 12, 30),
    color: "#f59e0b",
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
