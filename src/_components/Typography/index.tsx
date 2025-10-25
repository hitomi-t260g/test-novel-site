import type { ComponentProps } from "react";

export type TypographyValue = "body" | "caption" | "minimum";

export interface TypographyProps extends ComponentProps<"p"> {
  /**
   * テキストのバリアント
   */
  value: TypographyValue;
}

const variantClasses: Record<TypographyValue, string> = {
  body: "text-body font-medium",
  caption: "text-caption font-medium",
  minimum: "text-minimum font-medium",
};

/**
 * 本文・キャプション・最小テキスト用コンポーネント
 *
 */
export const Typography = ({
  value,
  className,
  children,
  ...props
}: TypographyProps) => {
  const baseClasses = variantClasses[value];
  const classes = className ? `${baseClasses} ${className}` : baseClasses;

  return (
    <p className={classes} {...props}>
      {children}
    </p>
  );
};
