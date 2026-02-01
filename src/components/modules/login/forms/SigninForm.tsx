"use client";

import React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, usePathname, useRouter } from "@/i18n";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/actions";
import { Field, FieldDescription } from "@/components/ui/field";
import { toast } from "sonner";
import { QUERIES, PLACEHOLDERS } from "@/config";
import OneSignal from "react-onesignal";
import { loginOneSignal } from "@/services/lib/onesignal";
import { validateActionResult } from "@/utils/actions";

const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(12, "Password must be at least 12 characters")
    .max(64, "Password must be at most 64 characters")
    .regex(/[a-z]/, "Password must contain a lowercase letter")
    .regex(/[A-Z]/, "Password must contain an uppercase letter")
    .regex(/[0-9]/, "Password must contain a number")
    .regex(/[!@#$%^&*()_\-+=<>?]/, "Password must contain a special character"),
});

type Props = {
  otherProviders?: React.ReactNode[];
};

export const SigninForm = ({ otherProviders }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  // const t = useTranslations()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });
  const { formState, setError } = form;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const result = await login(values.email, values.password);

    if (
      !validateActionResult(result, {
        failToastMessage: PLACEHOLDERS.TOAST_SIGNIN_FAIL,
        successToastMessage: PLACEHOLDERS.TOAST_SIGNIN_SUCCESS,
        setError,
      })
    ) {
      return;
    }

    const user = result.user;

    if (!user) {
      return;
    }

    await loginOneSignal(user.id);

    const params = new URLSearchParams(searchParams);
    params.delete(QUERIES.MODAL_SIGNIN);
    const newPage = `${pathname}?${params}`;
    router.push(newPage);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{PLACEHOLDERS.LABEL_EMAIL}</FormLabel>
              <FormControl>
                <Input placeholder="crazyurbanaut@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{PLACEHOLDERS.LABEL_PASSWORD}</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormDescription className="text-end">
                <Link href="#" className="text-end text-sm hover:underline">
                  {PLACEHOLDERS.LABEL_FORGOT_PASSWORD}
                </Link>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Field>
          <Button className="w-full" type="submit" disabled={formState.isSubmitting}>
            {PLACEHOLDERS.BUTTON_SIGNIN} {formState.isSubmitting && <Spinner />}
          </Button>
          {otherProviders?.map((provider, i) => (
            <React.Fragment key={i}>{provider}</React.Fragment>
          ))}
          <FieldDescription className="text-center">
            {PLACEHOLDERS.LABEL_NO_ACCOUNT}{" "}
            <Link href={`?${QUERIES.MODAL_SIGNUP}=true`}>{PLACEHOLDERS.BUTTON_SIGNUP}</Link>
          </FieldDescription>
        </Field>
      </form>
    </Form>
  );
};
