"use client";

import React from "react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, usePathname, useRouter } from "@/i18n";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { login, register } from "@/actions";
import { toast } from "react-toastify";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription } from "@/components/ui/field";

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
}

export const SignupForm = ({ otherProviders }: Props) => {
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
    const success = await register(values.email, values.password);

    let user;
    if (success) {
      user = await login(values.email, values.password);
    }
    if (!user) {
      return toast("This email is already used!", {
        position: "bottom-right",
        type: "error",
        theme: "dark",
        autoClose: 2000,
      });
    }

    const params = new URLSearchParams(searchParams);
    params.delete("signin");
    const newPage = `${pathname}?${params}`;
    router.push(newPage);
    toast("Successfully signed in!", {
      position: "bottom-right",
      type: "success",
      theme: user?.settings.theme?.toLowerCase() || "dark",
      autoClose: 2000,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create new account</CardTitle>
        <CardDescription>
          Here you can easily create your account in one click 😉
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center gap-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
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
                <FormItem className="w-full">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription className="text-end">
                    <Link
                      href="#"
                      className="text-sm hover:underline text-end"
                    >
                      Forgot your password?
                    </Link>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Field>
              <Button className="w-full" type="submit" disabled={formState.isSubmitting}>
                Sign Up {formState.isSubmitting && <Spinner />}
              </Button>
              {otherProviders?.map((provider, i) => (
                <React.Fragment key={i}>{provider}</React.Fragment>
              ))}
              <FieldDescription className="text-center">
                Already have an account? <Link href="?signin=true">Sign in</Link>
              </FieldDescription>
            </Field>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

