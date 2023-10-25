"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation } from "convex/react";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";
import { Spinner } from "@/components/spinner";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const TrashBox = () => {
  const router = useRouter();
  const params = useParams();
  const documents = useQuery(api.documents.getTrash);
  const restore = useMutation(api.documents.restore);
  const remove = useMutation(api.documents.remove);

  const [search, setSearch] = useState("");

  const filteredDocuments = documents?.filter((document) => {
    return document.title.toLowerCase().includes(search.toLowerCase());
  });

  const onClick = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  const onRestore = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    documentId: Id<"documents">
  ) => {
    event.stopPropagation();
    const promise = restore({ id: documentId });

    toast.promise(promise, {
      loading: "Restoring Note. Please Wait...",
      success: "Successfully note restored!",
      error: "Failed to restore note",
    });
  };

  const onRemove = (documentId: Id<"documents">) => {
    const promise = remove({ id: documentId });

    toast.promise(promise, {
      loading: "Deleting Note. Please Wait...",
      success: "Successfully note deleted!",
      error: "Failed to delete note",
    });
    if (params.documentId === documentId) {
      router.push("/documents");
    }
  };

  if(documents === undefined){
    return (
      <div className="flex items-center justify-center p-4 h-full">
        <Spinner size="lg" />
      </div>
    )
  }

  return <div className="text-sm">
    <div className="flex items-center gap-x-1 p-2">
      <Search className="h-4 w-4" />
      <Input />
    </div>
  </div>;
};

export default TrashBox;
