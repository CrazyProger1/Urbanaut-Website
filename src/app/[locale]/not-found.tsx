"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import Image from "next/image";

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4">
      <div className="space-y-12 text-center">
        {/* Logo */}
        <Image
          src="/favicon.svg"
          alt="Urbanaut Logo"
          width={128}
          height={128}
          className="mx-auto h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48"
        />

        {/* 404 with icon */}
        <div className="relative inline-block">
          <div className="bg-linear-to-r from-amber-500 to-orange-600 bg-clip-text text-8xl font-bold text-transparent">
            404
          </div>
          <AlertCircle className="absolute -top-2 -right-6 h-8 w-8 animate-bounce text-amber-500 sm:h-10 sm:w-10" />
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h1 className="text-foreground text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Page Not Found
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg sm:text-xl">
            This page doesn't exist. Let's get you back on track.
          </p>
        </div>

        {/* Button */}
        <Button onClick={() => router.back()} size="lg">
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
