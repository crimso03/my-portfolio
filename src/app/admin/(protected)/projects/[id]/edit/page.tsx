
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import EditProjectForm from "@/components/admin/EditProjectForm";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditProjectPage({
  params,
}: PageProps) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/admin/login");
  }

  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: { id },
  });

  if (!project) {
    notFound();
  }

  return <EditProjectForm project={project} />;
}
