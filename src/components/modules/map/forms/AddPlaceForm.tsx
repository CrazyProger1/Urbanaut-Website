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
import { createPlace } from "@/actions";
import { Textarea } from "@/components/ui/textarea";
import { TagsSelect } from "./TagsSelect";
import { toast } from "sonner";
import { APITag } from "@/types";

const formSchema = z.object({
  name: z.string().max(250).min(2),
  description: z.string().max(1000).min(0),
});

type Props = {
  tags?: APITag[];
};

export const AddPlaceForm = ({ tags }: Props) => {
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
    const point = searchParams.get("point");
    const params = new URLSearchParams(searchParams);

    if (point) {
      const [lat, lng] = point.split(",").map(Number);
      await createPlace({ name: values.name, point: [lat, lng] });
      toast.success("Place added successfully.");
      params.delete("point");
      params.delete("addplace");
      router.push(`?${params}`);
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create new place</CardTitle>
        <CardDescription>Here you can easily create new place ❤️</CardDescription>
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
                    <Input placeholder="Abandoned Factory" {...field} />
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
            <TagsSelect tags={tags} />
            <Button className="w-full" type="submit" disabled={formState.isSubmitting}>
              Save {formState.isSubmitting && <Spinner />}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
