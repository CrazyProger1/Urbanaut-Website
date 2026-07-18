import { useForm } from "react-hook-form";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Form, FormField, FormItem } from "@/components/ui/form";
import type { PreservationLevel } from "@/types";
import { PreservationSelect } from "./PreservationSelect";

const PreservationSelectStory = () => {
  const form = useForm<{ preservation: PreservationLevel }>({
    defaultValues: { preservation: "HIGH" },
  });

  return (
    <Form {...form}>
      <div className="w-72">
        <FormField
          control={form.control}
          name="preservation"
          render={({ field }) => (
            <FormItem>
              <PreservationSelect value={field.value} onChange={field.onChange} />
            </FormItem>
          )}
        />
      </div>
    </Form>
  );
};

const meta = {
  title: "Modules/Map/Forms/PreservationSelect",
  component: PreservationSelectStory,
  tags: ["autodocs", "ai-generated"],
} satisfies Meta<typeof PreservationSelectStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
