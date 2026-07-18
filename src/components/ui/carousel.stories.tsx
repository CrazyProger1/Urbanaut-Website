import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Card, CardContent } from "./card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./carousel";

const meta = {
  title: "Shadcn/Carousel",
  component: Carousel,
  tags: ["autodocs", "ai-generated"],
} satisfies Meta<typeof Carousel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Carousel className="w-64">
      <CarouselContent>
        {[1, 2, 3, 4, 5].map((slide) => (
          <CarouselItem key={slide}>
            <Card>
              <CardContent className="flex aspect-square items-center justify-center">
                <span className="text-3xl font-semibold">{slide}</span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
};
