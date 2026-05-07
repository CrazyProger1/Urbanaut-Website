"use client";

import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PLACEHOLDERS, QUERIES } from "@/config";
import { Field } from "@/components/ui/field";
import { Link, useRouter } from "@/i18n";
import { usePreservedParamsLink } from "@/hooks";
import { useTranslations } from "next-intl";
import { teamCreateFormSchema } from "@/schemas";
import { createTeam } from "@/actions";
import { validateActionResult } from "@/utils/actions";

export const TeamCreateForm = () => {
  const t = useTranslations("Modules");
  const router = useRouter();

  const form = useForm<z.infer<typeof teamCreateFormSchema>>({
    resolver: zodResolver(teamCreateFormSchema),
    defaultValues: {
      name: "",
      description: "",
      motto: "",
    },
    mode: "onSubmit",
  });

  const { formState, setError } = form;

  const closeModalLink = usePreservedParamsLink({ [QUERIES.MODAL_CREATE_TEAM]: false });

  const onSubmit = async (values: z.infer<typeof teamCreateFormSchema>) => {
    const result = await createTeam({
      name: values.name,
      description: values.description || undefined,
      motto: values.motto || undefined,
    });

    const validationOptions = {
      successToastMessage: t(PLACEHOLDERS.TOAST_TEAM_CREATE_SUCCESS),
      failToastMessage: t(PLACEHOLDERS.TOAST_TEAM_CREATE_FAIL),
      setError,
    };

    if (!validateActionResult(result, validationOptions)) {
      return;
    }

    router.push(closeModalLink, { scroll: false });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t(PLACEHOLDERS.LABEL_NAME)}</FormLabel>
              <FormControl>
                <Input placeholder="Urban Explorers" {...field} />
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
          name="motto"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t(PLACEHOLDERS.LABEL_MOTTO)}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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