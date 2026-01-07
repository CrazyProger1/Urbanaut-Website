"use client";

import React from "react";
import { PreservationSelect } from "./PreservationSelect";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n";
import { Label } from "@/components/ui/label";
import { TagsSelect } from "@/components/modules/map/forms/TagsSelect";
import { APIListTag } from "@/types";

const formSchema = z.object({
  preservation: z.enum(["NONE", "LOW", "MEDIUM", "HIGH", "AWESOME"]).optional(),
  tags: z.array(z.string()),
});

type Props = {
  tags?: APIListTag[];
};

export const FiltersForm = ({ tags }: Props) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      preservation: undefined,
      tags: [],
    },
    mode: "onSubmit",
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const params = new URLSearchParams();

    Object.entries(values).map(([key, value]) => {
      if (value) {
        if (Array.isArray(value)) {
          value.map((subvalue) => {
            params.append(key, subvalue);
          });
        } else {
          params.set(key, value);
        }
      }
    });

    router.push(`?${params}`, { scroll: false });
  };

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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
        <Button className="w-full" type="submit" disabled={formState.isSubmitting}>
          Apply {formState.isSubmitting && <Spinner />}
        </Button>
      </form>
    </Form>
  );
};
