
import type { Meta, StoryObj } from "@storybook/react";
import { CalendarView } from "./CalendarView";
import type { CalendarEvent } from "../../types/calendar.types";
import { useState } from "react";

const generateSampleEvent = (count: number = 10): CalendarEvent[] => {
  const events: CalendarEvent[] = [];
  const today = new Date();
  const colors = [
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#ec4899",
  ];
  const categories = ["Meeting", "Design", "Development", "Review", "Personal"];
  const titles = [
    "Team Standup",
    "Design Review",
    "Client Presentation",
    "Code Review",
    "Sprint Planning",
    "One-on-One",
    "Workshop",
    "Training Session",
    "Project Kickoff",
    "Retrospective",
  ];

  for (let i = 0; i < count; i++) {
    const startDate = new Date(today);
    startDate.setDate(today.getDate() + Math.floor(Math.random() * 30) - 15);
    startDate.setHours(9 + Math.floor(Math.random() * 8), 0, 0, 0);

    const endDate = new Date(startDate);
    endDate.setHours(startDate.getHours() + 1 + Math.floor(Math.random() * 2));

    events.push({
      id: `evt-${i + 1}`,
      title: titles[Math.floor(Math.random() * titles.length)],
      description: `Description for Event ${i + 1}`,
      startDate,
      endDate,
      color: colors[Math.floor(Math.random() * colors.length)],
      category: categories[Math.floor(Math.random() * categories.length)],
    });
  }
  return events;
};

const meta: Meta<typeof CalendarView> = {
  title: "Calendar/CalendarView",
  component: CalendarView,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        Component:
          "A fully functional calendar component with month and week views,event management, and accessibilty features.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CalendarView>;

export default meta;
type Story = StoryObj<typeof CalendarView>;

export const Default: Story = {
  args: {
    events: generateSampleEvent(8),
    onEventAdd: (currEvent) => console.log("Add event:", currEvent),
    onEventUpdate: (id, updates) => console.log("Update event:", id, updates),
    onEventDelete: (id) => console.log("Delete event:", id),
    initialView: "month",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Default calendar view showing current month with sample events.",
      },
    },
  },
};

export const EmptyState: Story = {
  args: {
    events: [],
    onEventAdd: (currEvent) => console.log("Add event:", currEvent),
    onEventUpdate: (id, updates) => console.log("Update event:", id, updates),
    onEventDelete: (id) => console.log("Delete event:", id),
    initialView: "month",
  },
  parameters: {
    docs: {
      description: {
        story: "Calendar with no events,showing empty state",
      },
    },
  },
};
export const WeekView: Story = {
  args: {
    events: generateSampleEvent(5),
    onEventAdd: (currEvent) => console.log("Add event:", currEvent),
    onEventUpdate: (id, updates) => console.log("Update event:", id, updates),
    onEventDelete: (id) => console.log("Delete event:", id),
    initialView: "week",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Week view showing 7 days with time slots and events positioned by time.",
      },
    },
  },
};
export const LargestDataset: Story = {
  args: {
    events: generateSampleEvent(25),
    onEventAdd: (currEvent) => console.log("Add event:", currEvent),
    onEventUpdate: (id, updates) => console.log("Update event:", id, updates),
    onEventDelete: (id) => console.log("Delete event:", id),
    initialView: "week",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Calendar with 25+ events to test performance and overflow handling.",
      },
    },
  },
};
export const InteractivePlayground: Story = {
  args: {
    events: generateSampleEvent(10),
    onEventAdd: (currEvent) => console.log("Add event:", currEvent),
    onEventUpdate: (id, updates) => console.log("Update event:", id, updates),
    onEventDelete: (id) => console.log("Delete event:", id),
    initialView: "month",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Fully interactive calendar where you can add, edit, and delete events.",
      },
    },
  },
  render: (args) => {
    const [events, setEvents] = useState(args.events);

    const handleEventAdd = (event: CalendarEvent) => {
      setEvents([...events, event]);
      console.log("Event added:", event);
    };

    const handleEventUpdate = (id: string, updates: Partial<CalendarEvent>) => {
      setEvents(events.map((e) => (e.id === id ? { ...e, ...updates } : e)));
      console.log("Event updated:", id, updates);
    };

    const handleEventDelete = (id: string) => {
      setEvents(events.filter((e) => e.id !== id));
      console.log("Event deleted:", id);
    };
    return (
      <CalendarView
        {...args}
        events={events}
        onEventAdd={handleEventAdd}
        onEventDelete={handleEventDelete}
        onEventUpdate={handleEventUpdate}
      />
    );
  },
};
export const MobileView: Story = {
  args: {
    events: generateSampleEvent(6),
    onEventAdd: (currEvent) => console.log("Add event:", currEvent),
    onEventUpdate: (id, updates) => console.log("Update event:", id, updates),
    onEventDelete: (id) => console.log("Delete event:", id),
    initialView: "month",
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
    docs: {
      description: {
        story: "Calendar optimized for mobile devices with responsiveness.",
      },
    },
  },
};
export const AccessibilityDemo: Story = {
  args: {
    events: generateSampleEvent(5),
    onEventAdd: (currEvent) => console.log("Add event:", currEvent),
    onEventUpdate: (id, updates) => console.log("Update event:", id, updates),
    onEventDelete: (id) => console.log("Delete event:", id),
    initialView: "month",
  },
  parameters: {
    docs: {
      description: {
        story: `Keyboard navigation demo:
         - Tab: Move between interactive elements
         - Arrow keys: Navigate calendar cells
         - Enter/Space: Selected date or event
         - Escape: Close modals
         All elements have proper ARIA labes and roles`,
      },
    },
    a11y: {
      config: {
        rules: [
          { id: "color-contrast", enabled: true },
          {
            id: "button-name",
            enabled: true,
          },
        ],
      },
    },
  },
};
export const DarkMode: Story = {
  args: {
    events: generateSampleEvent(8),
    onEventAdd: (currEvent) => console.log("Add event:", currEvent),
    onEventUpdate: (id, updates) => console.log("Update event:", id, updates),
    onEventDelete: (id) => console.log("Delete event:", id),
    initialView: "month",
  },
  parameters: {
    backgrounds: {
      default: "dark",
    },
    docs: {
      description: {
        story: `Calendar with dark mode styling`,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="dark">
        <Story />
      </div>
    ),
  ],
};
