"use client";

import React, { forwardRef } from "react";
import { TriangleAlert } from "lucide-react";
import { cn } from "../../lib/cn";
import { Button } from "./Button";
import { Card, CardBody } from "./Card";
import { EmptyState } from "./EmptyState";

export interface ErrorBoundaryProps {
  /** Content to protect; any render error is caught by this boundary. */
  children: React.ReactNode;
  /** Custom error UI: a node, or a function given the caught error and a callback that clears it. */
  fallback?: React.ReactNode | ((error: Error, reset: () => void) => React.ReactNode);
  /** Called with the error and React component stack when an error is caught. */
  onError?: (error: Error, info: React.ErrorInfo) => void;
  /** Called after the boundary is reset, by the retry button, `reset()` or `resetKeys`. */
  onReset?: () => void;
  /** When any value in this array changes, a caught error is cleared automatically. */
  resetKeys?: unknown[];
  /** Heading of the default fallback. */
  title?: React.ReactNode;
  /** Body text of the default fallback. */
  description?: React.ReactNode;
  /** Label of the default fallback's retry button. */
  retryLabel?: React.ReactNode;
  /** Shows the error message under the description in the default fallback (useful in development). */
  showDetails?: boolean;
  /** Styles the wrapper around `children` or the fallback. */
  className?: string;
  /** Inline styles for the wrapper around `children` or the fallback. */
  style?: React.CSSProperties;
  /** Styles the default fallback panel. */
  fallbackClassName?: string;
}

interface ErrorBoundaryState {
  error: Error | null;
}

interface ErrorBoundaryInnerProps extends ErrorBoundaryProps {
  /** Ref forwarded from the public `ErrorBoundary` wrapper. */
  innerRef?: React.Ref<HTMLDivElement>;
}

function keysChanged(a: unknown[] = [], b: unknown[] = []) {
  return a.length !== b.length || a.some((value, index) => !Object.is(value, b[index]));
}

// `throw "oops"` is legal JS; normalize so fallbacks can always read `.message`.
function toError(value: unknown): Error {
  if (value instanceof Error) return value;
  return new Error(typeof value === "string" ? value : "Unknown error");
}

class ErrorBoundaryInner extends React.Component<ErrorBoundaryInnerProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    return { error: toError(error) };
  }

  componentDidCatch(error: unknown, info: React.ErrorInfo) {
    this.props.onError?.(toError(error), info);
  }

  componentDidUpdate(prevProps: ErrorBoundaryInnerProps, prevState: ErrorBoundaryState) {
    // Ignore the update that set the error, otherwise keys that change on the
    // same render as the throw would immediately clear it again.
    if (
      this.state.error &&
      prevState.error !== null &&
      keysChanged(prevProps.resetKeys, this.props.resetKeys)
    ) {
      this.reset();
    }
  }

  private reset = () => {
    this.setState({ error: null });
    this.props.onReset?.();
  };

  render() {
    const {
      children,
      fallback,
      title = "Something went wrong",
      description = "An unexpected error occurred. You can try again.",
      retryLabel = "Try again",
      showDetails = false,
      className,
      style,
      fallbackClassName,
      innerRef,
    } = this.props;
    const { error } = this.state;

    let content: React.ReactNode = children;
    if (error) {
      if (typeof fallback === "function") content = fallback(error, this.reset);
      else if (fallback !== undefined) content = fallback;
      else
        content = (
          <Card role="alert" padding="sm" className={cn("w-full", fallbackClassName)}>
            <CardBody className="flex flex-col items-center justify-center">
              <EmptyState
                size="sm"
                icon={<TriangleAlert />}
                title={title}
                description={description}
                iconClassName="bg-destructive/10 text-destructive"
                action={
                  <Button variant="outline" size="sm" onClick={this.reset}>
                    {retryLabel}
                  </Button>
                }
              />
              {showDetails && error.message && (
                <pre className="mb-4 max-w-full overflow-x-auto rounded-lg bg-muted px-3 py-2 font-mono text-xs text-muted-foreground">
                  {error.message}
                </pre>
              )}
            </CardBody>
          </Card>
        );
    }

    return (
      <div ref={innerRef} className={className} style={style}>
        {content}
      </div>
    );
  }
}

/** Catches render errors in its subtree and shows a themed fallback UI. */
export const ErrorBoundary = forwardRef<HTMLDivElement, ErrorBoundaryProps>(
  function ErrorBoundary(props, ref) {
    return <ErrorBoundaryInner {...props} innerRef={ref} />;
  },
);

ErrorBoundary.displayName = "ErrorBoundary";
