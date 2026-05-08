"use client";

import React, {
  CSSProperties,
  ElementType,
  MouseEvent,
  ReactNode,
  useMemo,
  useState,
} from "react";
import clsx from "clsx";
import { ChevronDown, ChevronRight, ExternalLink } from "lucide-react";

export type ListType = "unordered" | "ordered" | "inline";
export type ListVariant = "default" | "nav" | "menu" | "card" | "ghost";
export type ListSize = "sm" | "md" | "lg";
export type ListDensity = "compact" | "normal" | "comfortable";
export type NestedMode = "always" | "collapse";
export type BulletVariant = "dot" | "line" | "number" | "none";

export interface ListItemType {
  id?: string | number;
  text?: ReactNode;
  label?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  leading?: ReactNode;
  trailing?: ReactNode;
  badge?: ReactNode;
  shortcut?: ReactNode;

  href?: string;
  target?: React.HTMLAttributeAnchorTarget;
  rel?: string;
  download?: boolean | string;
  onClick?: (
    event: MouseEvent<HTMLElement>,
    item: ListItemType,
  ) => void;

  subItems?: ListItemType[];
  items?: ListItemType[];
  expanded?: boolean;
  defaultExpanded?: boolean;
  collapsible?: boolean;

  active?: boolean;
  disabled?: boolean;
  danger?: boolean;
  separator?: boolean;
  hidden?: boolean;

  title?: string;
  ariaLabel?: string;
  role?: string;

  className?: string;
  contentClassName?: string;
  iconClassName?: string;
  textClassName?: string;
  descriptionClassName?: string;
  badgeClassName?: string;
  subListClassName?: string;

  style?: CSSProperties;
  contentStyle?: CSSProperties;
  iconStyle?: CSSProperties;
  textStyle?: CSSProperties;
  descriptionStyle?: CSSProperties;
  badgeStyle?: CSSProperties;
  subListStyle?: CSSProperties;
}

export interface ListRenderItemParams {
  item: ListItemType;
  index: number;
  depth: number;
  active: boolean;
  expanded: boolean;
  disabled: boolean;
  hasChildren: boolean;
  toggle: () => void;
  select: (event: MouseEvent<HTMLElement>) => void;
}

export interface ListProps {
  title?: ReactNode;
  titleIcon?: ReactNode;
  description?: ReactNode;
  items: ListItemType[];

  type?: ListType;
  variant?: ListVariant;
  size?: ListSize;
  density?: ListDensity;
  nestedMode?: NestedMode;
  bulletVariant?: BulletVariant;

  showTree?: boolean;
  showBullets?: boolean;
  showDividers?: boolean;
  interactive?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;

  activeItemId?: string | number;
  defaultActiveItemId?: string | number;
  onActiveChange?: (id: string | number, item: ListItemType) => void;

  expandedIds?: Array<string | number>;
  defaultExpandedIds?: Array<string | number>;
  onExpandedChange?: (ids: Array<string | number>) => void;

  role?: string;
  ariaLabel?: string;
  emptyState?: ReactNode;
  linkComponent?: ElementType;
  renderItem?: (params: ListRenderItemParams) => ReactNode;

  className?: string;
  headerClassName?: string;
  listClassName?: string;
  itemClassName?: string;
  itemContentClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  bulletClassName?: string;
  textClassName?: string;
  iconClassName?: string;
  badgeClassName?: string;
  shortcutClassName?: string;
  trailingClassName?: string;
  subListClassName?: string;
  separatorClassName?: string;

  style?: CSSProperties;
  headerStyle?: CSSProperties;
  listStyle?: CSSProperties;
  itemStyle?: CSSProperties;
  itemContentStyle?: CSSProperties;
  titleStyle?: CSSProperties;
  descriptionStyle?: CSSProperties;
  bulletStyle?: CSSProperties;
  textStyle?: CSSProperties;
  iconStyle?: CSSProperties;
  badgeStyle?: CSSProperties;
  shortcutStyle?: CSSProperties;
  trailingStyle?: CSSProperties;
  subListStyle?: CSSProperties;
  separatorStyle?: CSSProperties;
}

