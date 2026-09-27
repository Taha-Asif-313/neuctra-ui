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
  /** Stable identifier used for active/expanded state tracking; falls back to a depth/index/text-derived key when omitted. */
  id?: string | number;
  /** Primary row label. */
  text?: ReactNode;
  /** Alternative to text for the primary row label (text takes precedence when both are set). */
  label?: ReactNode;
  /** Secondary text rendered under the label. */
  description?: ReactNode;
  /** Leading icon; used as a fallback when leading is not set. */
  icon?: ReactNode;
  /** Leading custom content, rendered before the label. Falls back to icon. */
  leading?: ReactNode;
  /** Custom content rendered after the label/badge/shortcut. */
  trailing?: ReactNode;
  /** Small badge rendered next to the label. */
  badge?: ReactNode;
  /** Keyboard shortcut hint rendered in a <kbd>. */
  shortcut?: ReactNode;

  /** Renders the row as a link to this URL. */
  href?: string;
  /** Anchor target for href rows, e.g. "_blank". */
  target?: React.HTMLAttributeAnchorTarget;
  /** Anchor rel attribute; defaults to "noreferrer" when target is "_blank". */
  rel?: string;
  /** Anchor download attribute for href rows. */
  download?: boolean | string;
  /** Click handler, called with the event and this item. */
  onClick?: (
    event: MouseEvent<HTMLElement>,
    item: ListItemType,
  ) => void;

  /** Nested child items rendered in a collapsible sub-list. */
  subItems?: ListItemType[];
  /** Alias for subItems. */
  items?: ListItemType[];
  /** Controlled expanded state for this item's sub-list. */
  expanded?: boolean;
  /** Initial expanded state for uncontrolled usage. */
  defaultExpanded?: boolean;
  /** Whether the sub-list can be toggled closed; defaults to true when the list's nestedMode is "collapse". */
  collapsible?: boolean;

  /** Marks the item as the active/selected row. */
  active?: boolean;
  /** Disables interaction with the item. */
  disabled?: boolean;
  /** Applies destructive styling, for actions like "Sign out" or "Delete". */
  danger?: boolean;
  /** Renders this entry as a horizontal divider instead of a row. */
  separator?: boolean;
  /** Excludes the item from rendering entirely. */
  hidden?: boolean;

  /** Native title attribute (tooltip) on the row element. */
  title?: string;
  /** Accessible label for the row element. */
  ariaLabel?: string;
  /** Role applied to the row's <li> element. */
  role?: string;

  /** Classes for the item's <li> wrapper. */
  className?: string;
  /** Classes for the item's clickable content element (link/button/div). */
  contentClassName?: string;
  /** Classes for this item's leading icon, merged with the list-level iconClassName. */
  iconClassName?: string;
  /** Classes for this item's label text, merged with the list-level textClassName. */
  textClassName?: string;
  /** Classes for this item's description text. */
  descriptionClassName?: string;
  /** Classes for this item's badge, merged with the list-level badgeClassName. */
  badgeClassName?: string;
  /** Classes for this item's nested <ul>, merged with the list-level subListClassName. */
  subListClassName?: string;

  /** Inline styles for the item's <li> wrapper. */
  style?: CSSProperties;
  /** Inline styles for the item's clickable content element. */
  contentStyle?: CSSProperties;
  /** Inline styles for this item's leading icon, merged with the list-level iconStyle. */
  iconStyle?: CSSProperties;
  /** Inline styles for this item's label text, merged with the list-level textStyle. */
  textStyle?: CSSProperties;
  /** Inline styles for this item's description text. */
  descriptionStyle?: CSSProperties;
  /** Inline styles for this item's badge, merged with the list-level badgeStyle. */
  badgeStyle?: CSSProperties;
  /** Inline styles for this item's nested <ul>, merged with the list-level subListStyle. */
  subListStyle?: CSSProperties;
}

export interface ListRenderItemParams {
  /** The item being rendered. */
  item: ListItemType;
  /** Index among its siblings. */
  index: number;
  /** Nesting depth, 0 for top-level items. */
  depth: number;
  /** Whether this item is the active/selected one. */
  active: boolean;
  /** Whether this item's sub-list is currently expanded. */
  expanded: boolean;
  /** Whether this item is disabled (own disabled flag or inherited from the list). */
  disabled: boolean;
  /** Whether this item has nested subItems/items. */
  hasChildren: boolean;
  /** Toggles this item's sub-list open/closed. */
  toggle: () => void;
  /** Selects this item, firing onClick and active/expand state updates as if it were clicked. */
  select: (event: MouseEvent<HTMLElement>) => void;
}

export interface ListProps {
  /** Optional heading rendered above the list. */
  title?: ReactNode;
  /** Icon rendered before the title. */
  titleIcon?: ReactNode;
  /** Supporting text rendered under the title. */
  description?: ReactNode;
  /** The data source for rows, including any nested rows. */
  items: ListItemType[];

