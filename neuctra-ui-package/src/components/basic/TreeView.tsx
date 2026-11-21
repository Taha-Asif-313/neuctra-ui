"use client";

import React, { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "../../lib/cn";
import { useControllableState } from "../../lib/useControllableState";

/** A single node in a TreeView hierarchy. */
export interface TreeNode {
  /** Stable, unique key used for expansion and selection. */
  id: string;
  /** Visible node label. */
  label: React.ReactNode;
  /** Nested child nodes. */
  children?: TreeNode[];
  /** Optional leading icon. */
  icon?: React.ReactNode;
  /** Prevents selecting, expanding and focusing the node. */
  disabled?: boolean;
}

export interface TreeViewProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Root nodes of the tree. */
  nodes: TreeNode[];
  /** Controlled set of expanded node ids. */
  expandedIds?: string[];
  /** Initially expanded ids in uncontrolled mode. */
  defaultExpandedIds?: string[];
  /** Called with the next expanded id array. */
  onExpandedIdsChange?: (ids: string[]) => void;
  /** Controlled selected node id; use null for no selection. */
  selectedId?: string | null;
  /** Initially selected id in uncontrolled mode. */
  defaultSelectedId?: string | null;
  /** Called with the newly selected id. */
  onSelectedChange?: (id: string | null) => void;
  /** Allows row selection. Defaults to true. */
  selectable?: boolean;
  /** Row density and text scale. */
  size?: "sm" | "md";
  /** Draws vertical guide lines for nested levels. */
  showGuides?: boolean;
  /** Text shown when `nodes` is empty. */
  emptyText?: React.ReactNode;
  /** Accessible label for the tree. */
  ariaLabel?: string;
  /** Additional classes for the tree container. */
  className?: string;
  /** Inline styles for the tree container. */
  style?: React.CSSProperties;
  /** Styles every row. */
  itemClassName?: string;
  /** Styles the selected row (applied after `itemClassName`). */
  selectedItemClassName?: string;
  /** Styles node icon wrappers. */
  iconClassName?: string;
  /** Styles node labels. */
  labelClassName?: string;
  /** Styles the expand chevron. */
  chevronClassName?: string;
}

interface FlatNode {
  node: TreeNode;
  level: number;
  parentId: string | null;
  setSize: number;
  posInSet: number;
}

function flatten(
  nodes: TreeNode[],
  expanded: Set<string>,
  level = 0,
  parentId: string | null = null,
): FlatNode[] {
  const result: FlatNode[] = [];
  nodes.forEach((node, index) => {
    result.push({
      node,
      level,
      parentId,
      setSize: nodes.length,
      posInSet: index + 1,
    });
    if (node.children?.length && expanded.has(node.id)) {
      result.push(...flatten(node.children, expanded, level + 1, node.id));
    }
  });
  return result;
}

const sizeConfig = {
  sm: { row: "min-h-7 py-1 text-xs", indent: 14, chevron: "h-3 w-3", icon: "[&_svg]:h-3.5 [&_svg]:w-3.5" },
  md: { row: "min-h-8 py-1.5 text-sm", indent: 18, chevron: "h-3.5 w-3.5", icon: "[&_svg]:h-4 [&_svg]:w-4" },
} as const;

const textOf = (label: React.ReactNode) =>
  typeof label === "string" || typeof label === "number" ? String(label) : "";

