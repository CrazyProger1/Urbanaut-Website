import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { APINotificationType } from "@/types";
import { NotificationItem } from "./NotificationItem";

const notificationTypes: APINotificationType[] = [
  "UPDATE",
  "REMINDER",
  "ALERT",
  "SYSTEM",
  "SOCIAL",
  "SUCCESS",
];

const meta = {
  title: "Modules/Layout/NotificationItem",
  component: NotificationItem,
  tags: ["autodocs", "ai-generated"],
  args: {
    notification: {
      id: 1,
      title: "Achievement unlocked",
      subtitle: "You earned First Steps",
      type: "SUCCESS",
      triggered_at: "2026-07-18T10:00:00Z",
    },
  },
} satisfies Meta<typeof NotificationItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-80">
      <NotificationItem {...args} />
    </div>
  ),
};

export const AllTypes: Story = {
  render: (args) => (
    <div className="flex w-80 flex-col">
      {notificationTypes.map((type) => (
        <NotificationItem
          key={type}
          notification={{ ...args.notification, id: 1, type, title: type }}
        />
      ))}
    </div>
  ),
};