  /** Controls the root element and layout: "unordered"/"ordered" render a ul/ol, "inline" lays items out horizontally. */
  type?: ListType;
  /** Visual style applied to each row. */
  variant?: ListVariant;
  /** Controls row text size. */
  size?: ListSize;
  /** Controls row padding. */
  density?: ListDensity;
  /** Whether nested sub-lists are always expanded or start collapsed and can be toggled. */
  nestedMode?: NestedMode;
  /** Marker style shown when showBullets is enabled and a row has no icon. */
  bulletVariant?: BulletVariant;

  /** Shows hierarchy connector lines for nested items. */
  showTree?: boolean;
  /** Shows bullet markers on rows that have no icon. */
  showBullets?: boolean;
  /** Adds divider borders between rows. */
  showDividers?: boolean;
  /** Enables clickable/keyboard-focusable row behavior for rows with an href, onClick, or children. */
  interactive?: boolean;
  /** Makes the root element fill the available width instead of sizing to content. */
  fullWidth?: boolean;
  /** Disables every item in the list. */
  disabled?: boolean;

  /** Controlled id of the active item. */
  activeItemId?: string | number;
  /** Initial active item id for uncontrolled usage. */
  defaultActiveItemId?: string | number;
  /** Called with the id and item whenever a selectable row is activated. */
  onActiveChange?: (id: string | number, item: ListItemType) => void;

  /** Controlled set of expanded sub-list ids. */
  expandedIds?: Array<string | number>;
  /** Initial expanded sub-list ids for uncontrolled usage. */
  defaultExpandedIds?: Array<string | number>;
  /** Called with the full list of expanded ids whenever a sub-list is toggled. */
  onExpandedChange?: (ids: Array<string | number>) => void;

  /** Role applied to the root ul/ol element. */
  role?: string;
  /** Accessible label for the root ul/ol element. */
  ariaLabel?: string;
  /** Content shown instead of the list when items (after filtering hidden ones) is empty. Defaults to "No items to show." */
  emptyState?: ReactNode;
  /** Component used to render href items, e.g. a router's Link. Defaults to a plain "a". */
  linkComponent?: ElementType;
  /** Fully custom row renderer, replacing the default markup for every item. */
  renderItem?: (params: ListRenderItemParams) => ReactNode;

  /** Classes for the root wrapper element. */
  className?: string;
  /** Classes for the title/description header wrapper. */
  headerClassName?: string;
  /** Classes for the root ul/ol element. */
  listClassName?: string;
  /** Classes for each item's <li> wrapper. */
  itemClassName?: string;
  /** Classes for each item's clickable content element. */
  itemContentClassName?: string;
  /** Classes for the list heading text. */
  titleClassName?: string;
  /** Classes for the list heading's description text. */
  descriptionClassName?: string;
  /** Classes for the bullet marker shown via showBullets. */
  bulletClassName?: string;
  /** Classes for each item's label text. */
  textClassName?: string;
  /** Classes for the title icon and each item's leading icon. */
  iconClassName?: string;
  /** Classes for each item's badge. */
  badgeClassName?: string;
  /** Classes for each item's shortcut <kbd>. */
  shortcutClassName?: string;
  /** Classes for each item's trailing content. */
  trailingClassName?: string;
  /** Classes for nested <ul> sub-lists. */
  subListClassName?: string;
  /** Classes for separator rows. */
  separatorClassName?: string;
  /** Classes for the expand/collapse chevron icon. */
  chevronClassName?: string;
  /** Classes for the external-link icon shown on target="_blank" items. */
  externalIconClassName?: string;
  /** Classes for the empty-state container. */
  emptyStateClassName?: string;

  /** Inline styles for the root wrapper element. */
  style?: CSSProperties;
  /** Inline styles for the title/description header wrapper. */
  headerStyle?: CSSProperties;
  /** Inline styles for the root ul/ol element. */
  listStyle?: CSSProperties;
  /** Inline styles for each item's <li> wrapper. */
  itemStyle?: CSSProperties;
  /** Inline styles for each item's clickable content element. */
  itemContentStyle?: CSSProperties;
  /** Inline styles for the list heading text. */
  titleStyle?: CSSProperties;
  /** Inline styles for the list heading's description text. */
  descriptionStyle?: CSSProperties;
  /** Inline styles for the bullet marker shown via showBullets. */
  bulletStyle?: CSSProperties;
  /** Inline styles for each item's label text. */
  textStyle?: CSSProperties;
  /** Inline styles for the title icon and each item's leading icon. */
  iconStyle?: CSSProperties;
  /** Inline styles for each item's badge. */
  badgeStyle?: CSSProperties;
  /** Inline styles for each item's shortcut <kbd>. */
  shortcutStyle?: CSSProperties;
  /** Inline styles for each item's trailing content. */
  trailingStyle?: CSSProperties;
  /** Inline styles for nested <ul> sub-lists. */
  subListStyle?: CSSProperties;
  /** Inline styles for separator rows. */
  separatorStyle?: CSSProperties;
}

