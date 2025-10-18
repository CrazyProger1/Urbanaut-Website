import React from "react";
import { QueryToast } from "@/components/common/toasts";

const Page = async () => {
  return <div>
    <QueryToast
      query="oauth-success"
      content="Succeseful OAuth authentification!"
      options={{
        autoClose: 2000,
        type: "success",
        theme: "dark",
        position: "bottom-right",
      }} />
  </div>;
};

export default Page;
