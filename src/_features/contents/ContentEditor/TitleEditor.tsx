"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/_components/Button";
import { updateContent } from "@/_features/contents/endpoint/update-content";

export interface TitleEditorProps {
  contentId: number;
  initialTitle: string | null;
  disabled?: boolean;
  onEditStart: () => void;
  onEditEnd: () => void;
}

export const TitleEditor = ({
  contentId,
  initialTitle,
  disabled = false,
  onEditStart,
  onEditEnd,
}: TitleEditorProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialTitle ?? "");
  const router = useRouter();

  const displayTitle = initialTitle ?? "(新規タイトル)";

  const handleEdit = () => {
    setIsEditing(true);
    onEditStart();
  };

  const handleSave = async () => {
    try {
      await updateContent(contentId, { title });
      setIsEditing(false);
      onEditEnd();
      router.refresh();
    } catch (error) {
      console.error("Failed to update title:", error);
      alert("タイトルの更新に失敗しました");
    }
  };

  const handleCancel = () => {
    setTitle(initialTitle ?? "");
    setIsEditing(false);
    onEditEnd();
  };

  if (isEditing) {
    return (
      <div className="flex justify-between items-center">
        <div className="flex-1 pr-[30px]">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-heading font-bold pl-[30px] border border-border rounded px-2 py-1 bg-white"
            maxLength={100}
          />
        </div>
        <div className="flex gap-[10px] w-[90px]">
          <div className="w-[90px]">
            <Button
              iconType="cancel"
              label="Cancel"
              variant="primary"
              onClick={handleCancel}
              width="40px"
            />
          </div>
          <div className="w-[90px]">
            <Button
              iconType="save"
              label="Save"
              variant="primary"
              onClick={handleSave}
              width="40px"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center">
      <div className="pr-[30px]">
        <h1 className="text-heading font-bold pl-[30px]">{displayTitle}</h1>
      </div>
      <div className="w-[90px]">
        <Button
          iconType="edit"
          label="Edit"
          variant="primary"
          onClick={handleEdit}
          disabled={disabled}
        />
      </div>
    </div>
  );
};
