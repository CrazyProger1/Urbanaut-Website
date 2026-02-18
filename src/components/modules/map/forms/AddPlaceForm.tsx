"use client";

import React, { useMemo, useState } from "react";
import { z } from "zod";
import Image from "next/image";
import { Link, useRouter } from "@/i18n";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
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
import { Tag } from "@/types";
import { Label } from "@/components/ui/label";
import { CheckBoxToggle } from "@/components/common/toggles";
import { TagsSelect } from "@/components/modules/map/forms/TagsSelect";
import { PreservationSelect } from "@/components/modules/map/forms/PreservationSelect";
import {
  PLACE_PHOTO_ACCEPT_FILETYPES,
  PLACE_PHOTO_MAX_FILE_SIZE,
  PLACE_PHOTO_MAX_FILES,
  PLACEHOLDERS,
  QUERIES,
} from "@/config";
import { SecuritySelect } from "@/components/modules/map/forms/SecuritySelect";
import { CircleQuestionMark, Lock, Upload, X } from "lucide-react";
import { Dropzone, DropzoneContent, DropzoneEmptyState } from "@/components/ui/dropzone";
import { validateActionResult } from "@/utils/actions";
import { usePreservedParamsLink } from "@/hooks";
import { Field } from "@/components/ui/field";
import { DateSelect } from "@/components/common/selects";
import { TabsContent, TabsList, TabsTrigger, Tabs } from "@/components/ui/tabs";

const FilePreview = ({ file }: { file: File }) => {
  const src = useMemo(() => URL.createObjectURL(file), [file]);

  return (
    <Image
      src={src}
      alt="File preview"
      width={100}
      height={100}
      className={"h-10 w-16 object-cover"}
    />
  );
};

const formSchema = z.object({
  name: z.string().max(250).min(2),
  description: z.string().max(1000).min(0),
  is_private: z.boolean(),
  is_supposed: z.boolean(),
  tags: z.array(z.string()),
  preservation: z.enum(["NONE", "LOW", "MEDIUM", "HIGH", "AWESOME"]),
  security: z.enum(["NONE", "EASY", "MEDIUM", "HARD", "IMPOSSIBLE"]),
  built_at: z.date().optional(),
  abandoned_at: z.date().optional(),
});

type Props = {
  tags?: Tag[];
};

const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await fetch("/api/files", {
    method: "POST",
    body: formData,
  });

  return response.json();
};

