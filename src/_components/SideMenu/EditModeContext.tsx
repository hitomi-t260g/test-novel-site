"use client";

import { createContext, useContext } from "react";

interface EditModeContextType {
  isEditMode: boolean;
}

export const EditModeContext = createContext<EditModeContextType>({
  isEditMode: false,
});

export const useEditMode = () => {
  const context = useContext(EditModeContext);
  return context.isEditMode;
};
