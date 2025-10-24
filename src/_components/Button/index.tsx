import type { ComponentProps } from "react";
import type { IconType } from "../Icon";
import { Icon } from "../Icon";
import { Typography } from "../Typography";

export type ButtonVariant = "primary" | "secondary" | "normal";

export interface ButtonProps
  extends Omit<ComponentProps<"button">, "children"> {
  /**
   * アイコンのタイプ
   */
  iconType: IconType;
  /**
   * ボタンのラベル
   */
  label: string;
  /**
   * ボタンのバリエーション（デフォルト: primary）
   */
  variant?: ButtonVariant;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-button-primary border border-button-primary text-white hover:bg-button-primary-hover active:bg-button-primary-active",
  secondary:
    "bg-button-secondary border-2 border-button-secondary-border text-text-brand hover:bg-button-secondary-hover active:bg-button-normal",
  normal:
    "bg-button-normal border border-button-normal text-white hover:bg-button-normal-hover active:bg-button-normal-active",
};

/**
 * アイコンとラベルをもつButtonコンポーネント
 *
 * @example
 * ```tsx
 * <Button iconType="save" label="保存" variant="primary" />
 * <Button iconType="cancel" label="キャンセル" variant="secondary" />
 * <Button iconType="edit" label="編集" variant="normal" disabled />
 * ```
 */
export const Button = ({
  iconType,
  label,
  variant = "primary",
  className = "",
  disabled = false,
  width = "90px",
  ...props
}: ButtonProps) => {
  const baseClasses =
    "flex flex-col items-center justify-center min-w-[40px] h-10 rounded cursor-pointer";
  const disabledClasses = disabled
    ? "opacity-80 cursor-not-allowed pointer-events-none"
    : "";
  const classes = `${baseClasses} ${variantClasses[variant]} ${disabledClasses} ${className} w-[${width}]`;

  return (
    <button type="button" className={classes} disabled={disabled} {...props}>
      <Icon type={iconType} size="medium" />
      <Typography value="minimum">{label}</Typography>
    </button>
  );
};
