"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, TooltipProps } from "recharts"
import {
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle
} from "@/components/ui/card"
import {
  ChartConfig, 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent
} from "@/components/ui/chart"
import { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent'

interface HistoricalDataPoint {
  timestamp: string;
  value: number;
}

interface HistoryChartProps {
  data: HistoricalDataPoint[];
  assetTicker: string;
  height?: string; // e.g., "250px"
}

export function HistoryChart({ data, assetTicker, height = "200px" }: HistoryChartProps) {
  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Performance History: {assetTicker}</CardTitle>
        </CardHeader>
        <CardContent style={{ height }}>
          <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
            No performance data available.
          </div>
        </CardContent>
      </Card>
    );
  }

  const transformedData = data.map(item => ({
    date: new Date(item.timestamp).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' }),
    value: item.value,
  }));

  const chartConfig = {
    performance: {
      label: assetTicker,
      // color: "hsl(var(--chart-1))", // Temporarily commented out
      color: "#8884d8", // TEMPORARY: Direct color for testing
    },
  } satisfies ChartConfig;

  // Custom Tooltip Content
  const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 text-xs bg-background border rounded-md shadow-lg">
          <p className="font-medium">{`Date: ${label}`}</p>
          {/* <p style={{ color: chartConfig.performance.color }}> // Use direct color for tooltip too for consistency in test */}
          <p style={{ color: "#8884d8" }}>
            {`${assetTicker} Value: ${payload[0].value?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Performance: {assetTicker}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[var(--chart-height)] w-full" style={{ '--chart-height': height } as React.CSSProperties}>
          <LineChart
            accessibilityLayer
            data={transformedData}
            margin={{
              top: 5,
              right: 20, 
              left: -10, // Adjust to pull y-axis labels closer if needed
              bottom: 5,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={10}
            />
            <YAxis 
              tickLine={false}
              axisLine={false}
              fontSize={10}
              tickFormatter={(value) => value.toLocaleString(undefined, { 
                minimumFractionDigits: 0, // No decimals for whole numbers like balances
                maximumFractionDigits: 0  // Allow up to 2 decimals if the input values have them
              })}
              domain={['dataMin - (dataMin * 0.02)', 'dataMax + (dataMax * 0.02)']} 
              tickCount={5} 
            />
            <ChartTooltip 
              cursor={true} 
              content={<CustomTooltip />} 
            />
            <Line
              dataKey="value"
              type="monotone" // Or "natural" or other types
              // stroke="var(--color-performance)" // Temporarily commented out
              stroke="#8884d8" // TEMPORARY: Direct color for testing
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      {/* Footer removed for cleaner embedding */}
    </Card>
  )
}
