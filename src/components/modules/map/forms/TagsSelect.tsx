import React, { useState } from "react";
import { Label } from "@/components/ui/label";
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
} from "@/components/ui/shadcn-io/tags";
import { CheckIcon } from "lucide-react";

type Props = {};

const tags = [
  { id: "react", label: "React" },
  { id: "typescript", label: "TypeScript" },
  { id: "javascript", label: "JavaScript" },
  { id: "nextjs", label: "Next.js" },
  { id: "vuejs", label: "Vue.js" },
  { id: "angular", label: "Angular" },
  { id: "svelte", label: "Svelte" },
  { id: "nodejs", label: "Node.js" },
  { id: "python", label: "Python" },
  { id: "ruby", label: "Ruby" },
  { id: "java", label: "Java" },
  { id: "csharp", label: "C#" },
  { id: "php", label: "PHP" },
  { id: "go", label: "Go" },
];

export const TagsSelect = ({}: Props) => {
  const [selected, setSelected] = useState<string[]>([]);
  const handleRemove = (value: string) => {
    if (!selected.includes(value)) {
      return;
    }
    console.log(`removed: ${value}`);
    setSelected((prev) => prev.filter((v) => v !== value));
  };
  const handleSelect = (value: string) => {
    if (selected.includes(value)) {
      handleRemove(value);
      return;
    }
    console.log(`selected: ${value}`);
    setSelected((prev) => [...prev, value]);
  };
  return (
    <div className="flex w-full flex-col gap-2">
      <Label>Tags</Label>
      <Tags>
        <TagsTrigger>
          {selected.map((tag) => (
            <TagsValue key={tag} onRemove={() => handleRemove(tag)}>
              {tags.find((t) => t.id === tag)?.label}
            </TagsValue>
          ))}
        </TagsTrigger>
        <TagsContent>
          <TagsInput placeholder="Search tag..." />
          <TagsList>
            <TagsEmpty />
            <TagsGroup>
              {tags.map((tag) => (
                <TagsItem key={tag.id} onSelect={handleSelect} value={tag.id}>
                  {tag.label}
                  {selected.includes(tag.id) && (
                    <CheckIcon className="text-muted-foreground" size={14} />
                  )}
                </TagsItem>
              ))}
            </TagsGroup>
          </TagsList>
        </TagsContent>
      </Tags>
    </div>
  );
};
