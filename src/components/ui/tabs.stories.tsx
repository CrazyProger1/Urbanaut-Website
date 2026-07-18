import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

const meta = {
  title: "Shadcn/Tabs",
  component: Tabs,
  tags: ["autodocs", "ai-generated"],
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="places" className="w-80">
      <TabsList>
        <TabsTrigger value="places">Places</TabsTrigger>
        <TabsTrigger value="areas">Areas</TabsTrigger>
        <TabsTrigger value="teams">Teams</TabsTrigger>
      </TabsList>
      <TabsContent value="places">
        <p className="text-sm text-muted-foreground">Explored abandoned places.</p>
      </TabsContent>
      <TabsContent value="areas">
        <p className="text-sm text-muted-foreground">Marked exploration areas.</p>
      </TabsContent>
      <TabsContent value="teams">
        <p className="text-sm text-muted-foreground">Your exploration teams.</p>
      </TabsContent>
    </Tabs>
  ),
};

export const WithDisabledTab: Story = {
  render: () => (
    <Tabs defaultValue="places" className="w-80">
      <TabsList>
        <TabsTrigger value="places">Places</TabsTrigger>
        <TabsTrigger value="areas" disabled>
          Areas
        </TabsTrigger>
      </TabsList>
      <TabsContent value="places">
        <p className="text-sm text-muted-foreground">Explored abandoned places.</p>
      </TabsContent>
    </Tabs>
  ),
};
