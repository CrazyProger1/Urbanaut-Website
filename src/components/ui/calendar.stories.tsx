import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Calendar } from "./calendar";

const SingleCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date(2026, 6, 18));
  return (
    <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} className="rounded-md border" />
  );
};

const meta = {
  title: "Shadcn/Calendar",
  component: Calendar,
  tags: ["autodocs", "ai-generated"],
} satisfies Meta<typeof Calendar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <SingleCalendar />,
};

export const WithDropdownCaption: Story = {
  render: () => (
    <Calendar mode="single" captionLayout="dropdown" className="rounded-md border" />
  ),
};
