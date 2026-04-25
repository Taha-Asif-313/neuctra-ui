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
  showTree?: boolean; // ✅ moved to root (global control)

  className?: string;
  listClassName?: string;
  itemClassName?: string;
  titleClassName?: string;
  bulletClassName?: string;
  textClassName?: string;
  iconClassName?: string;
  subListClassName?: string;

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
  showTree?: boolean;

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

export const ListItem: React.FC<ListItemProps> = ({
  text,
  icon,
  onClick,
  subItems,
  isInline,
  isOrdered,
  showTree,

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
  const hasChildren = subItems && subItems.length > 0;

  return (
    <li
      className={clsx(
        "relative",
        showTree && !isInline && "pl-5",
        !isInline && "pb-2",
        itemClassName // ✅ applied here
      )}
      style={itemStyle}
    >
      {/* 🌲 Tree lines */}
      {showTree && !isInline && (
        <>
          <span className="absolute left-2 top-0 bottom-0 w-px bg-foreground/60" />
          <span className="absolute left-2 top-[0.9rem] w-3 h-px bg-foreground/60" />
        </>
      )}

      <div
        onClick={onClick}
        className={clsx(
          "flex items-center gap-2 text-sm text-foreground transition-colors",
          onClick && "cursor-pointer hover:text-primary"
        )}
      >
        {/* ICON / BULLET */}
        {!isOrdered && (
          <>
            {icon ? (
              <span className={iconClassName} style={iconStyle}>
                {icon}
              </span>
            ) : (
              !isInline && (
                <span
                  className={clsx(
                    "w-2 h-2 rounded-full bg-primary",
                    bulletClassName
                  )}
                  style={bulletStyle}
                />
              )
            )}
          </>
        )}

        <span
          className={clsx("text-foreground", textClassName)}
          style={textStyle}
        >
          {text}
        </span>
      </div>

      {/* Nested */}
      {hasChildren && !isInline && (
        <ul
          className={clsx(
            showTree ? "ml-3 mt-1" : "ml-4 mt-1",
            isOrdered ? "list-decimal pl-5" : "list-none",
            subListClassName
          )}
          style={subListStyle}
        >
          {subItems!.map((sub, i) => (
            <ListItem
              key={i}
              {...sub}
              isInline={false}
              isOrdered={isOrdered}
              showTree={showTree} // ✅ FIXED
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
  showTree = false,

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
            showTree={showTree}
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