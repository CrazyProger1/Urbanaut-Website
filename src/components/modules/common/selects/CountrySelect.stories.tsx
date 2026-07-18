import { useForm } from "react-hook-form";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { CountrySelect } from "./CountrySelect";

const countries = [
  { tld: "ua", name: "Ukraine" },
  { tld: "pl", name: "Poland" },
  { tld: "de", name: "Germany" },
  { tld: "cz", name: "Czechia" },
];

const CountrySelectForm = () => {
  const form = useForm<{ country: string }>({ defaultValues: { country: "ua" } });

  return (
    <Form {...form}>
      <div className="w-72">
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <CountrySelect countries={countries} value={field.value} onChange={field.onChange} />
            </FormItem>
          )}
        />
      </div>
    </Form>
  );
};

const meta = {
  title: "Modules/Common/Selects/CountrySelect",
  component: CountrySelect,
  tags: ["autodocs", "ai-generated"],
} satisfies Meta<typeof CountrySelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    countries,
    onChange: () => {},
  },
  render: () => <CountrySelectForm />,
};
