"use client";

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { createFeedback } from "@/actions/feedback";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { Link, usePathname } from "@/i18n";
import { PLACEHOLDERS, QUERIES } from "@/config";
import { validateActionResult } from "@/utils/actions";
import { Field } from "@/components/ui/field";
import { usePreservedParamsLink } from "@/hooks";

const formSchema = z.object({
  content: z.string().max(5000).min(5),
});

export const FeedbackForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
    mode: "onSubmit",
  });

  const closeModalLink = usePreservedParamsLink({ [QUERIES.MODAL_FEEDBACK]: false });

  const { setError } = form;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const result = await createFeedback(values);

    const validationOptions = {
      successToastMessage: PLACEHOLDERS.TOAST_FEEDBACK_SUCCESS,
      failToastMessage: PLACEHOLDERS.TOAST_FEEDBACK_FAIL,
      setError,
    };

    if (!validateActionResult(result, validationOptions)) {
      return;
    }

    const params = new URLSearchParams(searchParams);
    params.delete(QUERIES.MODAL_FEEDBACK);
    const newPage = `${pathname}?${params}`;
    router.push(newPage);
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
              <FormLabel>Feedback</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Field className="flex flex-col">
          <Button className="w-full" type="submit" disabled={formState.isSubmitting}>
            {PLACEHOLDERS.BUTTON_SAVE} {formState.isSubmitting && <Spinner />}
          </Button>
          <Button className="w-full" type="button" variant="outline" asChild>
            <Link href={closeModalLink}>{PLACEHOLDERS.BUTTON_CANCEL}</Link>
          </Button>
        </Field>
      </form>
    </Form>
  );
};
