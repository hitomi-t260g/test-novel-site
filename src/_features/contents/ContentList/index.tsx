"use client";

import { useRouter } from "next/navigation";
import { useEditMode } from "@/_components/SideMenu/EditModeContext";
import { TitleListItem } from "@/_features/contents/TitleListItem";
import type { Content } from "@/types/content";

export interface ContentListProps {
  contents: Content[];
  selectedId: number | null;
}

export const ContentList = ({ contents, selectedId }: ContentListProps) => {
  const router = useRouter();
  const isEditMode = useEditMode();

  const handleClick = (id: number) => {
    router.push(`/contents/${id}`);
  };

  return (
    <>
      {contents.map((content) => (
        <TitleListItem
          key={content.id}
          content={content}
          isSelected={content.id === selectedId}
          onClick={handleClick}
          isEditMode={isEditMode}
        />
      ))}
    </>
  );
};
