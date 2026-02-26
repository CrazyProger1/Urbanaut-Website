"use client";

import React, { useEffect, useMemo, useState } from "react";
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
import { APICreatePlace, APIUpdatePlace, CurrentUser, Place, PlaceDetail, Tag } from "@/types";
import { Label } from "@/components/ui/label";
import { CheckBoxToggle } from "@/components/common/toggles";
import { TagsSelect } from "@/components/modules/map/forms/TagsSelect";
import {
  PLACE_PHOTO_ACCEPT_FILETYPES,
  PLACE_PHOTO_MAX_FILE_SIZE,
  PLACE_PHOTO_MAX_FILES,
  PLACEHOLDERS,
  QUERIES,
} from "@/config";
import {
  Image as ImageIcon,
  Armchair,
  BrickWall,
  Cctv,
  CircleQuestionMark,
  Dog,
  DoorClosed,
  House,
  LampCeiling,
  Layers,
  Lock,
  Radar,
  ShieldUser,
  Sparkles,
  Swords,
  Upload,
  X,
} from "lucide-react";
import { Dropzone, DropzoneContent, DropzoneEmptyState } from "@/components/ui/dropzone";
import { validateActionResult } from "@/utils/actions";
import { getDiff } from "@/utils/diff";
import { usePreservedParamsLink } from "@/hooks";
import { Field } from "@/components/ui/field";
import { DateSelect } from "@/components/common/selects";
import { TabsContent, TabsList, TabsTrigger, Tabs } from "@/components/ui/tabs";
import { editPlace } from "@/actions/place";

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
  has_roof: z.boolean().optional(),
  has_floor: z.boolean().optional(),
  has_walls: z.boolean().optional(),
  has_windows: z.boolean().optional(),
  has_doors: z.boolean().optional(),
  has_furniture: z.boolean().optional(),
  is_clean: z.boolean().optional(),
  has_security: z.boolean().optional(),
  // has_dogs: z.boolean().optional(),
  // has_weapons: z.boolean().optional(),
  // has_sensors: z.boolean().optional(),
  // has_cameras: z.boolean().optional(),
  has_internal_ceilings: z.boolean().optional(),
  built_at: z.date().optional(),
  abandoned_at: z.date().optional(),
});

