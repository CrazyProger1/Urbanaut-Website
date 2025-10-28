"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { z } from "zod";
import { useRouter } from "@/i18n";
import { useSearchParams } from "next/navigation";
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
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { createArea } from "@/actions";
import { APIPoint } from "@/types";
import { Textarea } from "@/components/ui/textarea";
import { TagsSelect } from "./TagsSelect";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().max(250).min(2),
  description: z.string().max(1000).min(0),
});

export const AddAreaForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
    mode: "onSubmit",
  });

  const { formState } = form;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const points = searchParams.get("points");
    const params = new URLSearchParams(searchParams);

    if (points) {
      const polygon: APIPoint[] = points.split(";").map((point) => {
        const [lat, lng, ...rest] = point.split(",").map(Number);
        return [lat, lng];
      });

      await createArea({ ...values, polygon: polygon });
      toast.success("Area added successfully.");
      params.delete("points");
      params.delete("addarea");
      router.push(`?${params}`);
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create new area</CardTitle>
        <CardDescription>Here you can easily create new area ❤️</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Chornobyl disaster zone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <TagsSelect />
            <Button className="w-full" type="submit" disabled={formState.isSubmitting}>
              Save {formState.isSubmitting && <Spinner />}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
