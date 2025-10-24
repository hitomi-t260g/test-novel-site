"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/_components/Button";
import { updateContent } from "@/_features/contents/endpoint/update-content";

export interface BodyEditorProps {
  contentId: number;
  initialBody: string | null;
  disabled?: boolean;
  onEditStart: () => void;
  onEditEnd: () => void;
}

export const BodyEditor = ({
  contentId,
  initialBody,
  disabled = false,
  onEditStart,
  onEditEnd,
}: BodyEditorProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [body, setBody] = useState(initialBody ?? "");
  const router = useRouter();

  const displayBody = initialBody ?? "(本文なし)";

  const handleEdit = () => {
    setIsEditing(true);
    onEditStart();
  };

  const handleSave = async () => {
    try {
      await updateContent(contentId, { body });
      setIsEditing(false);
      onEditEnd();
      router.refresh();
    } catch (error) {
      console.error("Failed to update body:", error);
      alert("本文の更新に失敗しました");
    }
  };

  const handleCancel = () => {
    setBody(initialBody ?? "");
    setIsEditing(false);
    onEditEnd();
  };

  if (isEditing) {
    return (
      <div className="flex justify-between items-start h-full">
        <div className="pr-5 w-full">
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full text-body whitespace-pre-wrap bg-white rounded-lg pt-[30px] px-[30px] h-[70vh] overflow-y-auto border border-border"
            maxLength={2000}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="w-[90px]">
            <Button
              iconType="cancel"
              label="Cancel"
              variant="primary"
              onClick={handleCancel}
            />
          </div>
          <div className="w-[90px]">
            <Button
              iconType="save"
              label="Save"
              variant="primary"
              onClick={handleSave}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-start h-full">
      <div className="pr-5 w-full">
        <div className="text-body whitespace-pre-wrap bg-white rounded-lg pt-[30px] px-[30px] h-[70vh] overflow-y-auto">
          {displayBody}
        </div>
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
