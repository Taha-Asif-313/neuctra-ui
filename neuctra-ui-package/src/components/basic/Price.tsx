"use client";

import React, { forwardRef } from "react";

import { cn } from "../../lib/cn";
import { Badge } from "./Badge";
import { Card, CardBody } from "./Card";

export interface PriceProps {
  /** Numeric amount in the major currency unit, e.g. `19.99`. */
  value: number;
  /** ISO 4217 currency code. Defaults to "USD". */
  currency?: string;
  /** Original amount; renders a struck-through comparison price when higher than `value`. */
  compareAt?: number;
  /** Shows a compact "Save ..." badge when `compareAt` is higher than `value`. */
  showSavings?: boolean;
  /** Whether the savings badge shows the amount saved or the percentage off. */
  savingsFormat?: "amount" | "percent";
  /** BCP 47 locale used for number formatting. Defaults to "en-US". */
  locale?: string;
  /** Fixed number of fraction digits; defaults to the currency's standard digits. */
  fractionDigits?: number;
  /** Billing period shown after the amount, e.g. "/mo". */
  period?: React.ReactNode;
  /** Optional installment text, e.g. "or 4 payments of $12.50". */
  installment?: React.ReactNode;
  /** Text size preset for the main amount. */
  size?: "sm" | "md" | "lg";
  /** Additional classes for the root element. */
  className?: string;
  /** Inline styles for the root element. */
  style?: React.CSSProperties;
  /** Styles the main amount. */
  amountClassName?: string;
  /** Styles the struck-through comparison amount. */
  compareAtClassName?: string;
  /** Styles the savings badge. */
  savingsClassName?: string;
  /** Styles the billing period text. */
  periodClassName?: string;
  /** Styles the installment line. */
  installmentClassName?: string;
}

const sizeConfig = {
  sm: { amount: "text-base", compare: "text-xs", period: "text-xs" },
  md: { amount: "text-2xl", compare: "text-sm", period: "text-sm" },
  lg: { amount: "text-4xl", compare: "text-base", period: "text-base" },
} as const;

function formatAmount(
  value: number,
  currency: string,
  locale: string,
  fractionDigits?: number,
) {
  const digits =
    fractionDigits === undefined
      ? {}
      : { minimumFractionDigits: fractionDigits, maximumFractionDigits: fractionDigits };
  try {
    return new Intl.NumberFormat(locale, { style: "currency", currency, ...digits }).format(value);
  } catch {
    // An invalid currency code or locale throws a RangeError; fall back to a
    // plain number so a bad prop can't crash the page.
    return `${value.toFixed(fractionDigits ?? 2)} ${currency}`;
  }
}

export const Price = forwardRef<HTMLDivElement, PriceProps>(function Price(
  {
    value,
    currency = "USD",
    compareAt,
    showSavings = false,
    savingsFormat = "amount",
    locale = "en-US",
    fractionDigits,
    period,
    installment,
    size = "md",
    className,
    style,
    amountClassName,
    compareAtClassName,
    savingsClassName,
    periodClassName,
    installmentClassName,
  },
  ref,
) {
  const sizes = sizeConfig[size] ?? sizeConfig.md;
  const original =
    typeof compareAt === "number" && compareAt > value ? compareAt : null;
  const savings = original !== null ? original - value : 0;
  const savingsText =
    savingsFormat === "percent" && original
      ? `${Math.round((savings / original) * 100)}%`
      : formatAmount(savings, currency, locale, fractionDigits);

  return (
    <div
      ref={ref}
      className={cn("flex flex-wrap items-baseline gap-x-2 gap-y-1", className)}
      style={style}
    >
      <span className="inline-flex items-baseline gap-0.5 whitespace-nowrap">
        {original !== null && <span className="sr-only">Current price:</span>}
        <span
          className={cn(
            "font-semibold tabular-nums tracking-tight text-foreground",
            sizes.amount,
            amountClassName,
          )}
        >
          {formatAmount(value, currency, locale, fractionDigits)}
        </span>
        {period && (
          <span className={cn("text-muted-foreground", sizes.period, periodClassName)}>
            {period}
          </span>
        )}
      </span>

      {original !== null && (
        <s
          className={cn(
            "whitespace-nowrap tabular-nums text-muted-foreground",
            sizes.compare,
            compareAtClassName,
          )}
        >
          <span className="sr-only">Original price:</span>
          {formatAmount(original, currency, locale, fractionDigits)}
        </s>
      )}

      {original !== null && showSavings && (
        <Badge
          variant="soft"
          size="sm"
          text={`Save ${savingsText}`}
          className={cn(
            "self-center whitespace-nowrap bg-success/10 px-2 text-xs text-success",
            savingsClassName,
          )}
        />
      )}

      {installment && (
        <span className={cn("w-full text-xs text-muted-foreground", installmentClassName)}>
          {installment}
        </span>
      )}
    </div>
  );
});
Price.displayName = "Price";

export interface PriceTagProps extends PriceProps {
  /** Optional caption shown above the amount, e.g. "Sale price". */
  label?: React.ReactNode;
  /** Styles the caption. */
  labelClassName?: string;
  /** Styles the inner `Price` root. */
  priceClassName?: string;
}

/** A `Price` inside a compact bordered card surface with an optional caption. */
export const PriceTag = forwardRef<HTMLDivElement, PriceTagProps>(
  function PriceTag(
    { label, labelClassName, priceClassName, className, style, ...rest },
    ref,
  ) {
    return (
      <Card
        ref={ref}
        padding="sm"
        className={cn("inline-flex max-w-full flex-col", className)}
        style={style}
      >
        <CardBody className="flex flex-col gap-1">
          {label && (
            <span className={cn("text-xs font-medium text-muted-foreground", labelClassName)}>
              {label}
            </span>
          )}
          <Price {...rest} className={priceClassName} />
        </CardBody>
      </Card>
    );
  },
);
PriceTag.displayName = "PriceTag";
