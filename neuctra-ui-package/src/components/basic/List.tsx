import React, { ReactNode, CSSProperties } from "react";
import clsx from "clsx";

/* -------------------------------------------------------------------------- */
/*                                🧩 Types                                    */
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

  // 🔥 THEME CONTROL
  primaryTheme?: boolean; // use CSS var
  primaryColor?: string; // fallback color

  className?: string;
  itemClassName?: string;
  titleClassName?: string;
  bulletClassName?: string;
}

/* -------------------------------------------------------------------------- */
/*                               🪶 ListItem                                  */
/* -------------------------------------------------------------------------- */

interface ListItemProps extends ListItemType {
  isInline?: boolean;
  isOrdered?: boolean;

  primaryTheme?: boolean;
  primaryColor?: string;

  itemClassName?: string;
  bulletClassName?: string;
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
}) => {
  // ✅ Dynamic style for primary color
  const dynamicStyle: CSSProperties = !primaryTheme
    ? { color: primaryColor }
    : {};

  const bulletStyle: CSSProperties = !primaryTheme
    ? { backgroundColor: primaryColor }
    : {};

  return (
    <li className={clsx(!isInline && "mb-3")}>
      <div
        onClick={onClick}
        style={!primaryTheme ? dynamicStyle : undefined}
        className={clsx(
          "flex items-center gap-2 text-sm text-zinc-800 dark:text-zinc-200 transition-all",
          onClick &&
            (primaryTheme
              ? "cursor-pointer hover:text-[var(--primary)]"
              : "cursor-pointer"),
          itemClassName
        )}
      >
        {/* ICON */}
        {icon ? (
          <span className="text-base">{icon}</span>
        ) : (
          !isInline &&
          !isOrdered && (
            <span
              style={!primaryTheme ? bulletStyle : undefined}
              className={clsx(
                "w-2 h-2 rounded-full",
                primaryTheme && "bg-[var(--primary)]",
                bulletClassName
              )}
            />
          )
        )}

        <span>{text}</span>
      </div>

      {/* Nested */}
      {subItems && subItems.length > 0 && (
        <ul
          className={clsx(
            "pl-5 mt-2 space-y-2",
            isOrdered ? "list-decimal" : "list-none"
          )}
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
            />
          ))}
        </ul>
      )}
    </li>
  );
};

/* -------------------------------------------------------------------------- */
/*                                   📋 List                                  */
/* -------------------------------------------------------------------------- */

export const List: React.FC<ListProps> = ({
  title,
  titleIcon,
  items,
  type = "unordered",

  primaryTheme = true,
  primaryColor = "#3b82f6",

  className,
  itemClassName,
  titleClassName,
  bulletClassName,
}) => {
  const isOrdered = type === "ordered";
  const isInline = type === "inline";

  const ListTag = isOrdered ? "ol" : "ul";

  return (
    <div
      className={clsx(
        "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4",
        className
      )}
    >
      {title && (
        <div
          className={clsx(
            "flex items-center gap-2 mb-3 text-base font-semibold text-zinc-900 dark:text-white",
            titleClassName
          )}
        >
          {titleIcon && <span>{titleIcon}</span>}
          <span>{title}</span>
        </div>
      )}

      <ListTag
        className={clsx(
          isInline
            ? "flex flex-wrap gap-4"
            : isOrdered
            ? "list-decimal pl-5 space-y-2"
            : "list-none p-0"
        )}
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
          />
        ))}
      </ListTag>
    </div>
  );
};