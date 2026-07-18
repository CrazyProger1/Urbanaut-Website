import { useForm } from "react-hook-form";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Form, FormControl, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LocalizedFormField } from "./localized";

type PlaceNameValues = {
  name_en: string;
  name_uk: string;
  name_ru: string;
};

const LocalizedNameField = () => {
  const form = useForm<PlaceNameValues>({
    defaultValues: { name_en: "Abandoned Factory", name_uk: "", name_ru: "" },
  });

  return (
    <Form {...form}>
      <div className="w-80">
        <LocalizedFormField
          control={form.control}
          languages={["en", "uk", "ru"]}
          basename="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Place name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </Form>
  );
};

const meta = {
  title: "UI/Improved/LocalizedFormField",
  component: LocalizedNameField,
  tags: ["autodocs", "ai-generated"],
} satisfies Meta<typeof LocalizedNameField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
