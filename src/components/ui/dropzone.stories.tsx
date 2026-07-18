import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Dropzone, DropzoneContent, DropzoneEmptyState } from "./dropzone";

const ImageDropzone = () => {
  const [files, setFiles] = useState<File[]>();
  return (
    <Dropzone
      src={files}
      onDrop={(acceptedFiles) => setFiles(acceptedFiles)}
      accept={{ "image/*": [".png", ".jpg", ".jpeg", ".webp"] }}
      maxSize={5 * 1024 * 1024}
      className="w-96"
    >
      <DropzoneContent />
      <DropzoneEmptyState />
    </Dropzone>
  );
};

const meta = {
  title: "Shadcn/Dropzone",
  component: Dropzone,
  tags: ["autodocs", "ai-generated"],
} satisfies Meta<typeof Dropzone>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <ImageDropzone />,
};

export const Disabled: Story = {
  render: () => (
    <Dropzone disabled className="w-96">
      <DropzoneContent />
      <DropzoneEmptyState />
    </Dropzone>
  ),
};
