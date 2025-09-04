// components/ui/chart.tsx

"use client"

import * as React from "react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { cn } from "@/lib/utils"
import { TooltipProps } from "recharts"

type ChartConfig = {
  [key: string]: {
    label: string
    color?: string
  }
}

interface ChartProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

function Chart({ children, className, ...props }: ChartProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-lg border bg-background p-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function ChartContainer({
  children,
  config,
}: {
  children: React.ReactNode
  config: ChartConfig
}) {
  return (
    <div className="w-full h-[300px]">
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { config })
          : child
      )}
    </div>
  )
}

type ChartTooltipContentProps = TooltipProps<any, any> & {
  className?: string
  indicator?: "dot" | "line"
  hideLabel?: boolean
  hideIndicator?: boolean
}

function ChartTooltipContent({
  active,
  className,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  label,
  payload,
}: ChartTooltipContentProps) {
  if (!active || !payload?.length) {
    return null
  }

  return (
    <div
      className={cn(
        "rounded-lg border bg-background p-2 shadow-md",
        className
      )}
    >
      {!hideLabel && (
        <div className="mb-1 text-sm font-medium">{label}</div>
      )}
      {payload.map((item, index) => (
        <div key={index} className="flex items-center gap-2 text-sm">
          {!hideIndicator && indicator === "dot" && (
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: item.color }}
            />
          )}
          {!hideIndicator && indicator === "line" && (
            <span
              className="h-0.5 w-3"
              style={{ backgroundColor: item.color }}
            />
          )}
          <span>{item.name}:</span>
          <span className="font-medium">{item.value}</span>
        </div>
      ))}
    </div>
  )
}

function ChartTooltip(props: any) {
  return <Tooltip content={<ChartTooltipContent {...props} />} />
}

export {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  CartesianGrid,
  XAxis,
  YAxis,
}
