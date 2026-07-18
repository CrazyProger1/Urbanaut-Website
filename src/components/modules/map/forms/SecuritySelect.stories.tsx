import { useForm } from "react-hook-form";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Form, FormField, FormItem } from "@/components/ui/form";
import type { SecurityLevel } from "@/types";
import { SecuritySelect } from "./SecuritySelect";

const SecuritySelectStory = () => {
  const form = useForm<{ security: SecurityLevel }>({ defaultValues: { security: "MEDIUM" } });

  return (
    <Form {...form}>
      <div className="w-72">
        <FormField
          control={form.control}
          name="security"
          render={({ field }) => (
            <FormItem>
              <SecuritySelect value={field.value} onChange={field.onChange} />
            </FormItem>
          )}
        />
      </div>
    </Form>
  );
};

const meta = {
  title: "Modules/Map/Forms/SecuritySelect",
  component: SecuritySelectStory,
  tags: ["autodocs", "ai-generated"],
} satisfies Meta<typeof SecuritySelectStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