interface ListItemProps {
  item?: ListItemType;
  index?: number;
  depth?: number;
  isInline?: boolean;
  isOrdered?: boolean;
  showTree?: boolean;
  showBullets?: boolean;
  showDividers?: boolean;
  interactive?: boolean;
  disabled?: boolean;
  variant?: ListVariant;
  size?: ListSize;
  density?: ListDensity;
  nestedMode?: NestedMode;
  bulletVariant?: BulletVariant;
  activeItemId?: string | number;
  expandedIds?: Set<string | number>;
  toggleExpanded?: (id: string | number, item: ListItemType) => void;
  selectItem?: (id: string | number, item: ListItemType) => void;
  linkComponent?: ElementType;
  renderItem?: (params: ListRenderItemParams) => ReactNode;

  itemClassName?: string;
  itemContentClassName?: string;
  bulletClassName?: string;
  textClassName?: string;
  iconClassName?: string;
  badgeClassName?: string;
  shortcutClassName?: string;
  trailingClassName?: string;
  subListClassName?: string;
  separatorClassName?: string;

  itemStyle?: CSSProperties;
  itemContentStyle?: CSSProperties;
  bulletStyle?: CSSProperties;
  textStyle?: CSSProperties;
  iconStyle?: CSSProperties;
  badgeStyle?: CSSProperties;
  shortcutStyle?: CSSProperties;
  trailingStyle?: CSSProperties;
  subListStyle?: CSSProperties;
  separatorStyle?: CSSProperties;
}

const sizeClasses: Record<ListSize, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

const paddingClasses: Record<ListDensity, Record<ListSize, string>> = {
  compact: {
    sm: "px-2 py-1",
    md: "px-2.5 py-1.5",
    lg: "px-3 py-2",
  },
  normal: {
    sm: "px-2.5 py-1.5",
    md: "px-3 py-2",
    lg: "px-3.5 py-2.5",
  },
  comfortable: {
    sm: "px-3 py-2",
    md: "px-3.5 py-2.5",
    lg: "px-4 py-3",
  },
};

const variantClasses: Record<ListVariant, string> = {
  default: "rounded-md hover:bg-accent",
  nav: "rounded-lg hover:bg-accent hover:text-foreground",
  menu: "rounded-md hover:bg-accent",
  card: "rounded-lg border border-border bg-card hover:bg-accent",
  ghost: "rounded-md hover:bg-accent/70",
};

const activeClasses: Record<ListVariant, string> = {
  default: "bg-accent text-foreground",
  nav: "bg-primary text-foreground",
  menu: "bg-accent text-foreground",
  card: "border-primary bg-primary/10 text-foreground",
  ghost: "bg-accent text-foreground",
};

const getItemId = (item: ListItemType, index: number, depth: number) =>
  item.id ?? `${depth}-${index}-${String(item.text ?? item.label ?? "item")}`;

const getChildren = (item: ListItemType) => item.subItems ?? item.items ?? [];

const getLabel = (item: ListItemType) => item.text ?? item.label;

const shouldUseRel = (target?: React.HTMLAttributeAnchorTarget, rel?: string) =>
  rel ?? (target === "_blank" ? "noreferrer" : undefined);

