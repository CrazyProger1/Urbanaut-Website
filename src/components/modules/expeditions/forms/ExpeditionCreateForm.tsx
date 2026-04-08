"use client";

import React, { useMemo } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Link, useRouter } from "@/i18n";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PLACEHOLDERS, QUERIES } from "@/config";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { expeditionFormSchema } from "@/schemas";
import { z } from "zod";
import { LocalizedFormField } from "@/components/ui/improved/localized";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Language } from "@/types";
import { CheckBoxToggle } from "@/components/common/toggles";
import { Lock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Field } from "@/components/ui/field";
import { usePreservedParamsLink } from "@/hooks";

type Props = {
  languages?: Language[];
  planned?: boolean;
};

export const ExpeditionCreateForm = ({ languages, planned }: Props) => {
  const t = useTranslations("Modules");
  const searchParams = useSearchParams();
  const router = useRouter();
  const closeModalLink = usePreservedParamsLink({ [QUERIES.MODAL_CREATE_EXPEDITION]: false });

  const form = useForm<z.infer<typeof expeditionFormSchema>>({
    resolver: zodResolver(expeditionFormSchema),
    defaultValues: {
      name_en: "",
      name_ru: "",
      name_uk: "",
      description_en: "",
      description_ru: "",
      description_uk: "",
      summary_en: "",
      summary_ru: "",
      summary_uk: "",
      is_private: false,
    },
    mode: "onSubmit",
  });

  const { formState } = form;

  const languageCodes = useMemo(() => {
    return languages?.map((language) => language.code) || [];
  }, [languages]);

  const onSubmit = async (values: z.infer<typeof expeditionFormSchema>) => {};
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Tabs defaultValue="general" className="gap-4 py-4">
          <TabsList className="w-full">
            <TabsTrigger value="general">{t(PLACEHOLDERS.TAB_GENERAL)}</TabsTrigger>
            <TabsTrigger value="participants">{t(PLACEHOLDERS.TAB_PARTICIPANTS)}</TabsTrigger>
            <TabsTrigger value="route">{t(PLACEHOLDERS.TAB_ROUTE)}</TabsTrigger>
            <TabsTrigger value="report" disabled={planned}>
              {t(PLACEHOLDERS.TAB_REPORT)}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="general" className="flex flex-col gap-4">
            <LocalizedFormField
              languages={languageCodes}
              control={form.control}
              basename="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t(PLACEHOLDERS.LABEL_NAME)}</FormLabel>
                  <FormControl>
                    <Input placeholder={t(PLACEHOLDERS.LABEL_ENTER_NAME)} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <LocalizedFormField
              languages={languageCodes}
              control={form.control}
              basename="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t(PLACEHOLDERS.LABEL_DESCRIPTION)}</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
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
                      description={t(PLACEHOLDERS.DESCRIPTION_EXPEDITION_PRIVATE)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>
          <TabsContent value="report" className="flex flex-col gap-4">
            <LocalizedFormField
              languages={languageCodes}
              control={form.control}
              basename="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t(PLACEHOLDERS.LABEL_SUMMARY)}</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>
        </Tabs>
        <Field className="flex flex-col">
          <Button className="w-full" type="submit" disabled={formState.isSubmitting}>
            {t(PLACEHOLDERS.BUTTON_SAVE)} {formState.isSubmitting && <Spinner />}
          </Button>
          <Button className="w-full" type="button" variant="outline" asChild>
            <Link href={closeModalLink}>{t(PLACEHOLDERS.BUTTON_CANCEL)}</Link>
          </Button>
        </Field>
      </form>
    </Form>
  );
};
