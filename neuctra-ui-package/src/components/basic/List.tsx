"use client";

import React, { ReactNode, CSSProperties } from "react";
import clsx from "clsx";

/* -------------------------------------------------------------------------- */
/* 🧩 Types                                                                  */
/* -------------------------------------------------------------------------- */

export interface ListItemType {
  text: string;
  icon?: ReactNode;
  onClick?: () => void;
  subItems?: ListItemType[];
}

export interface ListProps {
  title?: string;
  titleIcon?: ReactNode;
  items: ListItemType[];

  type?: "unordered" | "ordered" | "inline";

  /** 🎨 Theme */
  primaryTheme?: boolean;
  primaryColor?: string;

  /** 🔥 Class Customization */
  className?: string;
  listClassName?: string;
  itemClassName?: string;
  titleClassName?: string;
  bulletClassName?: string;
  textClassName?: string;
  iconClassName?: string;
  subListClassName?: string;

  /** 🔥 Style Customization */
  style?: CSSProperties;
  listStyle?: CSSProperties;
  itemStyle?: CSSProperties;
  titleStyle?: CSSProperties;
  bulletStyle?: CSSProperties;
  textStyle?: CSSProperties;
  iconStyle?: CSSProperties;
  subListStyle?: CSSProperties;
}

/* -------------------------------------------------------------------------- */
/* 🪶 ListItem                                                               */
/* -------------------------------------------------------------------------- */

interface ListItemProps extends ListItemType {
  isInline?: boolean;
  isOrdered?: boolean;

  primaryTheme?: boolean;
  primaryColor?: string;

  itemClassName?: string;
  bulletClassName?: string;
  textClassName?: string;
  iconClassName?: string;
  subListClassName?: string;

  itemStyle?: CSSProperties;
  bulletStyle?: CSSProperties;
  textStyle?: CSSProperties;
  iconStyle?: CSSProperties;
  subListStyle?: CSSProperties;
}

const ListItem: React.FC<ListItemProps> = ({
  text,
  icon,
  onClick,
  subItems,
  isInline,
  isOrdered,
  primaryTheme = true,
  primaryColor = "#3b82f6",

  itemClassName,
  bulletClassName,
  textClassName,
  iconClassName,
  subListClassName,

  itemStyle,
  bulletStyle,
  textStyle,
  iconStyle,
  subListStyle,
}) => {
  return (
    <li className={clsx(!isInline && "mb-3")}>
      <div
        onClick={onClick}
        style={itemStyle}
        className={clsx(
          "flex items-center gap-2 text-sm text-foreground transition-colors",
          onClick && "cursor-pointer hover:text-primary",
          itemClassName
        )}
      >
        {/* ICON / BULLET */}
        {icon ? (
          <span className={iconClassName} style={iconStyle}>
            {icon}
          </span>
        ) : (
          !isInline &&
          !isOrdered && (
            <span
              className={clsx(
                "w-2 h-2 rounded-full bg-primary",
                bulletClassName
              )}
              style={bulletStyle}
            />
          )
        )}

        <span className={clsx("text-foreground", textClassName)} style={textStyle}>
          {text}
        </span>
      </div>

      {/* Nested */}
      {subItems && subItems.length > 0 && (
        <ul
          className={clsx(
            "pl-5 mt-2 space-y-2",
            isOrdered ? "list-decimal text-foreground" : "list-none",
            subListClassName
          )}
          style={subListStyle}
        >
          {subItems.map((sub, i) => (
            <ListItem
              key={i}
              {...sub}
              isInline={false}
              isOrdered={isOrdered}
              primaryTheme={primaryTheme}
              primaryColor={primaryColor}
              itemClassName={itemClassName}
              bulletClassName={bulletClassName}
              textClassName={textClassName}
              iconClassName={iconClassName}
              subListClassName={subListClassName}
              itemStyle={itemStyle}
              bulletStyle={bulletStyle}
              textStyle={textStyle}
              iconStyle={iconStyle}
              subListStyle={subListStyle}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

/* -------------------------------------------------------------------------- */
/* 📋 List                                                                   */
/* -------------------------------------------------------------------------- */

export const List: React.FC<ListProps> = ({
  title,
  titleIcon,
  items,
  type = "unordered",

  primaryTheme = true,
  primaryColor = "#3b82f6",

  className,
  listClassName,
  itemClassName,
  titleClassName,
  bulletClassName,
  textClassName,
  iconClassName,
  subListClassName,

  style,
  listStyle,
  itemStyle,
  titleStyle,
  bulletStyle,
  textStyle,
  iconStyle,
  subListStyle,
}) => {
  const isOrdered = type === "ordered";
  const isInline = type === "inline";

  const ListTag = isOrdered ? "ol" : "ul";

  return (
    <div className={clsx("text-foreground", className)} style={style}>
      {/* TITLE */}
      {title && (
        <div
          className={clsx(
            "flex items-center gap-2 mb-3 text-base font-semibold text-foreground",
            titleClassName
          )}
          style={titleStyle}
        >
          {titleIcon && (
            <span className={iconClassName} style={iconStyle}>
              {titleIcon}
            </span>
          )}
          <span>{title}</span>
        </div>
      )}

      {/* LIST */}
      <ListTag
        className={clsx(
          isInline
            ? "flex flex-wrap gap-4"
            : isOrdered
            ? "list-decimal pl-5 space-y-2 text-foreground"
            : "list-none p-0 text-foreground",
          listClassName
        )}
        style={listStyle}
      >
        {items.map((item, i) => (
          <ListItem
            key={i}
            {...item}
            isInline={isInline}
            isOrdered={isOrdered}
            primaryTheme={primaryTheme}
            primaryColor={primaryColor}
            itemClassName={itemClassName}
            bulletClassName={bulletClassName}
            textClassName={textClassName}
            iconClassName={iconClassName}
            subListClassName={subListClassName}
            itemStyle={itemStyle}
            bulletStyle={bulletStyle}
            textStyle={textStyle}
            iconStyle={iconStyle}
            subListStyle={subListStyle}
          />
        ))}
      </ListTag>
    </div>
  );
};