type Props = {
  tags?: Tag[];
  place?: PlaceDetail;
  user?: CurrentUser;
  edit?: boolean;
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

export const PlaceForm = ({ tags, place, edit, user }: Props) => {
  const t = useTranslations("Modules");
  const searchParams = useSearchParams();
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const closeModalLink = usePreservedParamsLink({
    [QUERIES.MODAL_PLACE_ADDING]: false,
    [QUERIES.MODAL_EDIT_PLACE]: false,
    [QUERIES.FILTER_SELECTED_POINT]: false,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      has_windows: place?.preservation.has_windows ?? false,
      has_floor: place?.preservation.has_floor ?? false,
      has_doors: place?.preservation.has_doors ?? false,
      has_roof: place?.preservation.has_roof ?? false,
      has_walls: place?.preservation.has_walls ?? false,
      has_internal_ceilings: place?.preservation.has_internal_ceilings ?? false,
      has_security: place?.security.has_security ?? false,
      has_furniture: place?.preservation.has_furniture ?? false,
      is_clean: place?.preservation.is_clean ?? false,
      name: place?.name || "",
      description: place?.description || "",
      is_private: place?.is_private ?? false,
      is_supposed: place?.is_supposed ?? false,
      tags: place?.tags || [],
      abandoned_at: place?.abandoned_at ? new Date(place?.abandoned_at) : undefined,
      built_at: place?.built_at ? new Date(place?.built_at) : undefined,
    },
    mode: "onSubmit",
  });

  const selected = form.watch("tags");
  const isSupposed = form.watch("is_supposed");

  useEffect(() => {
    if (isSupposed) {
      form.setValue("is_private", true);
    }
  }, [isSupposed, form]);

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
      description,
      built_at,
      abandoned_at,
      is_supposed,
      is_private,
      has_windows,
      has_roof,
      has_floor,
      has_walls,
      has_doors,
      has_internal_ceilings,
      has_furniture,
      is_clean,
      // has_dogs,
      // has_weapons,
      // has_cameras,
      // has_sensors,
      has_security,
    } = values;
    const point = searchParams.get(QUERIES.FILTER_SELECTED_POINT);

    const body = {
      name,
      description,
      tags,
      preservation: {
        has_windows,
        has_doors,
        has_floor,
        has_walls,
        has_roof,
        has_internal_ceilings,
        has_furniture,
        is_clean,
      },
      security: {
        has_security,
        // Doubts about legality
        // has_cameras,
        // has_dogs,
        // has_weapons,
        // has_sensors,
      },
      is_supposed,
      is_private,
      built_at: built_at?.toISOString().split("T")[0],
      abandoned_at: abandoned_at?.toISOString().split("T")[0],
    };

    if (edit && place) {
      const isOwner = user?.id === place?.created_by?.id;
      const result = await editPlace(place.id, getDiff(place, body), isOwner);

      const validationOptions = {
        successToastMessage: isOwner
          ? t(PLACEHOLDERS.TOAST_PLACE_EDIT_SUCCESS)
          : t(PLACEHOLDERS.TOAST_PLACE_EDIT_REQUEST_SENT_SUCCESS),
        failToastMessage: isOwner
          ? t(PLACEHOLDERS.TOAST_PLACE_EDIT_FAIL)
          : t(PLACEHOLDERS.TOAST_PLACE_EDIT_REQUEST_SENT_FAIL),
        setError,
      };

      if (!validateActionResult(result, validationOptions)) {
        return;
      }
    } else if (point) {
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

      const result = await createPlace({ ...body, point: [lat, lng], files: fileIds });

      const validationOptions = {
        successToastMessage: t(PLACEHOLDERS.TOAST_PLACE_ADDITION_SUCCESS),
        failToastMessage: t(PLACEHOLDERS.TOAST_PLACE_ADDITION_FAIL),
        setError,
      };

      if (!validateActionResult(result, validationOptions)) {
        return;
      }
    } else {
      return;
    }
    router.push(closeModalLink);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Tabs defaultValue="general" className="gap-4 py-4">
          <TabsList className="w-full">
            <TabsTrigger value="general">{t(PLACEHOLDERS.TAB_GENERAL)}</TabsTrigger>
            <TabsTrigger value="dates">{t(PLACEHOLDERS.TAB_DATES)}</TabsTrigger>
            <TabsTrigger value="preservation">{t(PLACEHOLDERS.LABEL_PRESERVATION)}</TabsTrigger>
            <TabsTrigger value="media" disabled={edit}>
              {t(PLACEHOLDERS.TAB_MEDIA)}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="general" className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t(PLACEHOLDERS.LABEL_NAME)}</FormLabel>
                  <FormControl>
                    <Input placeholder="Abandoned factory..." {...field} />
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
                      checked={field.value}
                      disabled={isSupposed}
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
            <FormField
              control={form.control}
              name="has_security"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CheckBoxToggle
                      icon={<ShieldUser className="h-4 w-4" />}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      title={t(PLACEHOLDERS.LABEL_HAS_SECURITY)}
                      description={t(PLACEHOLDERS.DESCRIPTION_HAS_SECURITY)}
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
          <TabsContent value="preservation" className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="has_roof"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CheckBoxToggle
                      icon={<House className="h-4 w-4" />}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      title={t(PLACEHOLDERS.LABEL_HAS_ROOF)}
                      description={t(PLACEHOLDERS.DESCRIPTION_HAS_ROOF)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="has_floor"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CheckBoxToggle
                      icon={<Layers className="h-4 w-4" />}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      title={t(PLACEHOLDERS.LABEL_HAS_FLOOR)}
                      description={t(PLACEHOLDERS.DESCRIPTION_HAS_FLOOR)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="has_internal_ceilings"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CheckBoxToggle
                      icon={<LampCeiling className="h-4 w-4" />}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      title={t(PLACEHOLDERS.LABEL_HAS_INTERNAL_CEILINGS)}
                      description={t(PLACEHOLDERS.DESCRIPTION_HAS_INTERNAL_CEILINGS)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="has_walls"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CheckBoxToggle
                      icon={<BrickWall className="h-4 w-4" />}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      title={t(PLACEHOLDERS.LABEL_HAS_WALLS)}
                      description={t(PLACEHOLDERS.DESCRIPTION_HAS_WALLS)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="has_windows"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CheckBoxToggle
                      icon={<ImageIcon className="h-4 w-4" />}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      title={t(PLACEHOLDERS.LABEL_HAS_WINDOWS)}
                      description={t(PLACEHOLDERS.DESCRIPTION_HAS_WINDOWS)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="has_doors"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CheckBoxToggle
                      icon={<DoorClosed className="h-4 w-4" />}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      title={t(PLACEHOLDERS.LABEL_HAS_DOORS)}
                      description={t(PLACEHOLDERS.DESCRIPTION_HAS_DOORS)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="has_furniture"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CheckBoxToggle
                      icon={<Armchair className="h-4 w-4" />}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      title={t(PLACEHOLDERS.LABEL_HAS_FURNITURE)}
                      description={t(PLACEHOLDERS.DESCRIPTION_HAS_FURNITURE)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="is_clean"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CheckBoxToggle
                      icon={<Sparkles className="h-4 w-4" />}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      title={t(PLACEHOLDERS.LABEL_IS_CLEAN)}
                      description={t(PLACEHOLDERS.DESCRIPTION_IS_CLEAN)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>
          {/*{hasSecurity && (*/}
          {/*  <>*/}
          {/*    <FormField*/}
          {/*      control={form.control}*/}
          {/*      name="has_dogs"*/}
          {/*      render={({ field }) => (*/}
          {/*        <FormItem>*/}
          {/*          <FormControl>*/}
          {/*            <CheckBoxToggle*/}
          {/*              icon={<Dog className="h-4 w-4" />}*/}
          {/*              checked={field.value}*/}
          {/*              onCheckedChange={field.onChange}*/}
          {/*              title={t(PLACEHOLDERS.LABEL_HAS_DOGS)}*/}
          {/*              description={t(PLACEHOLDERS.DESCRIPTION_HAS_DOGS)}*/}
          {/*            />*/}
          {/*          </FormControl>*/}
          {/*          <FormMessage />*/}
          {/*        </FormItem>*/}
          {/*      )}*/}
          {/*    />*/}
          {/*    <FormField*/}
          {/*      control={form.control}*/}
          {/*      name="has_weapons"*/}
          {/*      render={({ field }) => (*/}
          {/*        <FormItem>*/}
          {/*          <FormControl>*/}
          {/*            <CheckBoxToggle*/}
          {/*              icon={<Swords className="h-4 w-4" />}*/}
          {/*              checked={field.value}*/}
          {/*              onCheckedChange={field.onChange}*/}
          {/*              title={t(PLACEHOLDERS.LABEL_HAS_WEAPONS)}*/}
          {/*              description={t(PLACEHOLDERS.DESCRIPTION_HAS_WEAPONS)}*/}
          {/*            />*/}
          {/*          </FormControl>*/}
          {/*          <FormMessage />*/}
          {/*        </FormItem>*/}
          {/*      )}*/}
          {/*    />*/}
          {/*    <FormField*/}
          {/*      control={form.control}*/}
          {/*      name="has_cameras"*/}
          {/*      render={({ field }) => (*/}
          {/*        <FormItem>*/}
          {/*          <FormControl>*/}
          {/*            <CheckBoxToggle*/}
          {/*              icon={<Cctv className="h-4 w-4" />}*/}
          {/*              checked={field.value}*/}
          {/*              onCheckedChange={field.onChange}*/}
          {/*              title={t(PLACEHOLDERS.LABEL_HAS_CAMERAS)}*/}
          {/*              description={t(PLACEHOLDERS.DESCRIPTION_HAS_CAMERAS)}*/}
          {/*            />*/}
          {/*          </FormControl>*/}
          {/*          <FormMessage />*/}
          {/*        </FormItem>*/}
          {/*      )}*/}
          {/*    />*/}
          {/*    <FormField*/}
          {/*      control={form.control}*/}
          {/*      name="has_sensors"*/}
          {/*      render={({ field }) => (*/}
          {/*        <FormItem>*/}
          {/*          <FormControl>*/}
          {/*            <CheckBoxToggle*/}
          {/*              icon={<Radar className="h-4 w-4" />}*/}
          {/*              checked={field.value}*/}
          {/*              onCheckedChange={field.onChange}*/}
          {/*              title={t(PLACEHOLDERS.LABEL_HAS_SENSORS)}*/}
          {/*              description={t(PLACEHOLDERS.DESCRIPTION_HAS_SENSORS)}*/}
          {/*            />*/}
          {/*          </FormControl>*/}
          {/*          <FormMessage />*/}
          {/*        </FormItem>*/}
          {/*      )}*/}
          {/*    />*/}
          {/*  </>*/}
          {/*)}*/}
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
