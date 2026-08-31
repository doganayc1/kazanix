import { NextResponse } from "next/server";
import {
  ADVERTISER_COOKIE_NAME,
} from "@/lib/advertiser-auth";

export async function POST() {
  const response =
    NextResponse.json({
      success: true,
    });

  response.cookies.set({
    name: ADVERTISER_COOKIE_NAME,
    value: "",
    path: "/",
    maxAge: 0,
  });

  return response;
}