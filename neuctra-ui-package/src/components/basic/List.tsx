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
  const dynamicTextStyle: CSSProperties = !primaryTheme
    ? { color: primaryColor }
    : {};

  const dynamicBulletStyle: CSSProperties = !primaryTheme
    ? { backgroundColor: primaryColor }
    : {};

  return (
    <li className={clsx(!isInline && "mb-3")}>
      <div
        onClick={onClick}
        style={{ ...dynamicTextStyle, ...itemStyle }}
        className={clsx(
          "flex items-center gap-2 text-sm text-zinc-800 dark:text-zinc-200 transition-all",
          onClick &&
            (primaryTheme
              ? "cursor-pointer hover:text-[var(--primary)]"
              : "cursor-pointer"),
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
                "w-2 h-2 rounded-full",
                primaryTheme && "bg-[var(--primary)]",
                bulletClassName
              )}
              style={{ ...dynamicBulletStyle, ...bulletStyle }}
            />
          )
        )}

        <span className={textClassName} style={textStyle}>
          {text}
        </span>
      </div>

      {/* Nested */}
      {subItems && subItems.length > 0 && (
        <ul
          className={clsx(
            "pl-5 mt-2 space-y-2",
            isOrdered ? "list-decimal" : "list-none",
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
    <div className={className} style={style}>
      {/* TITLE */}
      {title && (
        <div
          className={clsx(
            "flex items-center gap-2 mb-3 text-base font-semibold text-zinc-900 dark:text-white",
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
            ? "list-decimal pl-5 space-y-2"
            : "list-none p-0",
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