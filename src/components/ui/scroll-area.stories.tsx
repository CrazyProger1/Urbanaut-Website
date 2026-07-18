import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ScrollArea } from "./scroll-area";
import { Separator } from "./separator";

const places = Array.from({ length: 20 }, (_, index) => `Abandoned place #${index + 1}`);

const meta = {
  title: "Shadcn/ScrollArea",
  component: ScrollArea,
  tags: ["autodocs", "ai-generated"],
} satisfies Meta<typeof ScrollArea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ScrollArea className="h-64 w-56 rounded-md border p-4">
      <p className="mb-2 text-sm font-medium">Nearby places</p>
      {places.map((place) => (
        <div key={place}>
          <p className="py-2 text-sm">{place}</p>
          <Separator />
        </div>
      ))}
    </ScrollArea>
  ),
};
