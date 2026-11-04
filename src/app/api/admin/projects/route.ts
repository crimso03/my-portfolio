
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();

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

    const {
      title,
      subtitle,
      description,
      technologies,
      features,
      image,
      liveUrl,
      githubUrl,
      featured,
      published,
      sortOrder,
    } = body;

    if (
      typeof title !== "string" ||
      !title.trim() ||
      title.length > 150 ||
      typeof description !== "string" ||
      !description.trim() ||
      description.length > 10000
    ) {
      return NextResponse.json(
        { error: "A valid title and description are required." },
        { status: 400 }
      );
    }

    if (
      !Array.isArray(technologies) ||
      !technologies.every(
        (item) => typeof item === "string"
      ) ||
      !Array.isArray(features) ||
      !features.every(
        (item) => typeof item === "string"
      )
    ) {
      return NextResponse.json(
        { error: "Technologies and features must be text arrays." },
        { status: 400 }
      );
    }

    const optionalText = (
      value: unknown,
      maxLength = 500
    ): string | null | undefined => {
      if (value === undefined || value === null || value === "") {
        return null;
      }

      if (
        typeof value !== "string" ||
        value.length > maxLength
      ) {
        return undefined;
      }

      return value.trim() || null;
    };

    const cleanSubtitle = optionalText(subtitle, 200);
    const cleanImage = optionalText(image);
    const cleanLiveUrl = optionalText(liveUrl);
    const cleanGithubUrl = optionalText(githubUrl);

    if (
      cleanSubtitle === undefined ||
      cleanImage === undefined ||
      cleanLiveUrl === undefined ||
      cleanGithubUrl === undefined
    ) {
      return NextResponse.json(
        { error: "Invalid optional field." },
        { status: 400 }
      );
    }

    for (const url of [
      cleanImage,
      cleanLiveUrl,
      cleanGithubUrl,
    ]) {
      if (url) {
        try {
          const parsed = new URL(url);

          if (
            parsed.protocol !== "https:" &&
            parsed.protocol !== "http:"
          ) {
            throw new Error("Invalid protocol");
          }
        } catch {
          return NextResponse.json(
            { error: "Project URLs must be valid HTTP or HTTPS URLs." },
            { status: 400 }
          );
        }
      }
    }

    if (
      (featured !== undefined &&
        typeof featured !== "boolean") ||
      (published !== undefined &&
        typeof published !== "boolean") ||
      (sortOrder !== undefined &&
        (!Number.isInteger(sortOrder) ||
          sortOrder < 0 ||
          sortOrder > 100000))
    ) {
      return NextResponse.json(
        { error: "Invalid project settings." },
        { status: 400 }
      );
    }

    const cleanTechnologies = technologies.map(
      (item: string) => item.trim()
    );
    const cleanFeatures = features.map(
      (item: string) => item.trim()
    );

    if (
      cleanTechnologies.length > 30 ||
      cleanFeatures.length > 30 ||
      cleanTechnologies.some(
        (item: string) => !item || item.length > 100
      ) ||
      cleanFeatures.some(
        (item: string) => !item || item.length > 500
      )
    ) {
      return NextResponse.json(
        { error: "Invalid technologies or features." },
        { status: 400 }
      );
    }

    const project = await prisma.project.create({
      data: {
        title: title.trim(),
        subtitle: cleanSubtitle,
        description: description.trim(),
        technologies: cleanTechnologies,
        features: cleanFeatures,
        image: cleanImage,
        liveUrl: cleanLiveUrl,
        githubUrl: cleanGithubUrl,
        featured: featured ?? false,
        published: published ?? false,
        sortOrder: sortOrder ?? 0,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Create project error:", error);

    return NextResponse.json(
      { error: "Failed to create project." },
      { status: 500 }
    );
  }
}
