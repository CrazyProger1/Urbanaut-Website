// import { ErrorAPIResponse, SuccessfulAPIResponse } from "@/types";
// import { API_ENDPOINTS, PROXY_URL } from "@/config";
// import { NextRequest, NextResponse } from "next/next";
// import { getSession, setSession } from "@/utils/session";
// import { fetchAPI } from "@/services/api/api";
// import { requireRefresh } from "@/utils/api";

// export const fetchProxy = async <T>(
//   endpoint: string,
//   options?: RequestInit,
// ): Promise<(SuccessfulAPIResponse | ErrorAPIResponse) & T> => {
//   const response = await fetch(`${PROXY_URL}${endpoint}`, {
//     ...options,
//   });
//   return await response.json();
// };
//
// export const handleProxyRequest = async (
//   request: NextRequest,
//   { params }: { params: Promise<{ endpoint: string[] }> },
// ) => {
//   const { endpoint } = await params;
//
//   const url = `${endpoint.join("/")}/`;
//
//   const session = await getSession();
//
//   let response = await fetchAPI(url, {
//     accessToken: session?.accessToken,
//     method: request.method,
//   });
//
//   if (requireRefresh(response) && session?.refreshToken) {
//     console.log("Refreshing...");
//     const refreshResponse = await fetchAPI<{ access: string }>(API_ENDPOINTS.REFRESH, {
//       body: JSON.stringify({ refresh: session.refreshToken }),
//       method: "POST",
//     });
//
//     if (!refreshResponse.success) {
//       return response;
//     }
//     const updatedSession = await setSession({ accessToken: refreshResponse.access });
//     response = await fetchAPI(url, {
//       accessToken: updatedSession?.accessToken,
//     });
//   }
//
//   return NextResponse.json(response);
// };
