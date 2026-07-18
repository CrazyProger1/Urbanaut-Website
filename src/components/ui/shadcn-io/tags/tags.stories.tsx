import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CheckIcon } from "lucide-react";
import {
  Tags,
  TagsContent,
  TagsEmpty,
  TagsGroup,
  TagsInput,
  TagsItem,
  TagsList,
  TagsTrigger,
  TagsValue,
} from "./index";

const availableTags = ["factory", "hospital", "bunker", "village", "church"];

const TagsPicker = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>(["factory"]);

  const toggleTag = (tag: string) => {
    setSelectedTags((currentTags) =>
      currentTags.includes(tag)
        ? currentTags.filter((currentTag) => currentTag !== tag)
        : [...currentTags, tag],
    );
  };

  return (
    <div className="w-80">
      <Tags>
        <TagsTrigger>
          {selectedTags.map((tag) => (
            <TagsValue key={tag} onRemove={() => toggleTag(tag)}>
              {tag}
            </TagsValue>
          ))}
        </TagsTrigger>
        <TagsContent>
          <TagsInput placeholder="Search tag..." />
          <TagsList>
            <TagsEmpty />
            <TagsGroup>
              {availableTags.map((tag) => (
                <TagsItem key={tag} value={tag} onSelect={() => toggleTag(tag)}>
                  {tag}
                  {selectedTags.includes(tag) && <CheckIcon className="size-4" />}
                </TagsItem>
              ))}
            </TagsGroup>
          </TagsList>
        </TagsContent>
      </Tags>
    </div>
  );
};

const meta = {
  title: "Shadcn/Tags",
  component: Tags,
  tags: ["autodocs", "ai-generated"],
} satisfies Meta<typeof Tags>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <TagsPicker />,
};
