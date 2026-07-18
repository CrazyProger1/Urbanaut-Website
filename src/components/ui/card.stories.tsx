import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";

const meta = {
  title: "Shadcn/Card",
  component: Card,
  tags: ["autodocs", "ai-generated"],
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Abandoned Factory</CardTitle>
        <CardDescription>Industrial complex from the 1950s</CardDescription>
        <CardAction>
          <Button variant="ghost" size="sm">
            View
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-sm">
          A vast industrial territory with preserved machinery and underground tunnels.
        </p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Explore</Button>
      </CardFooter>
    </Card>
  ),
};

export const Minimal: Story = {
  render: () => (
    <Card className="w-80">
      <CardContent>
        <p className="text-sm">Content-only card.</p>
      </CardContent>
    </Card>
  ),
};