/**
 * Props for the standalone ListItem component — the same row renderer List uses
 * internally for each entry, exposed for cases where you want to render a single
 * row (or build a custom list) outside of the List component itself.
 */
export interface ListItemProps {
  /** The item data to render. When omitted, falls back to the individual ListItemType fields passed directly as props. */
  item?: ListItemType;
  /** Index among its siblings; used for numbered bullets and default id generation. */
  index?: number;
  /** Nesting depth, 0 for top-level items; controls tree indentation. */
  depth?: number;
  /** Renders as a shrink-to-fit inline entry instead of a block row. */
  isInline?: boolean;
  /** Whether the parent list is an ordered (ol) list. */
  isOrdered?: boolean;
  /** Shows hierarchy connector lines for nested items. */
  showTree?: boolean;
  /** Shows a bullet marker when the item has no icon. */
  showBullets?: boolean;
  /** Adds a divider border below the item. */
  showDividers?: boolean;
  /** Enables clickable/keyboard-focusable behavior for rows with an href, onClick, or children. */
  interactive?: boolean;
  /** Disables the item (inherited from the parent list's disabled prop). */
  disabled?: boolean;
  /** Visual style applied to the row. */
  variant?: ListVariant;
  /** Row text size. */
  size?: ListSize;
  /** Row padding. */
  density?: ListDensity;
  /** Whether nested sub-lists are always expanded or collapsible. */
  nestedMode?: NestedMode;
  /** Marker style shown when showBullets is enabled. */
  bulletVariant?: BulletVariant;
  /** Id of the currently active item, compared against this item's resolved id. */
  activeItemId?: string | number;
  /** Set of currently expanded item ids. */
  expandedIds?: Set<string | number>;
  /** Called to toggle this item's sub-list open/closed. */
  toggleExpanded?: (id: string | number, item: ListItemType) => void;
  /** Called to mark this item as the active/selected one. */
  selectItem?: (id: string | number, item: ListItemType) => void;
  /** Component used to render href items, e.g. a router's Link. Defaults to a plain "a". */
  linkComponent?: ElementType;
  /** Fully custom renderer replacing this item's default markup. */
  renderItem?: (params: ListRenderItemParams) => ReactNode;

  /** Classes for the item's <li> wrapper. */
  itemClassName?: string;
  /** Classes for the item's clickable content element. */
  itemContentClassName?: string;
  /** Classes for the bullet marker. */
  bulletClassName?: string;
  /** Classes for the item's label text. */
  textClassName?: string;
  /** Classes for the item's leading icon. */
  iconClassName?: string;
  /** Classes for the item's badge. */
  badgeClassName?: string;
  /** Classes for the item's shortcut <kbd>. */
  shortcutClassName?: string;
  /** Classes for the item's trailing content. */
  trailingClassName?: string;
  /** Classes for the nested <ul> sub-list. */
  subListClassName?: string;
  /** Classes for the separator row. */
  separatorClassName?: string;
  /** Classes for the expand/collapse chevron icon. */
  chevronClassName?: string;
  /** Classes for the external-link icon shown on target="_blank" items. */
  externalIconClassName?: string;

  /** Inline styles for the item's <li> wrapper. */
  itemStyle?: CSSProperties;
  /** Inline styles for the item's clickable content element. */
  itemContentStyle?: CSSProperties;
  /** Inline styles for the bullet marker. */
  bulletStyle?: CSSProperties;
  /** Inline styles for the item's label text. */
  textStyle?: CSSProperties;
  /** Inline styles for the item's leading icon. */
  iconStyle?: CSSProperties;
  /** Inline styles for the item's badge. */
  badgeStyle?: CSSProperties;
  /** Inline styles for the item's shortcut <kbd>. */
  shortcutStyle?: CSSProperties;
  /** Inline styles for the item's trailing content. */
  trailingStyle?: CSSProperties;
  /** Inline styles for the nested <ul> sub-list. */
  subListStyle?: CSSProperties;
  /** Inline styles for the separator row. */
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
    chevronClassName,
    externalIconClassName,
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
          className={clsx("h-3.5 w-3.5 shrink-0 text-foreground/60", externalIconClassName)}
        />
      )}

      {hasChildren && collapsible && !item.trailing && (
        <span className={clsx("shrink-0 text-foreground/60", chevronClassName)}>
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
              chevronClassName={chevronClassName}
              externalIconClassName={externalIconClassName}
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
  chevronClassName,
  externalIconClassName,
  emptyStateClassName,
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
        <div
          className={clsx(
            "rounded-md border border-dashed border-border px-3 py-4 text-sm text-foreground/70",
            emptyStateClassName,
          )}
        >
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
              chevronClassName={chevronClassName}
              externalIconClassName={externalIconClassName}
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
