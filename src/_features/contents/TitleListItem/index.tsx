"use client";

import { useRouter } from "next/navigation";
import type { ComponentProps } from "react";
import { IconButton } from "@/_components/Button/IconButton";
import { Typography } from "@/_components/Typography";
import { deleteContent } from "@/_features/contents/endpoint/delete-content";
import type { Content } from "@/types/content";

export interface TitleListItemProps
  extends Omit<ComponentProps<"button">, "children" | "onClick" | "content"> {
  content: Content;
  isSelected: boolean;
  onClick: (contentId: number) => void;
  isEditMode?: boolean;
}

export const TitleListItem = ({
  content,
  isSelected,
  onClick,
  isEditMode = false,
  className = "",
  ...props
}: TitleListItemProps) => {
  const router = useRouter();

  const baseClasses =
    "flex items-center h-11 px-2 text-left cursor-pointer rounded transition-colors";
  const hoverClasses = "hover:bg-bg-light hover:text-title-hover";
  const selectedClasses = isSelected ? "bg-bg-light text-title-hover" : "";
  const classes = `${baseClasses} ${hoverClasses} ${selectedClasses} ${className}`;

  const displayTitle = content.title ?? "(新規タイトル)";

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation(); // 親のonClickを防ぐ

    const confirmed = window.confirm(`「${displayTitle}」を削除しますか？`);

    if (!confirmed) return;

    try {
      await deleteContent(content.id);

      // 削除したコンテンツが現在表示中の場合、ホームページにリダイレクト
      if (isSelected) {
        router.push("/");
      } else {
        router.refresh(); // リストを更新
      }
    } catch (error) {
      console.error("Failed to delete content:", error);
      alert("削除に失敗しました");
    }
  };

  return (
    <div
      className={`flex items-center gap-2 w-full justify-between ${classes}`}
    >
      <button type="button" onClick={() => onClick(content.id)} {...props}>
        <Typography value="body" className="truncate flex-1 text-left">
          {displayTitle}
        </Typography>
      </button>
      {isEditMode && <IconButton iconType="delete" onClick={handleDelete} />}
    </div>
  );
};
