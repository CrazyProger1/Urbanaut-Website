"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LanguageSelect } from "./LanguageSelect";
import { Globe } from "lucide-react";
import { Locale } from "@/i18n";
import { setLanguage } from "@/actions";
import { CurrentUser } from "@/types";

const LANGUAGES = [
  {
    code: "en",
    name: "English",
  },
];

type Props = {
  user: CurrentUser;
};

export const UISettingsSection = ({ user }: Props) => {
  const [language, setCurrentLanguage] = useState<string>("English");

  const handleLanguageChange = async (language: string) => {
    setCurrentLanguage(language);
    const code = (LANGUAGES.find((l) => l.name === language)?.code || "en") as Locale;
    await setLanguage(code);
  };

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          User Interface
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="border-border rounded-lg border p-3">
            <label className="mb-3 flex items-center gap-2 text-sm font-medium">
              <Globe className="text-muted-foreground h-4 w-4" />
              Language
            </label>
            <LanguageSelect
              languages={["English"]}
              value={language}
              onChange={handleLanguageChange}
              disabled={true}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
