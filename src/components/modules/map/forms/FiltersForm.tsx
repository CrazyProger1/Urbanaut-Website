"use client";

import React, { useEffect, useState } from "react";
import { PreservationSelect } from "./PreservationSelect";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Link, useRouter } from "@/i18n";
import { Label } from "@/components/ui/label";
import { TagsSelect } from "@/components/modules/map/forms/TagsSelect";
import { APIListCountry, APIListTag, APIPreservationLevel, APISecurityLevel } from "@/types";
import { PAGES, QUERIES } from "@/config";
import { useSearchParams } from "next/navigation";
import { usePreservedParamsLink } from "@/hooks";
import { CountrySelect } from "@/components/modules/login/forms/CountrySelect";
import { SecuritySelect } from "@/components/modules/map/forms/SecuritySelect";

const formSchema = z.object({
  preservation: z.enum(["NONE", "LOW", "MEDIUM", "HIGH", "AWESOME"]).optional(),
  security: z.enum(["NONE", "EASY", "MEDIUM", "HARD", "IMPOSSIBLE"]).optional(),
  tags: z.array(z.string()),
  country: z.string().max(2).optional(),
});

type Props = {
  tags?: APIListTag[];
  countries?: APIListCountry[];
};

export const FiltersForm = ({ tags, countries }: Props) => {
  const params = useSearchParams();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      preservation: (params.get("preservation") as APIPreservationLevel) || undefined,
      security: (params.get("security") as APISecurityLevel) || undefined,
      tags: params.getAll("tags"),
    },
    mode: "onSubmit",
  });

  const { watch } = form;

  const values = watch();

  const applyFiltersLink = usePreservedParamsLink({
    ...values,
    [QUERIES.MAP_FILTERS_MODAL]: false,
  });

  const onSubmit = async () => {
    router.push(applyFiltersLink, {
      scroll: false,
    });
  };

  const selectedTags = values.tags;

  const handleSelect = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      form.setValue("tags", [...selectedTags, tag]);
    }
  };

  const handleRemove = (tag: string) => {
    form.setValue(
      "tags",
      selectedTags.filter((t) => t !== tag),
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
          name="security"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Security Level</FormLabel>
              <SecuritySelect value={field.value} onChange={field.onChange} />
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
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <CountrySelect
                value={field.value}
                onChange={field.onChange}
                countries={countries || []}
              />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit" disabled={formState.isSubmitting}>
          Apply {formState.isSubmitting && <Spinner />}
        </Button>
        <Button className="w-full" variant="secondary" asChild>
          <Link href={PAGES.MAP}>Clear Filters</Link>
        </Button>
      </form>
    </Form>
  );
};
