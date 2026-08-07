import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({
    message: "Çıkış yapıldı",
  });

  response.cookies.delete("userId");

  return response;
}