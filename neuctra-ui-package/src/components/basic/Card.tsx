import React, {
  CSSProperties,
  ReactNode,
  ElementType,
  forwardRef,
  ForwardedRef,
  ReactElement,
  ComponentPropsWithoutRef,
} from "react";

type CardVariant = "elevated" | "outline" | "flat";

type CardOwnProps = {
  as?: ElementType;
  children?: ReactNode;
  className?: string;
  variant?: CardVariant;
  background?: string;
  textColor?: string;
  borderRadius?: string | number;
  border?: string;
  boxShadow?: string;
  hoverShadow?: string;
  padding?: string | number;
  margin?: string | number;
  width?: string | number;
  height?: string | number;
  style?: CSSProperties;
  hoverStyle?: CSSProperties;
  onClick?: () => void;
};

type CardProps<T extends ElementType = "div"> = CardOwnProps &
  Omit<ComponentPropsWithoutRef<T>, keyof CardOwnProps>;

const CardInner = <T extends ElementType = "div">(
  {
    as,
    children,
    className = "",
    variant = "elevated",
    background = "#fff",
    textColor = "#000",
    borderRadius = 12,
    border,
    boxShadow,
    hoverShadow,
    padding = 16,
    margin,
    width,
    height,
    style = {},
    hoverStyle = {},
    onClick,
    ...rest
  }: CardProps<T>,
  ref: ForwardedRef<HTMLDivElement>
) => {
  const Component = as || "div";

  // Default styling based on variant
  const baseVariantStyles: Record<CardVariant, CSSProperties> = {
    elevated: {
      boxShadow: boxShadow || "0 4px 12px rgba(0,0,0,0.08)",
      border: border || "none",
    },
    outline: {
      border: border || "1px solid rgba(0,0,0,0.1)",
      boxShadow: "none",
    },
    flat: {
      border: "none",
      boxShadow: "none",
    },
  };

  const cardStyle: CSSProperties = {
    background,
    color: textColor,
    borderRadius,
    padding,
    margin,
    width,
    height,
    transition: "all 0.25s ease",
    cursor: onClick ? "pointer" : undefined,
    boxSizing: "border-box",
    ...baseVariantStyles[variant],
    ...style,
  };

  return (
    <Component
      ref={ref}
      className={`ui-card ${className}`}
      style={cardStyle}
      onClick={onClick}
      onMouseEnter={(e: React.MouseEvent<HTMLElement>) => {
        Object.assign(
          e.currentTarget.style,
          hoverShadow ? { boxShadow: hoverShadow } : hoverStyle
        );
      }}
      onMouseLeave={(e: React.MouseEvent<HTMLElement>) => {
        Object.assign(e.currentTarget.style, {
          ...baseVariantStyles[variant],
          ...style,
        });
      }}
      {...rest}
    >
      {children}
    </Component>
  );
};

const ForwardedCard = forwardRef(CardInner) as <T extends ElementType = "div">(
  props: CardProps<T> & { ref?: ForwardedRef<HTMLDivElement> }
) => ReactElement;

const Card = Object.assign(ForwardedCard, { displayName: "Card" });

export { Card };
