
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
    // Verify admin authentication
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
        { error: "Message ID is required." },
        { status: 400 }
      );
    }

    // Validate request body
    const body: unknown = await request.json();

    if (
      typeof body !== "object" ||
      body === null ||
      Array.isArray(body) ||
      !("isRead" in body) ||
      typeof body.isRead !== "boolean"
    ) {
      return NextResponse.json(
        { error: "isRead must be a boolean." },
        { status: 400 }
      );
    }

    // Check whether the message exists
    const existingMessage =
      await prisma.contactMessage.findUnique({
        where: { id },
      });

    if (!existingMessage) {
      return NextResponse.json(
        { error: "Message not found." },
        { status: 404 }
      );
    }

    // Update read/unread status
    const updatedMessage =
      await prisma.contactMessage.update({
        where: { id },
        data: { isRead: body.isRead },
      });

    return NextResponse.json({
      success: true,
      message: updatedMessage,
    });
  } catch (error) {
    console.error("Update message error:", error);

    return NextResponse.json(
      { error: "Failed to update message." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: RouteContext
) {
  try {
    // Verify admin authentication
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get message ID
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Message ID is required." },
        { status: 400 }
      );
    }

    // Check if the message exists
    const existingMessage =
      await prisma.contactMessage.findUnique({
        where: { id },
      });

    if (!existingMessage) {
      return NextResponse.json(
        { error: "Message not found." },
        { status: 404 }
      );
    }

    // Delete message from PostgreSQL
    await prisma.contactMessage.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Message deleted successfully.",
    });
  } catch (error) {
    console.error("Delete message error:", error);

    return NextResponse.json(
      { error: "Failed to delete message." },
      { status: 500 }
    );
  }
}
