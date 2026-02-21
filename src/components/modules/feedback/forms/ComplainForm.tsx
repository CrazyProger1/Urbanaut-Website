"use client";

import React from "react";
import { z } from "zod";
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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useRouter, useSearchParams } from "next/navigation";
import { Link, usePathname } from "@/i18n";
import { PLACEHOLDERS, QUERIES } from "@/config";
import { validateActionResult } from "@/utils/actions";
import { Field } from "@/components/ui/field";
import { usePreservedParamsLink } from "@/hooks";
import { useTranslations } from "next-intl";
import { leaveComplaint } from "@/actions";

const formSchema = z.object({
  content: z.string().max(5000).min(5),
});

export const ComplainForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const t = useTranslations("Modules");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
    mode: "onSubmit",
  });

  const closeModalLink = usePreservedParamsLink({ [QUERIES.MODAL_COMPLAIN]: false });

  const { setError } = form;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const result = await leaveComplaint(values.content, `${pathname}?${searchParams}`);

    const validationOptions = {
      successToastMessage: t(PLACEHOLDERS.TOAST_COMPLAIN_SUCCESS),
      failToastMessage: t(PLACEHOLDERS.TOAST_COMPLAIN_FAIL),
      setError,
    };

    if (!validateActionResult(result, validationOptions)) {
      return;
    }

    router.push(closeModalLink);
  };

  const { formState } = form;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center gap-4">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>{t(PLACEHOLDERS.LABEL_COMPLAIN)}</FormLabel>
              <FormControl>
                <Textarea {...field} />
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
