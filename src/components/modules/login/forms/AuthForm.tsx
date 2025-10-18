"use client";

import { z } from "zod";
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

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { login, register } from "@/actions";
import { usePathname, useRouter } from "@/i18n";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import { Spinner } from "@/components/ui/spinner";

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

export const AuthForm = () => {
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
  const { formState } = form;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let user = await login(values.email, values.password);
    let message = "Successfully logged in!";

    if (!user) {
      user = await register(values.email, values.password);
      message = "Successfully signed up!";
    }

    const params = new URLSearchParams(searchParams);
    params.delete("auth");
    const newPage = `${pathname}?${params}`;
    router.push(newPage);
    toast(message, {
      position: "bottom-right",
      type: "success",
      theme: user?.settings.theme?.toLowerCase() || "dark",
      autoClose: 2000,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center gap-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="crazyurbanaut" {...field} />
              </FormControl>
              <FormDescription>Email.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>This is your strong password.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit" disabled={formState.isSubmitting}>
          Sign In/Up {formState.isSubmitting && <Spinner />}
        </Button>
      </form>
    </Form>
  );
};
