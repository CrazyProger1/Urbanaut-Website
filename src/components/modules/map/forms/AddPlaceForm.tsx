"use client";

import React from "react";
import { z } from "zod";
import { useRouter } from "@/i18n";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { createPlace } from "@/actions";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Tag, PreservationLevel } from "@/types";
import { Label } from "@/components/ui/label";
import { CheckBoxToggle } from "@/components/common/toggles";
import { TagsSelect } from "@/components/modules/map/forms/TagsSelect";
import { validateResponse } from "@/utils/api";
import { PreservationSelect } from "@/components/modules/map/forms/PreservationSelect";
import { QUERIES } from "@/config";
import { SecuritySelect } from "@/components/modules/map/forms/SecuritySelect";

const formSchema = z.object({
  name: z.string().max(250).min(2),
  description: z.string().max(1000).min(0),
  is_private: z.boolean(),
  tags: z.array(z.string()),
  preservation: z.enum(["NONE", "LOW", "MEDIUM", "HIGH", "AWESOME"]),
  security: z.enum(["NONE", "EASY", "MEDIUM", "HARD", "IMPOSSIBLE"]),
});

type Props = {
  tags?: Tag[];
};

export const AddPlaceForm = ({ tags }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      is_private: false,
      tags: [],
      preservation: "MEDIUM",
      security: "NONE",
    },
    mode: "onSubmit",
  });

  const selected = form.watch("tags");

  const handleSelect = (tag: string) => {
    if (!selected.includes(tag)) {
      form.setValue("tags", [...selected, tag]);
    }
  };

  const handleRemove = (tag: string) => {
    form.setValue(
      "tags",
      selected.filter((t) => t !== tag),
    );
  };

  const { formState } = form;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { tags, name, is_private, preservation, security } = values;
    const point = searchParams.get(QUERIES.MAP_SELECTED_POINT);
    const params = new URLSearchParams(searchParams);

    if (point) {
      const [lat, lng] = point.split(",").map(Number);
      const response = await createPlace({
        name,
        point: [lat, lng],
        tags,
        is_private,
        preservation,
        security,
      });

      if (validateResponse(response)) {
        toast.success("Place added successfully.");
        params.delete(QUERIES.MAP_SELECTED_POINT);
        params.delete(QUERIES.PLACE_ADDING_MODAL);
        router.push(`?${params}`);
      }
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Abandoned Factory" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <Label>Tags</Label>
              <TagsSelect
                tags={tags?.map((tag) => tag.tag) || []}
                selected={field.value}
                onSelect={handleSelect}
                onRemove={handleRemove}
              />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="is_private"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <CheckBoxToggle
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  title="Private"
                  description="If enabled, this place will be visible only to you."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="preservation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preservation Level</FormLabel>
              <PreservationSelect value={field.value} onChange={field.onChange} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="security"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Security Level</FormLabel>
              <SecuritySelect value={field.value} onChange={field.onChange} />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit" disabled={formState.isSubmitting}>
          Save {formState.isSubmitting && <Spinner />}
        </Button>
      </form>
    </Form>
  );
};
