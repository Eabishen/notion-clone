"use client";

import { useUser } from "@clerk/clerk-react";
import Image from "next/image";
import { PlusCircle } from "lucide-react";
import { useMutation } from "convex/react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";

const DocumentsPage = () => {
  const { user } = useUser();
  const create = useMutation(api.documents.create);

  const onCreate = () => {
    const promise = create({ title: "Firsttitle" });

    toast.promise(promise, {
      loading: "Creating new not...",
      success: "New note create",
      error: "Failed to create new note",
    });
  };

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image
        src="/empty.png"
        alt="Emptyimg"
        width="300"
        height="300"
        className="dark:hidden"
      />
      <Image
        src="/empty-dark.png"
        alt="Emptyimg"
        width="300"
        height="300"
        className="hidden dark:block"
      />
      <h2 className="text-lg font-medium">
        welcome to {user?.firstName}&apos;s Enote
      </h2>
      <Button onClick={onCreate}>
        <PlusCircle className="h-4 w-4 mr-2" />
        Create a note
      </Button>
    </div>
  );
};

export default DocumentsPage;
