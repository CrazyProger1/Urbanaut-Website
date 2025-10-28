import React from "react";
import { QueryToast } from "@/components/common/toasts";

const Page = async () => {
  return (
    <div>
      <QueryToast query="oauth-success" content="Succeseful OAuth authentification!" />
    </div>
  );
};

export default Page;
