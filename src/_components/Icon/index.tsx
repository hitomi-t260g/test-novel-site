import type { ComponentProps } from "react";
import CancelIcon from "@/../public/icon/cancel.svg";
import DeleteIcon from "@/../public/icon/delete.svg";
import DoneIcon from "@/../public/icon/done.svg";
import EditIcon from "@/../public/icon/edit.svg";
import LogoIcon from "@/../public/icon/logo.svg";
import PlusIcon from "@/../public/icon/plus.svg";
import SaveIcon from "@/../public/icon/save.svg";

/**
 * 使用可能なアイコンのタイプ
 */
export type IconType =
  | "plus"
  | "cancel"
  | "delete"
  | "done"
  | "edit"
  | "logo"
  | "save";

/**
 * アイコンのサイズ
 */
export type IconSize = "small" | "medium" | "large";

export interface IconProps extends ComponentProps<"svg"> {
  /**
   * アイコンのタイプ
   */
  type: IconType;
  /**
   * アイコンのサイズ（デフォルト: medium）
   */
  size?: IconSize;
}

const sizeClasses = {
  small: "w-4 h-4",
  medium: "w-6 h-6",
  large: "w-8 h-8",
} as const;

const iconComponents = {
  plus: PlusIcon,
  cancel: CancelIcon,
  delete: DeleteIcon,
  done: DoneIcon,
  edit: EditIcon,
  save: SaveIcon,
  logo: LogoIcon,
};

/**
 * アイコンコンポーネント
 *
 * SVGファイルを@svgr/webpackでReactコンポーネントとして読み込み、
 * currentColorで色を制御できます。
 *
 * @example
 * ```tsx
 * <Icon type="edit" size="small" />
 * <Icon type="done" size="medium" className="text-brand" />
 * <Icon type="save" size="large" className="text-button-primary" />
 * ```
 */
export const Icon = ({
  type,
  size = "medium",
  className = "",
  ...props
}: IconProps) => {
  const IconComponent = iconComponents[type];

  return (
    <IconComponent
      className={`inline-block ${sizeClasses[size]} ${className}`}
      aria-label={type}
      {...props}
    />
  );
};
