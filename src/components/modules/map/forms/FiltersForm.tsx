"use client";

import React from "react";
import { PreservationSelect } from "./PreservationSelect";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { useMapStore } from "@/stores";
import { CheckBoxToggle } from "@/components/common/toggles";
import { CircleQuestionMark, Heart, Lock, ShieldUser } from "lucide-react";

const formSchema = z.object({
  preservation: z.enum(["NONE", "LOW", "MEDIUM", "HIGH", "AWESOME"]).optional(),
  // security: z.enum(["NONE", "EASY", "MEDIUM", "HARD", "IMPOSSIBLE"]).optional(),
  has_security: z.boolean().optional(),
  tags: z.array(z.string()),
  country: z.string().max(2).optional(),
  city: z.string().optional(),
  is_favorite: z.boolean().optional(),
  is_private: z.boolean().optional(),
  is_supposed: z.boolean().optional(),
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
  const t = useTranslations("Modules");
  const { toggleSearchBar } = useMapStore();
  const params = useSearchParams();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      preservation:
        (params.get(QUERIES.FILTER_PRESERVATION_LEVEL) as APIPreservationLevel) || undefined,
      has_security: params.get(QUERIES.FILTER_HAS_SECURITY) === "true" || undefined,
      tags: params.getAll(QUERIES.FILTER_TAGS),
      country: params.get(QUERIES.FILTER_COUNTRY) || undefined,
      city: params.get(QUERIES.FILTER_CITY) || undefined,
      is_favorite: params.get(QUERIES.FILTER_IS_FAVORITE) === "true" || undefined,
      is_private: params.get(QUERIES.FILTER_IS_PRIVATE) === "true" || undefined,
      is_supposed: params.get(QUERIES.FILTER_IS_SUPPOSED) === "true" || undefined,
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
    toggleSearchBar(false);
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
              <FormLabel>{t(PLACEHOLDERS.LABEL_PRESERVATION_LEVEL)}</FormLabel>
              <PreservationSelect value={field.value} onChange={field.onChange} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="has_security"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <CheckBoxToggle
                  icon={<ShieldUser className="h-4 w-4" />}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  title={t(PLACEHOLDERS.LABEL_HAS_SECURITY)}
                  description={t(PLACEHOLDERS.DESCRIPTION_HAS_SECURITY)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="is_favorite"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <CheckBoxToggle
                  icon={<Heart className="h-4 w-4" />}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  title={t(PLACEHOLDERS.LABEL_FAVORITE)}
                  description={t(PLACEHOLDERS.DESCRIPTION_FILTER_FAVORITE)}
                />
              </FormControl>
              <FormMessage />
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
                  icon={<Lock className="h-4 w-4" />}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  title={t(PLACEHOLDERS.LABEL_PRIVATE)}
                  description={t(PLACEHOLDERS.DESCRIPTION_FILTER_PRIVATE)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="is_supposed"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <CheckBoxToggle
                  icon={<CircleQuestionMark className="h-4 w-4" />}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  title={t(PLACEHOLDERS.LABEL_SUPPOSED)}
                  description={t(PLACEHOLDERS.DESCRIPTION_PLACE_SUPPOSED)}
                />
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
              <Label>{t(PLACEHOLDERS.LABEL_TAGS)}</Label>
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
              <FormLabel>{t(PLACEHOLDERS.LABEL_COUNTRY)}</FormLabel>
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
          {t(PLACEHOLDERS.BUTTON_APPLY)} {formState.isSubmitting && <Spinner />}
        </Button>
        <Button className="w-full" variant="secondary" asChild>
          <Link href={PAGES.MAP}>{t(PLACEHOLDERS.BUTTON_CLEAR)}</Link>
        </Button>
      </form>
    </Form>
  );
};
