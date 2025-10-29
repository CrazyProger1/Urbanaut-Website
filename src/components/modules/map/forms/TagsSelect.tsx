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
import { APITag } from "@/types";

type Props = {
  tags?: APITag[];
};

export const TagsSelect = ({ tags }: Props) => {
  const [selected, setSelected] = useState<APITag[]>([]);

  const handleRemove = (value: APITag) => {
    if (!selected.includes(value)) {
      return;
    }
    console.log(`removed: ${value}`);
    setSelected((prev) => prev.filter((v) => v !== value));
  };

  const handleSelect = (value: APITag) => {
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
            <TagsValue key={tag.tag} onRemove={() => handleRemove(tag)}>
              #{tag.tag}
            </TagsValue>
          ))}
        </TagsTrigger>
        <TagsContent>
          <TagsInput placeholder="Search tag..." />
          <TagsList>
            <TagsEmpty />
            <TagsGroup>
              {tags?.map((tag) => (
                <TagsItem key={tag.id} onSelect={() => handleSelect(tag)} value={tag.tag}>
                  #{tag.tag}
                  {selected.includes(tag) && (
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