export const AddPlaceForm = ({ tags }: Props) => {
  const t = useTranslations("Modules");
  const searchParams = useSearchParams();
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const closeModalLink = usePreservedParamsLink({ [QUERIES.MODAL_PLACE_ADDING]: false });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      is_private: false,
      is_supposed: false,
      tags: [],
      preservation: "MEDIUM",
      security: "NONE",
    },
    mode: "onSubmit",
  });

  const selected = form.watch("tags");
  const supposed = form.watch("is_supposed");

  const handleSelect = (tag: string) => {
    if (!selected.includes(tag)) {
      form.setValue("tags", [...selected, tag]);
    }
  };

  const handleRemove = (tag: string) => {
    form.setValue(
      "tags",
      selected.filter((t) => t !== tag),
    );
  };

  const { formState, setError } = form;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const {
      tags,
      name,
      is_private,
      preservation,
      security,
      description,
      built_at,
      abandoned_at,
      is_supposed,
    } = values;
    const point = searchParams.get(QUERIES.FILTER_SELECTED_POINT);
    const params = new URLSearchParams(searchParams);

    if (point) {
      const [lat, lng] = point.split(",").map(Number);
      const uploads = await Promise.all(files.map((file) => uploadFile(file)));
      const fileIds = uploads
        .filter((upload) => upload.success)
        .map((file) => file?.id)
        .filter((id) => !!id);

      uploads.map((result) =>
        validateActionResult(result, {
          failToastMessage: t(PLACEHOLDERS.TOAST_PLACE_FILE_UPLOADING_FAIL),
        }),
      );

      const result = await createPlace({
        name,
        point: [lat, lng],
        description,
        tags,
        is_private,
        preservation,
        security,
        is_supposed,
        built_at: built_at?.toISOString().split("T")[0],
        abandoned_at: abandoned_at?.toISOString().split("T")[0],
        files: fileIds,
      });

      const validationOptions = {
        successToastMessage: t(PLACEHOLDERS.TOAST_PLACE_ADDITION_SUCCESS),
        failToastMessage: t(PLACEHOLDERS.TOAST_PLACE_ADDITION_FAIL),
        setError,
      };

      if (!validateActionResult(result, validationOptions)) {
        return;
      }

      params.delete(QUERIES.FILTER_SELECTED_POINT);
      params.delete(QUERIES.MODAL_PLACE_ADDING);
      router.push(`?${params}`);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Tabs defaultValue="overview" className="gap-4 py-4">
          <TabsList className="w-full">
            <TabsTrigger value="overview">{t(PLACEHOLDERS.TAB_GENERAL)}</TabsTrigger>
            <TabsTrigger value="dates">{t(PLACEHOLDERS.TAB_DATES)}</TabsTrigger>
            <TabsTrigger value="state">{t(PLACEHOLDERS.TAB_STATE)}</TabsTrigger>
            <TabsTrigger value="media">{t(PLACEHOLDERS.TAB_MEDIA)}</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t(PLACEHOLDERS.LABEL_NAME)}</FormLabel>
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
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <Label>{t(PLACEHOLDERS.LABEL_TAGS)}</Label>
                  <TagsSelect
                    tags={tags?.map((tag) => tag.tag) || []}
                    selected={field.value}
                    onSelect={handleSelect}
                    onRemove={handleRemove}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="is_private"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CheckBoxToggle
                      icon={<Lock className="h-4 w-4" />}
                      checked={field.value || supposed}
                      disabled={supposed}
                      onCheckedChange={field.onChange}
                      title={t(PLACEHOLDERS.LABEL_PRIVATE)}
                      description={t(PLACEHOLDERS.DESCRIPTION_PLACE_PRIVATE)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="is_supposed"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CheckBoxToggle
                      icon={<CircleQuestionMark className="h-4 w-4" />}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      title={t(PLACEHOLDERS.LABEL_SUPPOSED)}
                      description={t(PLACEHOLDERS.DESCRIPTION_PLACE_SUPPOSED)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>
          <TabsContent value="dates" className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="built_at"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <DateSelect
                      value={field.value}
                      onChange={field.onChange}
                      label={t(PLACEHOLDERS.LABEL_BUILT)}
                      placeholder={t(PLACEHOLDERS.LABEL_SELECT_DATE)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="abandoned_at"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <DateSelect
                      value={field.value}
                      onChange={field.onChange}
                      label={t(PLACEHOLDERS.LABEL_ABANDONED)}
                      placeholder={t(PLACEHOLDERS.LABEL_SELECT_DATE)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>
          <TabsContent value="state" className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="preservation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t(PLACEHOLDERS.LABEL_PRESERVATION_LEVEL)}</FormLabel>
                  <PreservationSelect value={field.value} onChange={field.onChange} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="security"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t(PLACEHOLDERS.LABEL_SECURITY_LEVEL)}</FormLabel>
                  <SecuritySelect value={field.value} onChange={field.onChange} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>
          <TabsContent value="media" className="flex flex-col gap-4">
            <Dropzone
              src={files.length ? files : undefined}
              accept={{ "image/*": PLACE_PHOTO_ACCEPT_FILETYPES }}
              maxSize={PLACE_PHOTO_MAX_FILE_SIZE}
              maxFiles={PLACE_PHOTO_MAX_FILES}
              onDropAccepted={(acceptedFiles) => {
                setFiles((prev) => [...prev, ...acceptedFiles]);
              }}
            >
              <DropzoneContent>
                <div className="flex flex-row flex-wrap justify-center gap-2">
                  {files.map((file, index) => (
                    <FilePreview key={file.name + index} file={file} />
                  ))}
                </div>
                <span
                  role="button"
                  className="text-muted-foreground hover:text-foreground mt-2 inline-flex cursor-pointer items-center text-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFiles([]);
                  }}
                >
                  <X className="mr-1 h-4 w-4" />
                  {t(PLACEHOLDERS.BUTTON_CLEAR)}
                </span>
              </DropzoneContent>
              <DropzoneEmptyState>
                <Upload />
                <Label>{t(PLACEHOLDERS.LABEL_UPLOAD_PHOTOS)}</Label>
              </DropzoneEmptyState>
            </Dropzone>
          </TabsContent>
        </Tabs>
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
