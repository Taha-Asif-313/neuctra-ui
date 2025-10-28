import React, {
  CSSProperties,
  ReactNode,
  ElementType,
  ComponentPropsWithoutRef,
  forwardRef,
  ForwardedRef,
  ReactElement,
} from "react";

type CardOwnProps = {
  // Content
  children?: ReactNode;
  className?: string;

  // Background
  background?: string;
  backgroundImage?: string;
  backgroundSize?: CSSProperties["backgroundSize"];
  backgroundPosition?: CSSProperties["backgroundPosition"];
  backgroundRepeat?: CSSProperties["backgroundRepeat"];
  backgroundGradient?: string;
  backgroundBlendMode?: CSSProperties["backgroundBlendMode"];

  // Colors
  textColor?: string;
  hoverStyles?: CSSProperties;
  activeStyles?: CSSProperties;

  // Borders & Shadows
  borderRadius?: string | number;
  border?: string;
  borderTop?: string;
  borderRight?: string;
  borderBottom?: string;
  borderLeft?: string;
  boxShadow?: string;
  hoverShadow?: string;
  transition?: string;

  // Spacing
  padding?: string | number;
  paddingX?: string | number;
  paddingY?: string | number;
  margin?: string | number;
  marginX?: string | number;
  marginY?: string | number;

  // Sizing
  width?: string | number;
  minWidth?: string | number;
  maxWidth?: string | number;
  height?: string | number;
  minHeight?: string | number;
  maxHeight?: string | number;

  // Layout
  display?: CSSProperties["display"];
  flexDirection?: CSSProperties["flexDirection"];
  justifyContent?: CSSProperties["justifyContent"];
  alignItems?: CSSProperties["alignItems"];
  alignContent?: CSSProperties["alignContent"];
  flexWrap?: CSSProperties["flexWrap"];
  flex?: CSSProperties["flex"];
  gap?: string | number;

  // Position
  position?: CSSProperties["position"];
  top?: string | number;
  right?: string | number;
  bottom?: string | number;
  left?: string | number;
  zIndex?: number;

  // Overflow
  overflow?: CSSProperties["overflow"];
  overflowX?: CSSProperties["overflowX"];
  overflowY?: CSSProperties["overflowY"];

  // Cursor & Interaction
  cursor?: CSSProperties["cursor"];
  pointerEvents?: CSSProperties["pointerEvents"];
  userSelect?: CSSProperties["userSelect"];

  // Transform
  transform?: CSSProperties["transform"];
  transformOrigin?: CSSProperties["transformOrigin"];

  // Filters
  backdropFilter?: CSSProperties["backdropFilter"];
  filter?: CSSProperties["filter"];

  // Other
  opacity?: number;
  visibility?: CSSProperties["visibility"];

  as?: ElementType;
};

type CardProps<T extends ElementType = "div"> = CardOwnProps &
  Omit<ComponentPropsWithoutRef<T>, keyof CardOwnProps>;

const CardInner = <T extends ElementType = "div">(
  props: CardProps<T>,
  ref: ForwardedRef<HTMLDivElement>
) => {
  const {
    as,
    children,
    className = "",
    style = {},

    // Background
    background = "#fff",
    backgroundImage,
    backgroundSize = "cover",
    backgroundPosition = "center",
    backgroundRepeat = "no-repeat",
    backgroundGradient,
    backgroundBlendMode,

    // Colors
    textColor = "#000",
    hoverStyles = {},
    activeStyles = {},

    // Borders & Shadows
    borderRadius = 12,
    border = "none",
    borderTop,
    borderRight,
    borderBottom,
    borderLeft,
    boxShadow = "0 4px 12px rgba(0,0,0,0.1)",
    hoverShadow,
    transition = "all 0.2s ease",

    // Spacing
    padding,
    paddingX,
    paddingY,
    margin,
    marginX,
    marginY,

    // Sizing
    width,
    minWidth,
    maxWidth = "100%",
    height,
    minHeight,
    maxHeight,

    // Layout
    display = "flex",
    flexDirection = "column",
    justifyContent = "flex-start",
    alignItems = "stretch",
    alignContent,
    flexWrap,
    flex,
    gap = 16,

    // Position
    position,
    top,
    right,
    bottom,
    left,
    zIndex,

    // Overflow
    overflow,
    overflowX,
    overflowY,

    // Cursor & Interaction
    cursor,
    pointerEvents,
    userSelect,

    // Transform
    transform,
    transformOrigin,

    // Filters
    backdropFilter,
    filter,

    // Other
    opacity,
    visibility,

    ...restProps
  } = props;

  const Component = as || "div";

  const cardStyle: CSSProperties = {
    // Background
    background: backgroundGradient
      ? `${backgroundGradient}${background ? `, ${background}` : ""}`
      : background,
    color: textColor,
    ...(backgroundImage
      ? {
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize,
          backgroundPosition,
          backgroundRepeat,
        }
      : {}),
    backgroundBlendMode,

    // Borders & Shadows
    borderRadius,
    boxShadow,
    transition,

    // Spacing
    ...(padding
      ? { padding }
      : {
          paddingTop: paddingY,
          paddingBottom: paddingY,
          paddingLeft: paddingX,
          paddingRight: paddingX,
        }),
    ...(margin
      ? { margin }
      : {
          marginTop: marginY,
          marginBottom: marginY,
          marginLeft: marginX,
          marginRight: marginX,
        }),

    // Sizing
    width,
    minWidth,
    maxWidth,
    height,
    minHeight,
    maxHeight,

    // Layout
    display,
    flexDirection,
    justifyContent,
    alignItems,
    alignContent,
    flexWrap,
    flex,
    gap,

    // Position
    position,
    top,
    right,
    bottom,
    left,
    zIndex,

    // Overflow
    overflow,
    overflowX,
    overflowY,

    // Cursor & Interaction
    cursor,
    pointerEvents,
    userSelect,

    // Transform
    transform,
    transformOrigin,

    // Filters
    backdropFilter,
    filter,

    // Other
    opacity,
    visibility,

    // Border handling
    border,
    ...(borderTop && { borderTop }),
    ...(borderRight && { borderRight }),
    ...(borderBottom && { borderBottom }),
    ...(borderLeft && { borderLeft }),

    // Box sizing
    boxSizing: "border-box",
  };

  const hoverActiveStyles = {
    "--hover-shadow": hoverShadow,
    "--hover-styles": JSON.stringify(hoverStyles),
    "--active-styles": JSON.stringify(activeStyles),
  } as CSSProperties;

  return (
    <Component
      ref={ref}
      className={`card ${className}`}
      style={{ ...cardStyle, ...hoverActiveStyles, ...style }}
      {...restProps}
    >
      {children}
    </Component>
  );
};

// Create the forwarded component
const ForwardedCard = forwardRef(CardInner) as <T extends ElementType = "div">(
  props: CardProps<T> & { ref?: ForwardedRef<HTMLDivElement> }
) => ReactElement;

// Assign display name to the final component
const Card = Object.assign(ForwardedCard, { displayName: "Card" });

export { Card };
