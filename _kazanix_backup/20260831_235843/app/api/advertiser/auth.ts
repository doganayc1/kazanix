import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function getAdvertiser() {
  const cookieStore = await cookies();

  const userId =
    cookieStore.get("userId")?.value ||
    cookieStore.get("user_id")?.value ||
    cookieStore.get("USER_ID")?.value;

  if (!userId) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { business: true },
  });

  if (!user) {
    return null;
  }

  if (user.role !== "BUSINESS" && user.role !== "ADMIN") {
    return null;
  }

  return user;
}

export function unauthorized() {
  return NextResponse.json(
    { error: "Reklam veren girişi gerekli." },
    { status: 401 }
  );
}