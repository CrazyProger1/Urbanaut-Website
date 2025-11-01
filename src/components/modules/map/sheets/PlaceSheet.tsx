"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useRouter } from "@/i18n";
import { APIPlace } from "@/types";
import Image from "next/image";
import { STUBS, ALTS } from "@/config";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  CircleQuestionMark,
  Flame,
  Hourglass,
  MapPin,
  MapPinHouse,
  Tag,
} from "lucide-react";

type Props = {
  place: APIPlace;
};

export function PlaceSheet({ place }: Props) {
  const router = useRouter();

  const handleToggle = (open: boolean) => {
    if (!open) {
      router.push("/map");
    }
  };
  return (
    <Sheet open={true} onOpenChange={handleToggle}>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{place.name}</SheetTitle>
          <SheetDescription>Kharkiv, Ukraine</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4 p-4">
          <div className="relative h-60 w-full">
            <Image
              className="rounded-2xl"
              src={STUBS.PLACE_PHOTO}
              alt={ALTS.PLACE_PHOTO}
              fill={true}
            />
            <div>
              <button
                type="button"
                className="absolute top-1/2 left-0.5 -translate-y-1/2 cursor-pointer hover:text-white"
              >
                <ChevronLeft size={64} />
              </button>

              <button
                type="button"
                className="absolute top-1/2 right-0.5 -translate-y-1/2 cursor-pointer hover:text-white"
              >
                <ChevronRight size={64} />
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-1">
              <CircleQuestionMark />
              <div className="font-semibold">Description</div>
            </div>
            <div className="text-sm text-wrap">{place.description}</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-1">
              <Tag />
              <div className="font-semibold">Tags</div>
            </div>
            <div className="flex flex-wrap gap-1">
              {place.tags?.map((tag) => (
                <Badge variant="outline" className="text-muted-foreground text-sm">
                  <Tag /> {tag}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-1">
              <Hourglass />
              <div className="font-semibold">Timeline</div>
            </div>
            <div className="flex flex-col gap-1 text-sm">
              <div>
                Built: <Badge variant="outline">20 May 2025</Badge>
              </div>
              <div>
                Abandoned: <Badge variant="outline">1 July 2025</Badge>
              </div>
              <div>
                Added: <Badge variant="outline">30 Mart 2027</Badge>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-1">
              <Flame />
              <div className="font-semibold">State</div>
            </div>
            <div className="flex flex-col gap-1 text-sm">
              <div>
                Security: <Badge className="bg-achievement-valor">Private Security Agency</Badge>
              </div>
              <div>
                Difficulty: <Badge className="bg-achievement-mastery">Complex</Badge>
              </div>
              <div>
                Preservation: <Badge className="bg-achievement-transcendence">Awesome</Badge>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-1">
              <MapPin />
              <div className="font-semibold">Location</div>
            </div>

            <div className="flex flex-col gap-1 text-sm">
              <div className="flex flex-row gap-1 text-sm">
                <div>
                  Coordinates: <Badge variant="outline">49.23123, 35.232132</Badge>
                </div>
              </div>
              <div className="flex flex-row gap-1">
                <div>
                  Address: <Badge variant="outline">3 ln. Test, Kharkiv, Ukraine</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*<SheetFooter>*/}
        {/*  <Button type="submit">Save changes</Button>*/}
        {/*  <SheetClose asChild>*/}
        {/*    <Button variant="outline">Close</Button>*/}
        {/*  </SheetClose>*/}
        {/*</SheetFooter>*/}
      </SheetContent>
    </Sheet>
  );
}
