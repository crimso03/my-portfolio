
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(projects, {
      status: 200,
    });
  } catch (error) {
    console.error("Failed to fetch projects:", error);

    return NextResponse.json(
      { message: "Failed to load projects." },
      { status: 500 }
    );
  }
}
