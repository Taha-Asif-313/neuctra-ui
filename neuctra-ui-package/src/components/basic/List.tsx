import React, { CSSProperties, ReactNode } from "react";

interface ListItemType {
  text: string;
  icon?: ReactNode;
  onClick?: () => void;
  subItems?: ListItemType[];
}

interface ListProps {
  title?: string;
  titleIcon?: ReactNode;

  items: ListItemType[];

  type?: "unordered" | "ordered" | "inline";

  bulletColor?: string;
  textColor?: string;
  backgroundColor?: string;
  borderColor?: string;

  fontSize?: string;
  fontWeight?: string | number;
  borderRadius?: string;
  padding?: string;
  spacing?: string;

  className?: string;
  style?: CSSProperties;
}

export const List: React.FC<ListProps> = ({
  title,
  titleIcon,
  items,
  type = "unordered",

  bulletColor = "#2563eb",
  textColor = "#111827",
  backgroundColor = "#fff",
  borderColor = "#e5e7eb",

  fontSize = "15px",
  fontWeight = 500,
  borderRadius = "12px",
  padding = "16px",
  spacing = "12px",

  className,
  style,
}) => {
  const isOrdered = type === "ordered";
  const isInline = type === "inline";

  const containerStyle: CSSProperties = {
    backgroundColor,
    borderColor,
    color: textColor,
    borderWidth: borderColor ? "1px" : "0px",
    borderStyle: "solid",
    borderRadius,
    padding,
    ...style,
  };

  const listStyle: CSSProperties = isInline
    ? {
        display: "flex",
        gap: spacing,
        paddingLeft: 0,
        listStyleType: "none",
        margin: 0,
      }
    : {
        listStyleType: isOrdered ? "decimal" : "none",
        paddingLeft: isOrdered ? "20px" : "0",
        margin: 0,
      };

  const ListTag = isOrdered ? "ol" : "ul";

  return (
    <div className={className} style={containerStyle}>
      {title && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "17px",
            fontWeight: 600,
            marginBottom: "10px",
            gap: "8px",
          }}
        >
          {titleIcon && <span style={{ fontSize: "18px" }}>{titleIcon}</span>}
          <span>{title}</span>
        </div>
      )}

      <ListTag style={listStyle}>
        {items.map((item, index) => (
          <ListItem
            key={index}
            {...item}
            bulletColor={bulletColor}
            textColor={textColor}
            fontSize={fontSize}
            fontWeight={fontWeight}
            spacing={spacing}
            isInline={isInline}
          />
        ))}
      </ListTag>
    </div>
  );
};

interface ListItemProps extends ListItemType {
  bulletColor: string;
  textColor: string;
  fontSize: string;
  fontWeight: string | number;
  spacing: string;
  isInline: boolean;
}

const ListItem: React.FC<ListItemProps> = ({
  text,
  icon,
  onClick,
  subItems,
  bulletColor,
  textColor,
  fontSize,
  fontWeight,
  spacing,
  isInline,
}) => {
  const itemContainerStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    marginBottom: isInline ? "0" : spacing,
  };

  const contentStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize,
    fontWeight,
    color: textColor,
    cursor: onClick ? "pointer" : "default",
  };

  const bulletStyle: CSSProperties = {
    width: "8px",
    height: "8px",
    backgroundColor: bulletColor,
    borderRadius: "50%",
    flexShrink: 0,
  };

  const subListStyle: CSSProperties = {
    listStyleType: "disc",
    paddingLeft: "20px",
    margin: 0,
  };

  return (
    <li style={itemContainerStyle}>
      <div style={contentStyle} onClick={onClick}>
        {icon ? (
          <span style={{ fontSize: "16px", color: textColor }}>{icon}</span>
        ) : (
          !isInline && <span style={bulletStyle}></span>
        )}
        <span>{text}</span>
      </div>

      {/* Nested list */}
      {subItems && subItems.length > 0 && (
        <ul style={subListStyle}>
          {subItems.map((sub, index) => (
            <ListItem
              key={index}
              {...sub}
              bulletColor={bulletColor}
              textColor={textColor}
              fontSize={fontSize}
              fontWeight={fontWeight}
              spacing={spacing}
              isInline={false}
            />
          ))}
        </ul>
      )}
    </li>
  );
};
