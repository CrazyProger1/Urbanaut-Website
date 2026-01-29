"use client";

import React from "react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Link, useRouter } from "@/i18n";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { QUERIES } from "@/config";
import { CurrentUser } from "@/types";
import { Field } from "@/components/ui/field";
import { usePreservedParamsLink } from "@/hooks";
import { Globe, Bell, Mail } from "lucide-react";
import { LanguageSelect } from "./LanguageSelect";
import { SwitchToggle } from "@/components/common/toggles";
import { setLanguage, switchEmailNews, switchPushNotifications } from "@/actions";
import { Locale } from "@/i18n";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  language: z.string(),
  pushNotifications: z.boolean(),
  emailNews: z.boolean(),
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
      pushNotifications: user.settings.is_notifications_enabled,
      emailNews: false,
    },
    mode: "onSubmit",
  });

  const { formState } = form;

  const closeModalLink = usePreservedParamsLink({ [QUERIES.SETTINGS_MODAL]: false });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const languageCode = (values.language === "English" ? "en" : "en") as Locale;
    await setLanguage(languageCode);
    await switchPushNotifications(values.pushNotifications);
    await switchEmailNews(values.emailNews);
    router.push(closeModalLink, { scroll: false });
    toast.success("Settings updated successfully!");
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
                Language
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
          name="pushNotifications"
          render={({ field }) => (
            <FormItem>
              <SwitchToggle
                title="Push notifications"
                description="Receive push notifications on your device"
                icon={<Bell className="h-4 w-4" />}
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="emailNews"
          render={({ field }) => (
            <FormItem>
              <SwitchToggle
                title="Email news"
                description="Get the latest news and updates via email"
                icon={<Mail className="h-4 w-4" />}
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
            <Link href={closeModalLink}>Close</Link>
          </Button>
        </Field>
      </form>
    </Form>
  );
};
