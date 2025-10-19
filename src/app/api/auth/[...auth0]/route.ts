import { auth0 } from "@/app/lib/auth0";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  return await auth0.middleware(request);
}