export const ListItem: React.FC<ListItemProps & Partial<ListItemType>> = (
  props,
) => {
  const item = props.item ?? {
    id: props.id,
    text: props.text,
    label: props.label,
    description: props.description,
    icon: props.icon,
    leading: props.leading,
    trailing: props.trailing,
    badge: props.badge,
    shortcut: props.shortcut,
    href: props.href,
    target: props.target,
    rel: props.rel,
    download: props.download,
    onClick: props.onClick,
    subItems: props.subItems,
    items: props.items,
    expanded: props.expanded,
    defaultExpanded: props.defaultExpanded,
    collapsible: props.collapsible,
    active: props.active,
    disabled: props.disabled,
    danger: props.danger,
    separator: props.separator,
    hidden: props.hidden,
    title: props.title,
    ariaLabel: props.ariaLabel,
    role: props.role,
    className: props.className,
    contentClassName: props.contentClassName,
    iconClassName: props.iconClassName,
    textClassName: props.textClassName,
    descriptionClassName: props.descriptionClassName,
    badgeClassName: props.badgeClassName,
    subListClassName: props.subListClassName,
    style: props.style,
    contentStyle: props.contentStyle,
    iconStyle: props.iconStyle,
    textStyle: props.textStyle,
    descriptionStyle: props.descriptionStyle,
    badgeStyle: props.badgeStyle,
    subListStyle: props.subListStyle,
  };

  const {
    index = 0,
    depth = 0,
    isInline = false,
    isOrdered = false,
    showTree = false,
    showBullets = false,
    showDividers = false,
    interactive = true,
    disabled: listDisabled = false,
    variant = "default",
    size = "md",
    density = "normal",
    nestedMode = "collapse",
    bulletVariant = "dot",
    activeItemId,
    expandedIds,
    toggleExpanded,
    selectItem,
    linkComponent,
    renderItem,
    itemClassName,
    itemContentClassName,
    bulletClassName,
    textClassName,
    iconClassName,
    badgeClassName,
    shortcutClassName,
    trailingClassName,
    subListClassName,
    separatorClassName,
    itemStyle,
    itemContentStyle,
    bulletStyle,
    textStyle,
    iconStyle,
    badgeStyle,
    shortcutStyle,
    trailingStyle,
    subListStyle,
    separatorStyle,
  } = props;

  if (item.hidden) return null;

  const id = getItemId(item, index, depth);
  const children = getChildren(item);
  const hasChildren = children.length > 0;
  const itemDisabled = listDisabled || !!item.disabled;
  const itemActive = item.active || activeItemId === id;
  const controlledExpanded = item.expanded;
  const setExpanded = expandedIds?.has(id);
  const expanded =
    controlledExpanded ?? setExpanded ?? item.defaultExpanded ?? nestedMode === "always";
  const collapsible = item.collapsible ?? nestedMode === "collapse";
  const label = getLabel(item);
  const LeadingIcon = item.leading ?? item.icon;
  const LinkComponent = linkComponent ?? "a";
  const hasAction = !!item.href || !!item.onClick || hasChildren;
  const isClickable = interactive && hasAction && !itemDisabled;
  const isExternal = item.target === "_blank";

  const toggle = () => {
    if (!hasChildren || itemDisabled) return;
    toggleExpanded?.(id, item);
  };

  const handleSelect = (event: MouseEvent<HTMLElement>) => {
    if (itemDisabled) {
      event.preventDefault();
      return;
    }

    if (hasChildren && (!item.href || collapsible)) {
      toggle();
    }

    item.onClick?.(event, item);
    selectItem?.(id, item);
  };

  if (item.separator) {
    return (
      <li
        role="separator"
        className={clsx("my-1 h-px bg-border", separatorClassName)}
        style={separatorStyle}
      />
    );
  }

  const marker =
    showBullets &&
    !isOrdered &&
    !isInline &&
    !LeadingIcon &&
    bulletVariant !== "none";

  const content = (
    <>
      {marker && (
        <span
          aria-hidden="true"
          className={clsx(
            "shrink-0",
            bulletVariant === "line" && "mt-1.5 h-px w-4 bg-current opacity-50",
            bulletVariant === "number" &&
              "flex h-5 min-w-5 items-center justify-center rounded-full bg-primary/10 px-1 text-xs font-medium text-foreground",
            bulletVariant === "dot" && "mt-1.5 h-2 w-2 rounded-full bg-primary",
            bulletClassName,
          )}
          style={bulletStyle}
        >
          {bulletVariant === "number" ? index + 1 : null}
        </span>
      )}

      {LeadingIcon && (
        <span
          className={clsx(
            "shrink-0 text-foreground/70",
            item.iconClassName,
            iconClassName,
          )}
          style={{ ...iconStyle, ...item.iconStyle }}
        >
          {LeadingIcon}
        </span>
      )}

      <span className="min-w-0 flex-1">
        <span
          className={clsx(
            "block truncate",
            item.textClassName,
            textClassName,
          )}
          style={{ ...textStyle, ...item.textStyle }}
        >
          {label}
        </span>

        {item.description && (
          <span
            className={clsx(
              "mt-0.5 block truncate text-xs text-foreground/70",
              item.descriptionClassName,
            )}
            style={item.descriptionStyle}
          >
            {item.description}
          </span>
        )}
      </span>

      {item.badge && (
        <span
          className={clsx(
            "shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-foreground",
            item.badgeClassName,
            badgeClassName,
          )}
          style={{ ...badgeStyle, ...item.badgeStyle }}
        >
          {item.badge}
        </span>
      )}

      {item.shortcut && (
        <kbd
          className={clsx(
            "shrink-0 rounded border border-border bg-muted px-1.5 py-0.5 text-[11px] text-foreground/60",
            shortcutClassName,
          )}
          style={props.shortcutStyle}
        >
          {item.shortcut}
        </kbd>
      )}

      {item.trailing && (
        <span
          className={clsx("shrink-0 text-foreground/70", trailingClassName)}
          style={trailingStyle}
        >
          {item.trailing}
        </span>
      )}

      {isExternal && (
        <ExternalLink
          aria-hidden="true"
          className="h-3.5 w-3.5 shrink-0 text-foreground/60"
        />
      )}

      {hasChildren && collapsible && !item.trailing && (
        <span className="shrink-0 text-foreground/60">
          {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </span>
      )}
    </>
  );

  const contentClassName = clsx(
    "group/list-item flex min-w-0 items-center gap-2.5 transition-all",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    sizeClasses[size],
    paddingClasses[density][size],
    variantClasses[variant],
    itemActive && activeClasses[variant],
    item.danger && "text-foreground hover:bg-destructive/10",
    itemDisabled && "pointer-events-none opacity-50",
    isClickable && "cursor-pointer",
    !isClickable && "cursor-default",
    item.contentClassName,
    itemContentClassName,
  );

  const sharedElementProps = {
    title: item.title,
    "aria-label": item.ariaLabel,
    "aria-current": itemActive ? ("page" as const) : undefined,
    "aria-expanded": hasChildren && collapsible ? expanded : undefined,
    className: contentClassName,
    style: { ...itemContentStyle, ...item.contentStyle },
  };

  const defaultItem = (
    <>
      {item.href ? (
        <LinkComponent
          {...sharedElementProps}
          href={item.href}
          target={item.target}
          rel={shouldUseRel(item.target, item.rel)}
          download={item.download}
          onClick={handleSelect}
        >
          {content}
        </LinkComponent>
      ) : (
        <>
          {isClickable ? (
            <button
              {...sharedElementProps}
              type="button"
              disabled={itemDisabled}
              onClick={handleSelect}
            >
              {content}
            </button>
          ) : (
            <div {...sharedElementProps}>{content}</div>
          )}
        </>
      )}
    </>
  );

  return (
    <li
      role={item.role}
      className={clsx(
        "relative",
        showDividers && "border-b border-border last:border-b-0",
        showTree && depth > 0 && !isInline && "pl-4",
        isInline && "shrink-0",
        item.className,
        itemClassName,
      )}
      style={{ ...itemStyle, ...item.style }}
    >
      {showTree && depth > 0 && !isInline && (
        <>
          <span className="absolute left-1.5 top-0 h-full w-px bg-border" />
          <span className="absolute left-1.5 top-5 h-px w-3 bg-border" />
        </>
      )}

      {renderItem
        ? renderItem({
            item,
            index,
            depth,
            active: itemActive,
            expanded,
            disabled: itemDisabled,
            hasChildren,
            toggle,
            select: handleSelect,
          })
        : defaultItem}

      {hasChildren && !isInline && expanded && (
        <ul
          role="group"
          className={clsx(
            "mt-1 list-none space-y-1 pl-3",
            showTree && "pl-4",
            item.subListClassName,
            subListClassName,
          )}
          style={{ ...subListStyle, ...item.subListStyle }}
        >
          {children.map((child, childIndex) => (
            <ListItem
              key={getItemId(child, childIndex, depth + 1)}
              item={child}
              index={childIndex}
              depth={depth + 1}
              isOrdered={isOrdered}
              showTree={showTree}
              showBullets={showBullets}
              showDividers={showDividers}
              interactive={interactive}
              disabled={listDisabled}
              variant={variant}
              size={size}
              density={density}
              nestedMode={nestedMode}
              bulletVariant={bulletVariant}
              activeItemId={activeItemId}
              expandedIds={expandedIds}
              toggleExpanded={toggleExpanded}
              selectItem={selectItem}
              linkComponent={linkComponent}
              renderItem={renderItem}
              itemClassName={itemClassName}
              itemContentClassName={itemContentClassName}
              bulletClassName={bulletClassName}
              textClassName={textClassName}
              iconClassName={iconClassName}
              badgeClassName={badgeClassName}
              shortcutClassName={shortcutClassName}
              trailingClassName={trailingClassName}
              subListClassName={subListClassName}
              separatorClassName={separatorClassName}
              itemStyle={itemStyle}
              itemContentStyle={itemContentStyle}
              bulletStyle={bulletStyle}
              textStyle={textStyle}
              iconStyle={iconStyle}
              badgeStyle={badgeStyle}
              shortcutStyle={shortcutStyle}
              trailingStyle={trailingStyle}
              subListStyle={subListStyle}
              separatorStyle={separatorStyle}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export const List: React.FC<ListProps> = ({
  title,
  titleIcon,
  description,
  items,
  type = "unordered",
  variant = "default",
  size = "md",
  density = "normal",
  nestedMode = "collapse",
  bulletVariant = "dot",
  showTree = false,
  showBullets = false,
  showDividers = false,
  interactive = true,
  fullWidth = true,
  disabled = false,
  activeItemId,
  defaultActiveItemId,
  onActiveChange,
  expandedIds,
  defaultExpandedIds = [],
  onExpandedChange,
  role,
  ariaLabel,
  emptyState,
  linkComponent,
  renderItem,
  className,
  headerClassName,
  listClassName,
  itemClassName,
  itemContentClassName,
  titleClassName,
  descriptionClassName,
  bulletClassName,
  textClassName,
  iconClassName,
  badgeClassName,
  shortcutClassName,
  trailingClassName,
  subListClassName,
  separatorClassName,
  style,
  headerStyle,
  listStyle,
  itemStyle,
  itemContentStyle,
  titleStyle,
  descriptionStyle,
  bulletStyle,
  textStyle,
  iconStyle,
  badgeStyle,
  shortcutStyle,
  trailingStyle,
  subListStyle,
  separatorStyle,
}) => {
  const isOrdered = type === "ordered";
  const isInline = type === "inline";
  const ListTag = isOrdered ? "ol" : "ul";
  const [internalActiveId, setInternalActiveId] = useState<
    string | number | undefined
  >(defaultActiveItemId);
  const [internalExpandedIds, setInternalExpandedIds] = useState<
    Array<string | number>
  >(defaultExpandedIds);

  const resolvedActiveId = activeItemId ?? internalActiveId;
  const resolvedExpandedIds = expandedIds ?? internalExpandedIds;
  const expandedSet = useMemo(
    () => new Set<string | number>(resolvedExpandedIds),
    [resolvedExpandedIds],
  );

  const visibleItems = items.filter((item) => !item.hidden);

  const updateExpanded = (id: string | number) => {
    const next = expandedSet.has(id)
      ? resolvedExpandedIds.filter((expandedId) => expandedId !== id)
      : [...resolvedExpandedIds, id];

    if (!expandedIds) setInternalExpandedIds(next);
    onExpandedChange?.(next);
  };

  const selectItem = (id: string | number, item: ListItemType) => {
    if (activeItemId === undefined) setInternalActiveId(id);
    onActiveChange?.(id, item);
  };

  return (
    <div
      className={clsx(
        "text-foreground",
        fullWidth ? "w-full" : "inline-block",
        className,
      )}
      style={style}
    >
      {(title || description) && (
        <div
          className={clsx("mb-3 flex items-start gap-2", headerClassName)}
          style={headerStyle}
        >
          {titleIcon && (
            <span
              className={clsx(
                "mt-0.5 shrink-0 text-foreground/70",
                iconClassName,
              )}
              style={iconStyle}
            >
              {titleIcon}
            </span>
          )}

          <div className="min-w-0">
            {title && (
              <div
                className={clsx(
                  "truncate text-base font-semibold text-foreground",
                  titleClassName,
                )}
                style={titleStyle}
              >
                {title}
              </div>
            )}

            {description && (
              <p
                className={clsx(
                  "mt-0.5 text-sm text-foreground/70",
                  descriptionClassName,
                )}
                style={descriptionStyle}
              >
                {description}
              </p>
            )}
          </div>
        </div>
      )}

      {visibleItems.length === 0 ? (
        <div className="rounded-md border border-dashed border-border px-3 py-4 text-sm text-foreground/70">
          {emptyState ?? "No items to show."}
        </div>
      ) : (
        <ListTag
          role={role}
          aria-label={ariaLabel}
          className={clsx(
            isInline
              ? "flex list-none flex-wrap gap-2 p-0"
              : isOrdered
                ? "list-decimal space-y-1 pl-5"
                : "list-none space-y-1 p-0",
            variant === "menu" && "rounded-lg border border-border bg-popover p-1",
            variant === "card" && !isOrdered && !isInline && "space-y-2",
            listClassName,
          )}
          style={listStyle}
        >
          {visibleItems.map((item, index) => (
            <ListItem
              key={getItemId(item, index, 0)}
              item={item}
              index={index}
              depth={0}
              isInline={isInline}
              isOrdered={isOrdered}
              showTree={showTree}
              showBullets={showBullets}
              showDividers={showDividers}
              interactive={interactive}
              disabled={disabled}
              variant={variant}
              size={size}
              density={density}
              nestedMode={nestedMode}
              bulletVariant={bulletVariant}
              activeItemId={resolvedActiveId}
              expandedIds={expandedSet}
              toggleExpanded={updateExpanded}
              selectItem={selectItem}
              linkComponent={linkComponent}
              renderItem={renderItem}
              itemClassName={itemClassName}
              itemContentClassName={itemContentClassName}
              bulletClassName={bulletClassName}
              textClassName={textClassName}
              iconClassName={iconClassName}
              badgeClassName={badgeClassName}
              shortcutClassName={shortcutClassName}
              trailingClassName={trailingClassName}
              subListClassName={subListClassName}
              separatorClassName={separatorClassName}
              itemStyle={itemStyle}
              itemContentStyle={itemContentStyle}
              bulletStyle={bulletStyle}
              textStyle={textStyle}
              iconStyle={iconStyle}
              badgeStyle={badgeStyle}
              shortcutStyle={shortcutStyle}
              trailingStyle={trailingStyle}
              subListStyle={subListStyle}
              separatorStyle={separatorStyle}
            />
          ))}
        </ListTag>
      )}
    </div>
  );
};