export const TreeView = forwardRef<HTMLDivElement, TreeViewProps>(
  function TreeView(
    {
      nodes,
      expandedIds,
      defaultExpandedIds = [],
      onExpandedIdsChange,
      selectedId,
      defaultSelectedId = null,
      onSelectedChange,
      selectable = true,
      size = "md",
      showGuides = false,
      emptyText = "No items.",
      ariaLabel = "Tree view",
      className,
      style,
      itemClassName,
      selectedItemClassName,
      iconClassName,
      labelClassName,
      chevronClassName,
      ...rest
    },
    ref,
  ) {
    const sizes = sizeConfig[size] ?? sizeConfig.md;
    const [expanded, setExpanded] = useControllableState<string[]>({
      value: expandedIds,
      defaultValue: defaultExpandedIds,
      onChange: onExpandedIdsChange,
    });
    const [selected, setSelected] = useControllableState<string | null>({
      value: selectedId,
      defaultValue: defaultSelectedId,
      onChange: onSelectedChange,
    });
    const [focusedId, setFocusedId] = useState<string | null>(
      () => selected ?? nodes[0]?.id ?? null,
    );
    const rowRefs = useRef(new Map<string, HTMLDivElement>());
    const typeahead = useRef({ buffer: "", timer: 0 as ReturnType<typeof setTimeout> | 0 });

    const expandedSet = useMemo(() => new Set(expanded), [expanded]);
    const visible = useMemo(
      () => flatten(nodes, expandedSet),
      [nodes, expandedSet],
    );

    // Keep exactly one tabbable row: fall back when the focused row vanishes.
    useEffect(() => {
      if (
        focusedId &&
        visible.some((row) => row.node.id === focusedId && !row.node.disabled)
      )
        return;
      const fallback =
        visible.find((row) => row.node.id === selected && !row.node.disabled) ??
        visible.find((row) => !row.node.disabled);
      setFocusedId(fallback?.node.id ?? null);
    }, [focusedId, visible, selected]);

    useEffect(() => () => {
      if (typeahead.current.timer) clearTimeout(typeahead.current.timer);
    }, []);

    const focusRow = (id: string) => {
      setFocusedId(id);
      rowRefs.current.get(id)?.focus();
    };

    const toggleExpand = (id: string) => {
      setExpanded((current) =>
        current.includes(id)
          ? current.filter((value) => value !== id)
          : [...current, id],
      );
    };

    const activate = (row: FlatNode) => {
      if (row.node.disabled) return;
      const hasChildren = Boolean(row.node.children?.length);
      if (selectable) setSelected(row.node.id);
      else if (hasChildren) toggleExpand(row.node.id);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      const currentId =
        (event.target as HTMLElement).closest<HTMLElement>("[data-tree-id]")
          ?.dataset.treeId ?? focusedId;
      const index = visible.findIndex((row) => row.node.id === currentId);
      if (index < 0 || !currentId) return;
      const current = visible[index];
      const hasChildren = Boolean(current.node.children?.length);
      const isExpanded = expandedSet.has(currentId);
      const enabled = (row: FlatNode) => !row.node.disabled;

      switch (event.key) {
        case "ArrowDown": {
          const next = visible.slice(index + 1).find(enabled);
          if (next) focusRow(next.node.id);
          break;
        }
        case "ArrowUp": {
          const previous = visible.slice(0, index).reverse().find(enabled);
          if (previous) focusRow(previous.node.id);
          break;
        }
        case "Home": {
          const first = visible.find(enabled);
          if (first) focusRow(first.node.id);
          break;
        }
        case "End": {
          const last = visible.slice().reverse().find(enabled);
          if (last) focusRow(last.node.id);
          break;
        }
        case "ArrowRight": {
          if (hasChildren && !isExpanded) toggleExpand(currentId);
          else if (hasChildren) {
            const child = visible[index + 1];
            if (child && child.parentId === currentId && enabled(child))
              focusRow(child.node.id);
          }
          break;
        }
        case "ArrowLeft": {
          if (hasChildren && isExpanded) toggleExpand(currentId);
          else if (current.parentId) focusRow(current.parentId);
          break;
        }
        case "Enter":
        case " ": {
          activate(current);
          break;
        }
        case "*": {
          // Expand every sibling of the focused node.
          const siblings = visible
            .filter(
              (row) =>
                row.parentId === current.parentId &&
                row.node.children?.length &&
                !row.node.disabled,
            )
            .map((row) => row.node.id);
          setExpanded((ids) => Array.from(new Set([...ids, ...siblings])));
          break;
        }
        default: {
          if (
            event.key.length === 1 &&
            !event.ctrlKey &&
            !event.metaKey &&
            !event.altKey
          ) {
            const state = typeahead.current;
            if (state.timer) clearTimeout(state.timer);
            state.buffer += event.key.toLowerCase();
            state.timer = setTimeout(() => {
              state.buffer = "";
              state.timer = 0;
            }, 500);
            const ordered = [
              ...visible.slice(index + 1),
              ...visible.slice(0, index + 1),
            ];
            const match = ordered.find(
              (row) =>
                enabled(row) &&
                textOf(row.node.label).toLowerCase().startsWith(state.buffer),
            );
            if (match) focusRow(match.node.id);
            break;
          }
          return;
        }
      }
      event.preventDefault();
    };

    return (
      <div
        ref={ref}
        role="tree"
        aria-label={ariaLabel}
        onKeyDown={handleKeyDown}
        style={style}
        className={cn(
          "w-full rounded-xl border border-border bg-card p-1.5 text-card-foreground",
          className,
        )}
        {...rest}
      >
        {visible.length === 0 && (
          <p className="px-2 py-4 text-center text-sm text-muted-foreground">
            {emptyText}
          </p>
        )}

        {visible.map((row) => {
          const { node, level, setSize, posInSet } = row;
          const hasChildren = Boolean(node.children?.length);
          const isExpanded = expandedSet.has(node.id);
          const isSelected = selectable && selected === node.id;
          const isFocused = focusedId === node.id;

          return (
            <div
              key={node.id}
              ref={(element) => {
                if (element) rowRefs.current.set(node.id, element);
                else rowRefs.current.delete(node.id);
              }}
              role="treeitem"
              data-tree-id={node.id}
              tabIndex={isFocused && !node.disabled ? 0 : -1}
              aria-level={level + 1}
              aria-setsize={setSize}
              aria-posinset={posInSet}
              aria-expanded={hasChildren ? isExpanded : undefined}
              aria-selected={selectable ? isSelected : undefined}
              aria-disabled={node.disabled || undefined}
              onFocus={(event) => {
                if (event.target === event.currentTarget) setFocusedId(node.id);
              }}
              onClick={() => {
                if (node.disabled) return;
                setFocusedId(node.id);
                activate(row);
              }}
              className={cn(
                "relative flex cursor-pointer select-none items-center gap-1.5 rounded-lg pr-2 transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
                sizes.row,
                isSelected
                  ? "bg-primary/10 font-medium text-primary"
                  : "text-foreground hover:bg-accent hover:text-accent-foreground",
                node.disabled &&
                  "cursor-not-allowed opacity-50 hover:bg-transparent hover:text-foreground",
                itemClassName,
                isSelected && selectedItemClassName,
              )}
              style={{ paddingLeft: level * sizes.indent + 4 }}
            >
              {showGuides &&
                Array.from({ length: level }, (_, depth) => (
                  <span
                    key={depth}
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 w-px bg-border"
                    style={{ left: depth * sizes.indent + 16 }}
                  />
                ))}

              {hasChildren ? (
                <span
                  aria-hidden="true"
                  onClick={(event) => {
                    event.stopPropagation();
                    if (node.disabled) return;
                    setFocusedId(node.id);
                    toggleExpand(node.id);
                  }}
                  className={cn(
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors",
                    !node.disabled && "hover:bg-accent hover:text-foreground",
                  )}
                >
                  <ChevronRight
                    className={cn(
                      sizes.chevron,
                      "transition-transform duration-150 motion-reduce:transition-none",
                      isExpanded && "rotate-90",
                      chevronClassName,
                    )}
                  />
                </span>
              ) : (
                <span aria-hidden="true" className="w-6 shrink-0" />
              )}

              {node.icon && (
                <span
                  aria-hidden="true"
                  className={cn(
                    "inline-flex shrink-0",
                    isSelected ? "text-primary" : "text-muted-foreground",
                    sizes.icon,
                    iconClassName,
                  )}
                >
                  {node.icon}
                </span>
              )}
              <span className={cn("min-w-0 flex-1 truncate", labelClassName)}>
                {node.label}
              </span>
            </div>
          );
        })}
      </div>
    );
  },
);

TreeView.displayName = "TreeView";
