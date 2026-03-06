import * as React from "react";
import { ControllerProps, FieldPath, FieldPathValue, FieldValues, useFormState } from "react-hook-form";
import { FormField } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useMemo, useState } from "react";

type StringFieldPath<TFieldValues extends FieldValues> = {
  [K in FieldPath<TFieldValues>]: FieldPathValue<TFieldValues, K> extends string | undefined ? K : never;
}[FieldPath<TFieldValues>];

type LocalizedPath<TFieldValues extends FieldValues, TLang extends string = string> = Extract<
  StringFieldPath<TFieldValues>,
  `${string}_${TLang}`
>;

// Distributive: T must be a naked type param for conditional to distribute over unions
type ExtractBase<T> = T extends `${infer Base}_${string}` ? Base : never;

type Props<TFieldValues extends FieldValues = FieldValues, TLang extends string = string> = Omit<
  ControllerProps<TFieldValues, LocalizedPath<TFieldValues, TLang>>,
  "name"
> & {
  languages: TLang[];
  basename: ExtractBase<LocalizedPath<TFieldValues, TLang>>;
};

export const LocalizedFormField = <
  TFieldValues extends FieldValues = FieldValues,
  TLang extends string = string,
>({
  languages,
  basename,
  ...props
}: Props<TFieldValues, TLang>) => {
  const { errors } = useFormState({ control: props.control });

  const tabs = useMemo(() => {
    return languages.map((language) => {
      return `${basename}_${language}`;
    });
  }, [basename, languages]);

  useEffect(() => {
    if (errors) {
      Object.keys(errors).map((field) => {
        if (tabs.includes(field)) {
          setActiveTab(field);
        }
      });
    }
  }, [errors]);

  const [activeTab, setActiveTab] = useState<string>(`${basename}_en`);

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger key={tab} value={tab}>
            {tab.split("_")[1]}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((name) => (
        <TabsContent key={name} value={name}>
          <FormField {...props} name={name as LocalizedPath<TFieldValues, TLang>} />
        </TabsContent>
      ))}
    </Tabs>
  );
};
