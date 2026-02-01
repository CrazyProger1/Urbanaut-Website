"use client";

import React from "react";
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
import {
  APIListCity,
  APIListCountry,
  APIListTag,
  APIPreservationLevel,
  APISecurityLevel,
} from "@/types";
import { PAGES, PLACEHOLDERS, QUERIES } from "@/config";
import { useSearchParams } from "next/navigation";
import { usePreservedParamsLink } from "@/hooks";
import { CountrySelect } from "@/components/modules/common/selects";
import { SecuritySelect } from "@/components/modules/map/forms/SecuritySelect";
import { CitySelect } from "@/components/modules/map/forms/CitySelect";

const formSchema = z.object({
  preservation: z.enum(["NONE", "LOW", "MEDIUM", "HIGH", "AWESOME"]).optional(),
  security: z.enum(["NONE", "EASY", "MEDIUM", "HARD", "IMPOSSIBLE"]).optional(),
  tags: z.array(z.string()),
  country: z.string().max(2).optional(),
  city: z.string().optional(),
});

type Props = {
  tags?: APIListTag[];
  countries?: APIListCountry[];
  cities?: APIListCity[];
  onSearchCityAction?: (term: string) => void;
  onLoadMoreCitiesAction?: () => void;
};

export const FiltersForm = ({
  tags,
  countries,
  cities,
  onLoadMoreCitiesAction,
  onSearchCityAction,
}: Props) => {
  const params = useSearchParams();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      preservation:
        (params.get(QUERIES.FILTER_PRESERVATION_LEVEL) as APIPreservationLevel) || undefined,
      security: (params.get(QUERIES.FILTER_SECURITY_LEVEL) as APISecurityLevel) || undefined,
      tags: params.getAll(QUERIES.FILTER_TAGS),
      country: params.get(QUERIES.FILTER_COUNTRY) || undefined,
      city: params.get(QUERIES.FILTER_CITY) || undefined,
    },
    mode: "onSubmit",
  });

  const { watch } = form;

  const values = watch();

  const applyFiltersLink = usePreservedParamsLink({
    ...values,
    [QUERIES.MODAL_MAP_FILTERS]: false,
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

  const { country } = watch();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="preservation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{PLACEHOLDERS.LABEL_PRESERVATION_LEVEL}</FormLabel>
              <PreservationSelect value={field.value} onChange={field.onChange} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="security"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{PLACEHOLDERS.LABEL_SECURITY_LEVEL}</FormLabel>
              <SecuritySelect value={field.value} onChange={field.onChange} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <Label>{PLACEHOLDERS.LABEL_TAGS}</Label>
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
              <FormLabel>{PLACEHOLDERS.LABEL_COUNTRY}</FormLabel>
              <CountrySelect
                value={field.value}
                onChange={field.onChange}
                countries={countries || []}
              />
            </FormItem>
          )}
        />
        {/*{country && (*/}
        {/*  <FormField*/}
        {/*    control={form.control}*/}
        {/*    name="city"*/}
        {/*    render={({ field }) => (*/}
        {/*      <FormItem>*/}
        {/*        <FormLabel>City</FormLabel>*/}
        {/*        <CitySelect*/}
        {/*          cities={cities || []}*/}
        {/*          value={field.value}*/}
        {/*          onChange={field.onChange}*/}
        {/*          onLoadMore={onLoadMoreCitiesAction}*/}
        {/*          onSearch={onSearchCityAction}*/}
        {/*        />*/}
        {/*      </FormItem>*/}
        {/*    )}*/}
        {/*  />*/}
        {/*)}*/}
        <Button className="w-full" type="submit" disabled={formState.isSubmitting}>
          {PLACEHOLDERS.BUTTON_APPLY} {formState.isSubmitting && <Spinner />}
        </Button>
        <Button className="w-full" variant="secondary" asChild>
          <Link href={PAGES.MAP}>{PLACEHOLDERS.BUTTON_CLEAR}</Link>
        </Button>
      </form>
    </Form>
  );
};
