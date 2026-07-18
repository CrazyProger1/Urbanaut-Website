import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ExistingFilePreview } from "./ExistingFilePreview";

const meta = {
  title: "Modules/Map/Forms/ExistingFilePreview",
  component: ExistingFilePreview,
  tags: ["autodocs", "ai-generated"],
  args: {
    file: {
      id: "file-1",
      src: "/images/stubs/place-photo.webp",
      created_at: "2026-07-18T10:00:00Z",
      type: "PHOTO",
      is_hidden: false,
    },
  },
} satisfies Meta<typeof ExistingFilePreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
