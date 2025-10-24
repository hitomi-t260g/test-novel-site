"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useState } from "react";
import { Button } from "@/_components/Button";
import { Heading } from "@/_components/Heading";
import { Icon } from "@/_components/Icon";
import { EditModeContext } from "@/_components/SideMenu/EditModeContext";
import { createContent } from "@/_features/contents/endpoint/create-content";

export interface SideMenuProps {
  children: ReactNode;
}

export const SideMenu = ({ children }: SideMenuProps) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const router = useRouter();

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleNewPageClick = async () => {
    try {
      const newContent = await createContent({});
      router.push(`/contents/${newContent.id}`);
    } catch (error) {
      console.error("Failed to create new content:", error);
    }
  };

  const handleDoneClick = () => {
    setIsEditMode(false);
  };

  return (
    <EditModeContext.Provider value={{ isEditMode }}>
      <aside className="w-[279px] h-screen flex flex-col pt-[30px] pl-10 pr-0 pb-0 border-r border-border">
        {/* Header */}
        <div className="flex items-center gap-1 mb-5">
          <Icon type="logo" size="large" className="text-brand" />
          <Heading
            value="h2"
            className="text-heading leading-none tracking-normal"
          >
            ServiceName
          </Heading>
        </div>

        {/* TitleList */}
        <div className="flex-1 overflow-y-auto flex flex-col ">{children}</div>

        {/* Footer */}
        <div className="flex justify-between p-[10px] bg-side-menu-background ">
          {isEditMode ? (
            <>
              <Button
                iconType="plus"
                label="NewPage"
                variant="primary"
                onClick={handleNewPageClick}
              />
              <Button
                iconType="done"
                label="Done"
                variant="primary"
                onClick={handleDoneClick}
              />
            </>
          ) : (
            <div className="ml-auto">
              <Button
                iconType="edit"
                label="Edit"
                variant="primary"
                onClick={handleEditClick}
              />
            </div>
          )}
        </div>
      </aside>
    </EditModeContext.Provider>
  );
};
