import type { ComponentProps } from "react";
import type { IconType } from "../Icon";
import { Icon } from "../Icon";

export interface IconButtonProps
  extends Omit<ComponentProps<"button">, "children"> {
  /**
   * アイコンのタイプ
   */
  iconType: IconType;
}

/**
 * アイコンのみのボタンコンポーネント
 *
 * @example
 * ```tsx
 * <IconButton iconType="edit" />
 * <IconButton iconType="delete" disabled />
 * ```
 */
export const IconButton = ({
  iconType,
  className = "",
  disabled = false,
  ...props
}: IconButtonProps) => {
  const baseClasses =
    "flex items-center justify-center w-6 h-6 rounded cursor-pointer hover:bg-icon-button-hover active:bg-icon-button-pressed text-button-normal";
  const disabledClasses = disabled
    ? "opacity-80 cursor-not-allowed pointer-events-none"
    : "";
  const classes = `${baseClasses} ${disabledClasses} ${className}`;

  return (
    <button type="button" className={classes} disabled={disabled} {...props}>
      <Icon type={iconType} size="medium" className="button-normal" />
    </button>
  );
};
