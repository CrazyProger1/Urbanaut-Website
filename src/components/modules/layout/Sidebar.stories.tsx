import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Sidebar } from "./Sidebar";

const meta = {
  title: "Modules/Layout/Sidebar",
  component: Sidebar,
  tags: ["autodocs", "ai-generated"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Sidebar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <SidebarProvider>
      <Sidebar />
      <main className="flex-1 p-4" />
    </SidebarProvider>
  ),
};
