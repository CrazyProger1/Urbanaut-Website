import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tabs } from "./tabs";

const meta = {
  title: "UI/Next/Tabs",
  component: Tabs,
  tags: ["autodocs", "ai-generated"],
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    query: "tab",
    defaultValue: "places",
  },
  render: (args) => (
    <Tabs {...args} className="w-80">
      <TabsList>
        <TabsTrigger value="places">Places</TabsTrigger>
        <TabsTrigger value="areas">Areas</TabsTrigger>
      </TabsList>
      <TabsContent value="places">
        <p className="text-sm text-muted-foreground">Synced with the tab query parameter.</p>
      </TabsContent>
      <TabsContent value="areas">
        <p className="text-sm text-muted-foreground">Areas content.</p>
      </TabsContent>
    </Tabs>
  ),
};
