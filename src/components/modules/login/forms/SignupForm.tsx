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
import { login, register } from "@/actions";
import { Field, FieldDescription } from "@/components/ui/field";
import { toast } from "sonner";
import { QUERIES, PLACEHOLDERS } from "@/config";
import { CountrySelect } from "@/components/modules/common/selects";
import { Country } from "@/types";
import { BirthDateSelector } from "./BirthDateSelector";
import { loginOneSignal } from "@/services/lib/onesignal";

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
  country: z.string().max(2),
  first_name: z.string().max(150),
  last_name: z.string().max(150),
  born_at: z
    .date()
    .optional()
    .refine(
      (date) => {
        if (!date) return true;
        if (date > new Date()) return false;
        const today = new Date();
        const tenYearsAgo = new Date(today.getFullYear() - 10, today.getMonth(), today.getDate());
        return date <= tenYearsAgo;
      },
      {
        message: "Birth date must be in the past and you must be at least 10 years old",
      },
    ),
});

type Props = {
  countries?: Country[];
  otherProviders?: React.ReactNode[];
};

export const SignupForm = ({ otherProviders, countries }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  // const t = useTranslations()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      country: "",
      first_name: "",
      last_name: "",
      born_at: undefined,
    },
    mode: "onSubmit",
  });
  const { formState } = form;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const code = searchParams.get("code") ?? undefined;
    const success = await register({
      ...values,
      born_at: values.born_at?.toISOString().split("T")[0],
      code,
    });

    let user;
    if (success) {
      user = await login(values.email, values.password);
    }
    if (!user) {
      return toast.error(PLACEHOLDERS.TOAST_EMAIL_EXISTS);
    }

    await loginOneSignal(user.id);

    const params = new URLSearchParams(searchParams);
    params.delete(QUERIES.MODAL_SIGNUP);
    const newPage = `${pathname}?${params}`;
    router.push(newPage);
    toast.success(PLACEHOLDERS.TOAST_SIGNIN_SUCCESS);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name or Pseudo</FormLabel>
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
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Doe" {...field} />
              </FormControl>
              <FormMessage />
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
        <FormField
          control={form.control}
          name="born_at"
          render={({ field }) => (
            <FormItem>
              <BirthDateSelector value={field.value} onChange={field.onChange} />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
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
              <FormLabel>Password</FormLabel>
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
            {PLACEHOLDERS.BUTTON_SIGNUP} {formState.isSubmitting && <Spinner />}
          </Button>
          {otherProviders?.map((provider, i) => (
            <React.Fragment key={i}>{provider}</React.Fragment>
          ))}
          <FieldDescription className="text-center">
            {PLACEHOLDERS.LABEL_HAVE_ACCOUNT} <Link href={`?${QUERIES.MODAL_SIGNIN}=true`}>{PLACEHOLDERS.BUTTON_SIGNIN}</Link>
          </FieldDescription>
        </Field>
      </form>
    </Form>
  );
};
