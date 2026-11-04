
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Project ID is required." },
        { status: 400 }
      );
    }

    const existingProject = await prisma.project.findUnique({
      where: { id },
    });

    if (!existingProject) {
      return NextResponse.json(
        { error: "Project not found." },
        { status: 404 }
      );
    }

    const body: unknown = await request.json();

    if (
      !body ||
      typeof body !== "object" ||
      Array.isArray(body)
    ) {
      return NextResponse.json(
        { error: "Invalid request body." },
        { status: 400 }
      );
    }

    const data = body as Record<string, unknown>;

    const allowedFields = [
      "title",
      "subtitle",
      "description",
      "technologies",
      "features",
      "image",
      "liveUrl",
      "githubUrl",
      "featured",
      "published",
      "sortOrder",
    ];

    if (
      Object.keys(data).some(
        (key) => !allowedFields.includes(key)
      )
    ) {
      return NextResponse.json(
        { error: "Unknown project field." },
        { status: 400 }
      );
    }

    const updates: Record<string, unknown> = {};

    for (const field of ["title", "description"] as const) {
      if (field in data) {
        const value = data[field];

        if (
          typeof value !== "string" ||
          !value.trim() ||
          value.length > (field === "title" ? 150 : 10000)
        ) {
          return NextResponse.json(
            { error: `Invalid ${field}.` },
            { status: 400 }
          );
        }

        updates[field] = value.trim();
      }
    }

    for (const field of [
      "subtitle",
      "image",
      "liveUrl",
      "githubUrl",
    ] as const) {
      if (field in data) {
        const value = data[field];
        const maxLength = field === "subtitle" ? 200 : 500;

        if (
          value !== null &&
          (typeof value !== "string" ||
            value.length > maxLength)
        ) {
          return NextResponse.json(
            { error: `Invalid ${field}.` },
            { status: 400 }
          );
        }

        const cleaned =
          typeof value === "string"
            ? value.trim() || null
            : null;

        if (
          cleaned &&
          field !== "subtitle"
        ) {
          try {
            const parsed = new URL(cleaned);

            if (
              parsed.protocol !== "https:" &&
              parsed.protocol !== "http:"
            ) {
              throw new Error("Invalid protocol");
            }
          } catch {
            return NextResponse.json(
              { error: `Invalid ${field} URL.` },
              { status: 400 }
            );
          }
        }

        updates[field] = cleaned;
      }
    }

    for (const field of [
      "technologies",
      "features",
    ] as const) {
      if (field in data) {
        const value = data[field];

        if (
          !Array.isArray(value) ||
          value.length > 30 ||
          !value.every(
            (item) =>
              typeof item === "string" &&
              item.trim().length > 0 &&
              item.length <=
                (field === "features" ? 500 : 100)
          )
        ) {
          return NextResponse.json(
            { error: `Invalid ${field}.` },
            { status: 400 }
          );
        }

        updates[field] = value.map(
          (item: string) => item.trim()
        );
      }
    }

    for (const field of [
      "featured",
      "published",
    ] as const) {
      if (field in data) {
        if (typeof data[field] !== "boolean") {
          return NextResponse.json(
            { error: `Invalid ${field}.` },
            { status: 400 }
          );
        }

        updates[field] = data[field];
      }
    }

    if ("sortOrder" in data) {
      if (
        typeof data.sortOrder !== "number" ||
        !Number.isInteger(data.sortOrder) ||
        data.sortOrder < 0 ||
        data.sortOrder > 100000
      ) {
        return NextResponse.json(
          { error: "Invalid sortOrder." },
          { status: 400 }
        );
      }

      updates.sortOrder = data.sortOrder;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: "No fields to update." },
        { status: 400 }
      );
    }

    const project = await prisma.project.update({
      where: { id },
      data: updates,
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error("Update project error:", error);

    return NextResponse.json(
      { error: "Failed to update project." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Project ID is required." },
        { status: 400 }
      );
    }

    const existingProject = await prisma.project.findUnique({
      where: { id },
    });

    if (!existingProject) {
      return NextResponse.json(
        { error: "Project not found." },
        { status: 404 }
      );
    }

    await prisma.project.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Project deleted successfully.",
    });
  } catch (error) {
    console.error("Delete project error:", error);

    return NextResponse.json(
      { error: "Failed to delete project." },
      { status: 500 }
    );
  }
}
