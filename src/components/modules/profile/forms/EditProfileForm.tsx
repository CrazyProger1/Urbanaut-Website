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
import { Link, useRouter } from "@/i18n";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { QUERIES, PLACEHOLDERS } from "@/config";
import { SessionUser } from "@/types";
import { Textarea } from "@/components/ui/textarea";
import { updateCurrentUser } from "@/actions";
import { Field } from "@/components/ui/field";
import { usePreservedParamsLink } from "@/hooks";
import { validateActionResult } from "@/utils/actions";

const formSchema = z.object({
  first_name: z
    .string()
    .min(3, "First name must be at least 3 characters")
    .max(150)
    .optional()
    .or(z.literal("")),
  last_name: z.string().max(150),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(150, "Username must be at most 150 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores")
    .optional(),
  bio: z.string().max(250),
});

type Props = {
  user?: SessionUser;
};

export const EditProfileForm = ({ user }: Props) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: user?.first_name ?? "",
      last_name: user?.last_name ?? "",
      username: user?.usernames?.[0] ?? "",
      bio: user?.bio ?? "",
    },
    mode: "onSubmit",
  });

  const { formState, setError } = form;

  const closeModalLink = usePreservedParamsLink({ [QUERIES.MODAL_EDIT_PROFILE]: false });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const result = await updateCurrentUser(values);
    const validationOptions = {
      successToastMessage: PLACEHOLDERS.TOAST_PROFILE_UPDATE_SUCCESS,
      failToastMessage: PLACEHOLDERS.TOAST_PROFILE_UPDATE_FAIL,
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
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{PLACEHOLDERS.LABEL_FIRST_NAME}</FormLabel>
              <FormControl>
                <Input placeholder="John" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{PLACEHOLDERS.LABEL_LAST_NAME}</FormLabel>
              <FormControl>
                <Input placeholder="Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/*<FormField*/}
        {/*  control={form.control}*/}
        {/*  name="username"*/}
        {/*  render={({ field }) => (*/}
        {/*    <FormItem>*/}
        {/*      <FormLabel>{PLACEHOLDERS.LABEL_USERNAME}</FormLabel>*/}
        {/*      <FormControl>*/}
        {/*        <Input placeholder="johndoe" {...field} />*/}
        {/*      </FormControl>*/}
        {/*      <FormMessage />*/}
        {/*    </FormItem>*/}
        {/*  )}*/}
        {/*/>*/}
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{PLACEHOLDERS.LABEL_BIO}</FormLabel>
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
