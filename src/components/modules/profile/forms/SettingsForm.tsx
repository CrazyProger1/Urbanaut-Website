"use client";

import React from "react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Link, useRouter } from "@/i18n";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { QUERIES, PLACEHOLDERS } from "@/config";
import { CurrentUser } from "@/types";
import { Field } from "@/components/ui/field";
import { usePreservedParamsLink } from "@/hooks";
import { Globe, Bell, Mail, Pointer } from "lucide-react";
import { LanguageSelect } from "./LanguageSelect";
import { SwitchToggle } from "@/components/common/toggles";
import { updateSettings } from "@/actions";
import { Locale } from "@/i18n";
import { Separator } from "@/components/ui/separator";
import { validateActionResult } from "@/utils/actions";

const formSchema = z.object({
  language: z.string(),
  is_notifications_enabled: z.boolean(),
  is_emails_enabled: z.boolean(),
  is_interactive_mode_enabled: z.boolean(),
});

type Props = {
  user: CurrentUser;
};

export const SettingsForm = ({ user }: Props) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      language: "English",
      is_notifications_enabled: user.settings.is_notifications_enabled,
      is_emails_enabled: user.settings.is_emails_enabled,
      is_interactive_mode_enabled: user.settings.is_interactive_mode_enabled,
    },
    mode: "onSubmit",
  });

  const { formState, setError } = form;

  const closeModalLink = usePreservedParamsLink({ [QUERIES.MODAL_SETTINGS]: false });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const languageCode = (values.language === "English" ? "en" : "en") as Locale;
    const result = await updateSettings({
      ...values,
      language: languageCode,
    });
    const validationOptions = {
      successToastMessage: PLACEHOLDERS.TOAST_SETTINGS_UPDATE_SUCCESS,
      failToastMessage: PLACEHOLDERS.TOAST_SETTINGS_UPDATE_FAIL,
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
          name="language"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Globe className="text-muted-foreground h-4 w-4" />
                {PLACEHOLDERS.LABEL_LANGUAGE}
              </FormLabel>
              <FormControl>
                <LanguageSelect
                  languages={["English"]}
                  value={field.value}
                  onChange={field.onChange}
                  disabled={true}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Separator />
        <FormField
          control={form.control}
          name="is_notifications_enabled"
          render={({ field }) => (
            <FormItem>
              <SwitchToggle
                title={PLACEHOLDERS.LABEL_PUSH_NOTIFICATIONS}
                description={PLACEHOLDERS.DESCRIPTION_PUSH_NOTIFICATIONS}
                icon={<Bell className="h-4 w-4" />}
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="is_emails_enabled"
          render={({ field }) => (
            <FormItem>
              <SwitchToggle
                title={PLACEHOLDERS.LABEL_EMAIL_NEWS}
                description={PLACEHOLDERS.DESCRIPTION_EMAIL_NEWS}
                icon={<Mail className="h-4 w-4" />}
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="is_interactive_mode_enabled"
          render={({ field }) => (
            <FormItem>
              <SwitchToggle
                title={PLACEHOLDERS.LABEL_INTERACTIVE_MODE}
                description={PLACEHOLDERS.DESCRIPTION_INTERACTIVE_MODE}
                icon={<Pointer className="h-4 w-4" />}
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormItem>
          )}
        />
        <Field className="flex flex-col">
          <Button className="w-full" type="submit" disabled={formState.isSubmitting}>
            Apply {formState.isSubmitting && <Spinner />}
          </Button>
          <Button className="w-full" type="button" variant="outline" asChild>
            <Link href={closeModalLink}>{PLACEHOLDERS.BUTTON_CANCEL}</Link>
          </Button>
        </Field>
      </form>
    </Form>
  );
};
