import React from "react";
import type { Decorator } from "@storybook/nextjs-vite";
import { useForm, type DefaultValues, type FieldValues } from "react-hook-form";
import { SidebarProvider } from "../src/components/ui/sidebar";
import { Form } from "../src/components/ui/form";
import { useMapStore } from "../src/stores";

export const withSidebarProvider: Decorator = (Story) => (
  <SidebarProvider>
    <Story />
  </SidebarProvider>
);

export const withForm = <TFieldValues extends FieldValues>(
  defaultValues?: DefaultValues<TFieldValues>,
): Decorator => {
  const FormDecorator: Decorator = (Story) => {
    const StoryForm = () => {
      const form = useForm<TFieldValues>({ defaultValues });
      return (
        <Form {...form}>
          <Story />
        </Form>
      );
    };
    return <StoryForm />;
  };
  return FormDecorator;
};

type MapStoreState = Partial<ReturnType<typeof useMapStore.getState>>;

export const withMapStore = (state: MapStoreState): Decorator => {
  const MapStoreDecorator: Decorator = (Story) => {
    useMapStore.setState(state);
    return <Story />;
  };
  return MapStoreDecorator;
};
