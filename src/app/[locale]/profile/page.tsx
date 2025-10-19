import { getSession } from "@/utils/session";
import React from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";

const Page = async () => {
  const session = await getSession();
  return (
    <div className="flex flex-col items-center">
      <Card className="m-4 p-4">
        <Image src="/web-app-manifest-192x192.png" width={192} height={192} alt="Profile" />
        <div className="text-center">
          {session?.user?.email || "stub@gmail.com"}
        </div>
      </Card>
    </div>

  );
};

export default Page;