import React from "react";
import type { Preview } from "@storybook/nextjs-vite";
import { NextIntlClientProvider } from "next-intl";
import { ModalProvider } from "../src/components/common/modals";
import { ToastProvider } from "../src/components/common/toasts";
import messages from "../messages/en.json";
import "../src/styles/globals.css";

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Color scheme",
      toolbar: {
        title: "Theme",
        icon: "mirror",
        items: ["dark", "light"],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "dark",
  },
  decorators: [
    (Story, context) => {
      const isDarkTheme = context.globals.theme !== "light";
      document.documentElement.classList.toggle("dark", isDarkTheme);
      document.documentElement.classList.toggle("light", !isDarkTheme);
      return (
        <NextIntlClientProvider locale="en" messages={messages}>
          <ModalProvider>
            <ToastProvider theme={isDarkTheme ? "DARK" : "LIGHT"}>
              <div className="bg-background text-foreground">
                <Story />
              </div>
            </ToastProvider>
          </ModalProvider>
        </NextIntlClientProvider>
      );
    },
  ],
  parameters: {
    layout: "centered",
    backgrounds: { disable: true },
    nextjs: {
      appDirectory: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
  },
};

export default preview;
