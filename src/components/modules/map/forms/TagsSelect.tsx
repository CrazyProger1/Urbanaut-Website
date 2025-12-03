import React from "react";
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

type Props = {
  tags: string[];
  selected?: string[];
  onRemove?: (tag: string) => void;
  onSelect?: (tag: string) => void;
};

export const TagsSelect = ({ tags, selected, onSelect, onRemove }: Props) => {
  return (
    <Tags>
      <TagsTrigger>
        {selected?.map((tag) => (
          <TagsValue key={tag} onRemove={() => onRemove?.(tag)}>
            #{tag}
          </TagsValue>
        ))}
      </TagsTrigger>
      <TagsContent>
        <TagsInput placeholder="Search tag..." />
        <TagsList>
          <TagsEmpty />
          <TagsGroup>
            {tags.map((tag) => (
              <TagsItem key={tag} onSelect={() => onSelect?.(tag)} value={tag}>
                #{tag}
                {selected?.includes(tag) && <CheckIcon className="text-muted-foreground" size={14} />}
              </TagsItem>
            ))}
          </TagsGroup>
        </TagsList>
      </TagsContent>
    </Tags>
  );
};
