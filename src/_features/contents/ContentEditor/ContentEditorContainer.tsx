"use client";

import { useState } from "react";
import type { Content } from "@/types/content";
import { BodyEditor } from "./BodyEditor";
import { TitleEditor } from "./TitleEditor";

export interface ContentEditorContainerProps {
  content: Content;
}

type EditingField = "none" | "title" | "body";

export const ContentEditorContainer = ({
  content,
}: ContentEditorContainerProps) => {
  const [editingField, setEditingField] = useState<EditingField>("none");

  return (
    <div className="p-[30px] bg-bg-light rounded-2xl min-h-full flex flex-col gap-5">
      {/* タイトル */}
      <TitleEditor
        contentId={content.id}
        initialTitle={content.title}
        disabled={editingField === "body"}
        onEditStart={() => setEditingField("title")}
        onEditEnd={() => setEditingField("none")}
      />

      {/* 本文 */}
      <BodyEditor
        contentId={content.id}
        initialBody={content.body}
        disabled={editingField === "title"}
        onEditStart={() => setEditingField("body")}
        onEditEnd={() => setEditingField("none")}
      />
    </div>
  );
};
