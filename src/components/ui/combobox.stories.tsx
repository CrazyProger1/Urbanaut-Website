import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "./combobox";

const cities = ["Kyiv", "Lviv", "Odesa", "Kharkiv", "Dnipro"];

const meta = {
  title: "Shadcn/Combobox",
  component: Combobox,
  tags: ["autodocs", "ai-generated"],
} satisfies Meta<typeof Combobox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Combobox items={cities}>
      <ComboboxInput placeholder="Search city..." className="w-64" />
      <ComboboxContent>
        <ComboboxEmpty>No cities found.</ComboboxEmpty>
        <ComboboxList>
          {(city: string) => (
            <ComboboxItem key={city} value={city}>
              {city}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
};
