"use client";

import React, { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import Image from "next/image";
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
import { createPlace, uploadFile } from "@/actions";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Tag } from "@/types";
import { Label } from "@/components/ui/label";
import { CheckBoxToggle } from "@/components/common/toggles";
import { TagsSelect } from "@/components/modules/map/forms/TagsSelect";
import { validateResponse } from "@/utils/api";
import { PreservationSelect } from "@/components/modules/map/forms/PreservationSelect";
import {
  PLACE_PHOTO_ACCEPT_FILETYPES,
  PLACE_PHOTO_MAX_FILE_SIZE,
  PLACE_PHOTO_MAX_FILES,
  PLACEHOLDERS,
  QUERIES,
} from "@/config";
import { SecuritySelect } from "@/components/modules/map/forms/SecuritySelect";
import { Lock, Upload, X } from "lucide-react";
import { Dropzone, DropzoneContent, DropzoneEmptyState } from "@/components/ui/dropzone";

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
  tags: z.array(z.string()),
  preservation: z.enum(["NONE", "LOW", "MEDIUM", "HIGH", "AWESOME"]),
  security: z.enum(["NONE", "EASY", "MEDIUM", "HARD", "IMPOSSIBLE"]),
});

type Props = {
  tags?: Tag[];
};

export const AddPlaceForm = ({ tags }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      is_private: false,
      tags: [],
      preservation: "MEDIUM",
      security: "NONE",
    },
    mode: "onSubmit",
  });

  const selected = form.watch("tags");

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

  const { formState } = form;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { tags, name, is_private, preservation, security } = values;
    const point = searchParams.get(QUERIES.FILTER_SELECTED_POINT);
    const params = new URLSearchParams(searchParams);

    if (point) {
      const [lat, lng] = point.split(",").map(Number);
      const uploads = await Promise.all(files.map((file) => uploadFile(file)));
      const fileIds = uploads.map((file) => file?.id).filter((id) => !!id);

      const response = await createPlace({
        name,
        point: [lat, lng],
        tags,
        is_private,
        preservation,
        security,
        files: fileIds,
      });

      if (validateResponse(response)) {
        toast.success(PLACEHOLDERS.TOAST_PLACE_ADDED);
        params.delete(QUERIES.FILTER_SELECTED_POINT);
        params.delete(QUERIES.MODAL_PLACE_ADDING);
        router.push(`?${params}`);
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{PLACEHOLDERS.LABEL_NAME}</FormLabel>
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
              <FormLabel>{PLACEHOLDERS.LABEL_DESCRIPTION}</FormLabel>
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
              <Label>{PLACEHOLDERS.LABEL_TAGS}</Label>
              <TagsSelect
                tags={tags?.map((tag) => tag.tag) || []}
                selected={field.value}
                onSelect={handleSelect}
                onRemove={handleRemove}
              />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="preservation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{PLACEHOLDERS.LABEL_PRESERVATION_LEVEL}</FormLabel>
              <PreservationSelect value={field.value} onChange={field.onChange} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="security"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{PLACEHOLDERS.LABEL_SECURITY_LEVEL}</FormLabel>
              <SecuritySelect value={field.value} onChange={field.onChange} />
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
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  title={PLACEHOLDERS.LABEL_PRIVATE}
                  description={PLACEHOLDERS.DESCRIPTION_PLACE_PRIVATE}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="mt-2"
              onClick={(e) => {
                e.stopPropagation();
                setFiles([]);
              }}
            >
              <X className="mr-1 h-4 w-4" />
              Clear all
            </Button>
          </DropzoneContent>
          <DropzoneEmptyState>
            <Upload />
            <Label>{PLACEHOLDERS.LABEL_UPLOAD_PHOTOS}</Label>
          </DropzoneEmptyState>
        </Dropzone>
        <Button className="w-full" type="submit" disabled={formState.isSubmitting}>
          {PLACEHOLDERS.BUTTON_SAVE} {formState.isSubmitting && <Spinner />}
        </Button>
      </form>
    </Form>
  );
};
