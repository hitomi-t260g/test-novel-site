import type { ComponentProps } from "react";

export type HeadingValue = "h1" | "h2" | "h3";

export interface HeadingProps extends ComponentProps<"h1"> {
  /**
   * 見出しレベル
   */
  value: HeadingValue;
}

/**
 * セマンティックな見出しコンポーネント
 */
export const Heading = ({
  value,
  className,
  children,
  ...props
}: HeadingProps) => {
  const Tag = value;
  const baseClasses = "text-heading font-bold";
  const classes = className ? `${baseClasses} ${className}` : baseClasses;

  return (
    <Tag className={classes} {...props}>
      {children}
    </Tag>
  );
};
