"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter, Layers, Search, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";

export const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAIActive, setIsAIActive] = useState(false);

  return (
    <div className="absolute top-4 left-4 flex flex-col md:flex-row gap-4">
      <Card className="bg-background/80 items-center rounded-2xl px-2 py-1 shadow-lg backdrop-blur-sm max-w-fit">
        <Toggle
          pressed={isOpen}
          onPressedChange={() => {
            setIsOpen((prev) => !prev);
          }}
        >
          <Search />
        </Toggle>
      </Card>
      {isOpen && (
        <Card
          className={cn(
            "bg-background/80 flex flex-row items-center gap-1 rounded-2xl backdrop-blur-sm",
            "px-2 py-1 shadow-lg",
          )}
        >
          <form className="flex flex-row gap-1">
            <Input name={isAIActive ? "ai_query" : "query"} type="text" />
            <Button type="submit" variant="ghost">
              <Search />
            </Button>
          </form>
          <Toggle>
            <Filter />
          </Toggle>
          <Toggle onPressedChange={setIsAIActive}>
            <Sparkles />
          </Toggle>
        </Card>
      )}
    </div>
  );
};
