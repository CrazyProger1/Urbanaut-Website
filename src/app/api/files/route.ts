import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/utils/session";
import { API_ENDPOINTS } from "@/config";
import { fetchAuthenticated } from "@/services";

export const POST = async (request: NextRequest) => {
  const session = await getSession();

  if (!session?.accessToken) {
    return NextResponse.json({ detail: "Authentication required" }, { status: 401 });
  }

  try {
    const formData = await request.formData();

    const response = await fetchAuthenticated(API_ENDPOINTS.FILES, {
      method: "POST",
      body: formData,
    });

    return NextResponse.json(response);
  } catch {
    return NextResponse.json({ detail: "Upload failed" }, { status: 500 });
  }
};
