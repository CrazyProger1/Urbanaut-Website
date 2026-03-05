import React, { ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Props = {
  languages: string[];
  onChange?: (language: string) => void;
  content?: Record<string, ReactNode>;
};

export const LanguageTabs = ({ languages, onChange, content }: Props) => {
  return (
    <Tabs defaultValue="en" onValueChange={onChange}>
      <TabsList>
        {languages.map((language) => (
          <TabsTrigger key={language} value={language}>
            {language}
          </TabsTrigger>
        ))}
      </TabsList>
      {languages.map((language) => (
        <TabsContent value={language}>{content?.[language]}</TabsContent>
      ))}
    </Tabs>
  );
};
