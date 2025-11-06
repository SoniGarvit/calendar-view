import React, { useState, useEffect } from "react";
import { Modal } from "../primitives/Modal";
import { Button } from "../primitives/Button";
import type { CalendarEvent } from "../../types/calendar.types";

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date | null;
  selectedEvent: CalendarEvent | null;
  onEventAdd: (event: CalendarEvent) => void;
  onEventUpdate: (id: string, updates: Partial<CalendarEvent>) => void;
  onEventDelete: (id: string) => void;
}

const COLORS = [
  { label: "Blue", value: "#3b82f6" },
  { label: "Green", value: "#10b981" },
  { label: "Orange", value: "#f59e0b" },
  { label: "Red", value: "#ef4444" },
  { label: "Purple", value: "#8b5cf6" },
  { label: "Pink", value: "#ec4899" },
];

const CATEGORIES = [
  "Meeting",
  "Design",
  "Development",
  "Review",
  "Personal",
  "Other",
];

// type Category = (typeof CATEGORIES)[number];

// type FormState = {
//   title: string;
//   description: string;
//   startDate: string;
//   startTime: string;
//   endDate: string;
//   endTime: string;
//   color: string;
//   category: string;
// };

const pad = (n: number) => String(n).padStart(2, "0");
const toDateInput = (d: Date) =>
  `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;

const toTimeInput = (d: Date) => `${pad(d.getHours())}:${pad(d.getMinutes())}`;

const fromLocalDateTime = (date: string, time: string) => {
 return new Date(`${date}T${time}`);
};

export const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  selectedDate,
  selectedEvent,
  onEventAdd,
  onEventUpdate,
  onEventDelete,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    color: COLORS[0].value,
    category: CATEGORIES[0],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      if (selectedEvent) {
        const start = new Date(selectedEvent.startDate);
        const end = new Date(selectedEvent.endDate);

        setFormData({
          title: selectedEvent.title,
          description: selectedEvent.description || "",
          startDate: toDateInput(start),
          startTime: toTimeInput(start),
          endDate: toDateInput(end),
          endTime: toTimeInput(end),
          color: selectedEvent.color || COLORS[0].value,
          category: selectedEvent.category || CATEGORIES[0],
        });
      } else {
        const base = selectedDate ? new Date(selectedDate) : new Date();
        const start = new Date(base);
        start.setHours(9, 0, 0, 0);
        const end = new Date(base);
        end.setHours(10, 0, 0, 0);
        setFormData({
          title: "",
          description: "",
          startDate: toDateInput(start),
          startTime: toTimeInput(start),
          endDate: toDateInput(end),
          endTime: toTimeInput(end),
          color: COLORS[0].value,
          category: CATEGORIES[0],
        });
      }
      setErrors({});
    }
  }, [isOpen, selectedEvent, selectedDate]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.length > 100) {
      newErrors.title = "Title must be 100 characters or less";
    }
    if (formData.description.length > 500) {
      newErrors.description = "Description must be 500 characters or less";
    }

    const dateReg = /^\d{4}-\d{2}-\d{2}$/;
    const timeReg = /^\d{2}:\d{2}$/;

    if (!dateReg.test(formData.startDate))
      newErrors.startDate = "Invalid start date";
    if (!timeReg.test(formData.startTime))
      newErrors.startTime = "Invalid start time";
    if (!dateReg.test(formData.endDate)) newErrors.endDate = "Invalid end date";
    if (!timeReg.test(formData.endTime)) newErrors.endTime = "Invalid end time";

    const start = fromLocalDateTime(formData.startDate, formData.startTime);
    const end = fromLocalDateTime(formData.endDate, formData.endTime);

    if (isNaN(start.getTime())) {
      newErrors.startDate = "Invalid start date/time";
    }
    if (isNaN(end.getTime())) {
      newErrors.endDate = "Invalid end date/time";
    }
    if (!newErrors.startDate && !newErrors.endDate && end <= start) {
      newErrors.endDate = "End date/time must be after start date/time";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;
    const start = fromLocalDateTime(formData.startDate, formData.startTime);
    const end = fromLocalDateTime(formData.endDate, formData.endTime);

    if (selectedEvent) {
      onEventUpdate(selectedEvent.id, {
        title: formData.title,
        description: formData.description,
        startDate: start,
        endDate: end,
        color: formData.color || undefined,
        category: formData.category || undefined,
      });
    } else {
      const newEvent: CalendarEvent = {
        id: `evt-${Date.now()}`,
        title: formData.title,
        description: formData.description,
        startDate: start,
        endDate: end,
        color: formData.color,
        category: formData.category,
      };
      onEventAdd(newEvent);
    }
    onClose();
  };

  const handleDelete = () => {
    if (
      selectedEvent &&
      window.confirm("Are you sure yuo want to delete this event?")
    ) {
      onEventDelete(selectedEvent.id);
      onClose();
    }
  };

    return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={selectedEvent ? "Edit Event" : "Create Event"}
    >
      <form onSubmit={handleSubmit} className="space-y-5 px-1 sm:px-0">
        <div>
          <label htmlFor="title" className="block text-base font-semibold text-neutral-800 mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-base bg-neutral-50 transition"
            maxLength={100}
            aria-required="true"
            aria-describedby={errors.title ? "title-error" : undefined}
            aria-invalid={!!errors.title}
          />
          {errors.title && (
            <p id="title-error" className="text-xs text-red-500 mt-1">{errors.title}</p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block text-base font-semibold text-neutral-800 mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            id="description"
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-base bg-neutral-50 transition"
            rows={3}
            maxLength={500}
            aria-describedby={errors.description ? "description-error" : undefined}
          />
          {errors.description && (
            <p id="description-error" className="text-xs text-red-500 mt-1">{errors.description}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-neutral-700 mb-1">Start Date</label>
            <input
              type="date"
              id="startDate"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 bg-neutral-50"
            />
          </div>
          <div>
            <label htmlFor="startTime" className="block text-sm font-medium text-neutral-700 mb-1">Start Time</label>
            <input
              type="time"
              id="startTime"
              value={formData.startTime}
              onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 bg-neutral-50"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-neutral-700 mb-1">End Date</label>
            <input
              type="date"
              id="endDate"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 bg-neutral-50"
              aria-invalid={!!errors.endDate}
            />
          </div>
          <div>
            <label htmlFor="endTime" className="block text-sm font-medium text-neutral-700 mb-1">End Time</label>
            <input
              type="time"
              id="endTime"
              value={formData.endTime}
              onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 bg-neutral-50"
            />
          </div>
        </div>
        {errors.endDate && <p className="text-xs text-red-500 -mt-2">{errors.endDate}</p>}

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">Color</label>
          <div className="flex flex-wrap gap-2">
            {COLORS.map((color) => (
              <button
                key={color.value}
                type="button"
                onClick={() => setFormData({ ...formData, color: color.value })}
                className={`w-8 h-8 rounded-full border-2 transition-all focus:outline-none
                  ${formData.color === color.value ? "border-primary-600 ring-2 ring-primary-400 scale-110" : "border-neutral-300"}
                `}
                style={{ backgroundColor: color.value }}
                aria-label={`Select ${color.label} color`}
              />
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-neutral-700 mb-1">Category</label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 bg-neutral-50"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center pt-5 gap-3">
          {selectedEvent ? (
            <Button
              type="button"
              variant="ghost"
              onClick={handleDelete}
              className="text-red-600 hover:bg-red-100 px-6 py-2 rounded-lg transition font-semibold"
            >
              Delete
            </Button>
          ) : <span />}
          <div className="flex gap-2 w-full sm:w-auto">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {selectedEvent ? "Update" : "Create"}
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

