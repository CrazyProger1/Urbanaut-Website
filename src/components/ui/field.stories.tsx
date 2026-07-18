import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Input } from "./input";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "./field";

const meta = {
  title: "Shadcn/Field",
  component: Field,
  tags: ["autodocs", "ai-generated"],
} satisfies Meta<typeof Field>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Field className="w-72">
      <FieldLabel htmlFor="place">Place name</FieldLabel>
      <Input id="place" placeholder="Abandoned Factory" />
      <FieldDescription>Shown publicly on the map.</FieldDescription>
    </Field>
  ),
};

export const WithError: Story = {
  render: () => (
    <Field className="w-72" data-invalid>
      <FieldLabel htmlFor="place-invalid">Place name</FieldLabel>
      <Input id="place-invalid" aria-invalid />
      <FieldError content="Place name is required" />
    </Field>
  ),
};

export const Fieldset: Story = {
  render: () => (
    <FieldSet className="w-80">
      <FieldLegend>Location</FieldLegend>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="lat">Latitude</FieldLabel>
          <Input id="lat" placeholder="50.4501" />
        </Field>
        <FieldSeparator />
        <Field>
          <FieldLabel htmlFor="lng">Longitude</FieldLabel>
          <Input id="lng" placeholder="30.5234" />
        </Field>
      </FieldGroup>
    </FieldSet>
  ),
};
