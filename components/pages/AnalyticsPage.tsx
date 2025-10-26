"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  BarController,
  LineController,
} from "chart.js";
import { Bar, Line, Pie, Chart } from "react-chartjs-2";
import { TrendingUp, TrendingDown, FileText, Mail, BarChart3, Clock } from "lucide-react";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  BarController,
  LineController
);

// Types
interface KPIData {
  totalApplications: number;
  totalResponses: number;
  avgAppsPerDay: number;
  avgTimeToResponse: number;
  trends: {
    applications: number;
    responses: number;
    avgPerDay: number;
    responseTime: number;
  };
}

interface ChartData {
  applicationsOverTime: {
    labels: string[];
    daily: number[];
    cumulative: number[];
  };
  statusDistribution: {
    labels: string[];
    values: number[];
  };
  sectorBreakdown: {
    labels: string[];
    values: number[];
  };
  roleTypes: {
    labels: string[];
    values: number[];
  };
  topKeywords: {
    labels: string[];
    values: number[];
  };
  sectorSuccessRate: {
    labels: string[];
    nonRejected: number[];
    rejected: number[];
  };
}

type TimeframeOption = "all" | "90" | "30" | "7";

// Mock data generator
const generateMockData = (timeframe: TimeframeOption): { kpis: KPIData; charts: ChartData } => {
  const getDays = () => {
    switch (timeframe) {
      case "7": return 7;
      case "30": return 30;
      case "90": return 90;
      case "all": return 180;
      default: return 30;
    }
  };

  const days = getDays();
  const totalApps = Math.floor(Math.random() * 50 + 20);
  const totalResponses = Math.floor(totalApps * 0.3);

  return {
    kpis: {
      totalApplications: totalApps,
      totalResponses: totalResponses,
      avgAppsPerDay: parseFloat((totalApps / days).toFixed(1)),
      avgTimeToResponse: Math.floor(Math.random() * 20 + 5),
      trends: {
        applications: Math.random() * 30 - 10,
        responses: Math.random() * 20 - 5,
        avgPerDay: Math.random() * 15 - 5,
        responseTime: Math.random() * 10 - 5,
      },
    },
    charts: {
      applicationsOverTime: {
        labels: Array.from({ length: Math.min(days, 30) }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - (Math.min(days, 30) - i - 1));
          return date.toLocaleDateString("en-GB", { month: "short", day: "numeric" });
        }),
        daily: Array.from({ length: Math.min(days, 30) }, () => Math.floor(Math.random() * 5)),
        cumulative: Array.from({ length: Math.min(days, 30) }, (_, i) => i * 2 + Math.random() * 10),
      },
      statusDistribution: {
        labels: ["Applied", "OA", "Interview", "Offer", "Rejected", "Ghosted"],
        values: [35, 15, 12, 8, 20, 10],
      },
      sectorBreakdown: {
        labels: ["Technology", "Finance", "Consulting", "FMCG", "Healthcare"],
        values: [40, 25, 15, 12, 8],
      },
      roleTypes: {
        labels: ["Software Eng", "Data Analyst", "Product Manager", "Consultant", "Finance"],
        values: [35, 20, 15, 18, 12],
      },
      topKeywords: {
        labels: ["Python", "Agile", "Leadership", "Analytics", "Communication"],
        values: [45, 38, 35, 30, 28],
      },
      sectorSuccessRate: {
        labels: ["Technology", "Finance", "Consulting", "FMCG", "Healthcare"],
        nonRejected: [32, 18, 12, 8, 6],
        rejected: [8, 7, 3, 4, 2],
      },
    },
  };
};

// Utility function to get CSS variable color
const getCSSVariableColor = (variable: string): string => {
  if (typeof window === "undefined") return "#000000";
  const color = getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
  return color || "#000000";
};

// Component Props
interface AnalyticsPageProps {
  environment: string;
}

export function AnalyticsPage({ environment }: AnalyticsPageProps) {
  const [timeframe, setTimeframe] = useState<TimeframeOption>("all");
  const [chartColors, setChartColors] = useState<string[]>([]);

  // Get chart colors from CSS variables
  useEffect(() => {
    const colors = [
      getCSSVariableColor("--chart-1"),
      getCSSVariableColor("--chart-2"),
      getCSSVariableColor("--chart-3"),
      getCSSVariableColor("--chart-4"),
      getCSSVariableColor("--chart-5"),
    ];
    setChartColors(colors);
  }, []);

  const data = useMemo(() => generateMockData(timeframe), [timeframe]);

  // KPI Card Component
  const KPICard = ({
    icon: Icon,
    label,
    value,
    subtitle,
    trend,
    trendValue,
  }: {
    icon: React.ElementType;
    label: string;
    value: string | number;
    subtitle: string;
    trend: "up" | "down" | "neutral";
    trendValue: string;
  }) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <Badge
            variant={trend === "up" ? "default" : trend === "down" ? "destructive" : "outline"}
            className="flex items-center gap-1"
          >
            {trend === "up" && <TrendingUp className="h-3 w-3" />}
            {trend === "down" && <TrendingDown className="h-3 w-3" />}
            {trendValue}
          </Badge>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="text-3xl font-bold">{value}</p>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
      </CardContent>
    </Card>
  );

  const getTrendType = (value: number): "up" | "down" | "neutral" => {
    if (value > 5) return "up";
    if (value < -5) return "down";
    return "neutral";
  };

  const formatTrend = (value: number, suffix: string = "%"): string => {
    const sign = value > 0 ? "+" : "";
    return `${sign}${value.toFixed(1)}${suffix}`;
  };

  // Chart.js options
  const commonOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
    },
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Application Analytics</h1>
          <p className="text-muted-foreground mt-1">Track your application progress and insights</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">Timeframe</span>
          <Select value={timeframe} onValueChange={(value) => setTimeframe(value as TimeframeOption)}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All time</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="7">Last 7 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          icon={FileText}
          label="Total applications"
          value={data.kpis.totalApplications}
          subtitle="In range"
          trend={getTrendType(data.kpis.trends.applications)}
          trendValue={formatTrend(data.kpis.trends.applications)}
        />
        <KPICard
          icon={Mail}
          label="Total responses"
          value={data.kpis.totalResponses}
          subtitle={`${((data.kpis.totalResponses / data.kpis.totalApplications) * 100).toFixed(0)}% response rate`}
          trend={getTrendType(data.kpis.trends.responses)}
          trendValue={formatTrend(data.kpis.trends.responses)}
        />
        <KPICard
          icon={BarChart3}
          label="Avg apps / day"
          value={data.kpis.avgAppsPerDay}
          subtitle="Daily average"
          trend={getTrendType(data.kpis.trends.avgPerDay)}
          trendValue={formatTrend(data.kpis.trends.avgPerDay)}
        />
        <KPICard
          icon={Clock}
          label="Avg time to response"
          value={`${data.kpis.avgTimeToResponse}d`}
          subtitle="Average days"
          trend={getTrendType(-data.kpis.trends.responseTime)}
          trendValue={formatTrend(data.kpis.trends.responseTime, "d")}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Applications Over Time */}
        <Card>
          <CardHeader>
            <CardTitle>Applications Over Time</CardTitle>
            <CardDescription>Cumulative total (line) + daily (bars)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <Chart
                type="bar"
                data={{
                  labels: data.charts.applicationsOverTime.labels,
                  datasets: [
                    {
                      type: "line",
                      label: "Cumulative",
                      data: data.charts.applicationsOverTime.cumulative,
                      borderColor: chartColors[0] || "hsl(var(--chart-1))",
                      backgroundColor: chartColors[0] || "hsl(var(--chart-1))",
                      borderWidth: 2,
                      fill: false,
                      tension: 0.4,
                      yAxisID: "y1",
                    },
                    {
                      type: "bar",
                      label: "Daily",
                      data: data.charts.applicationsOverTime.daily,
                      backgroundColor: chartColors[1] || "hsl(var(--chart-2))",
                      yAxisID: "y",
                    },
                  ],
                }}
                options={{
                  ...commonOptions,
                  scales: {
                    y: {
                      type: "linear" as const,
                      display: true,
                      position: "left" as const,
                      title: {
                        display: true,
                        text: "Daily Applications",
                      },
                    },
                    y1: {
                      type: "linear" as const,
                      display: true,
                      position: "right" as const,
                      title: {
                        display: true,
                        text: "Cumulative Total",
                      },
                      grid: {
                        drawOnChartArea: false,
                      },
                    },
                  },
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Status Distribution</CardTitle>
            <CardDescription>Current application status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <Pie
                data={{
                  labels: data.charts.statusDistribution.labels,
                  datasets: [
                    {
                      data: data.charts.statusDistribution.values,
                      backgroundColor: chartColors.length > 0 ? chartColors : [
                        "hsl(var(--chart-1))",
                        "hsl(var(--chart-2))",
                        "hsl(var(--chart-3))",
                        "hsl(var(--chart-4))",
                        "hsl(var(--chart-5))",
                        "hsl(var(--chart-1))",
                      ],
                      borderWidth: 2,
                      borderColor: "hsl(var(--background))",
                    },
                  ],
                }}
                options={{
                  ...commonOptions,
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Applications by Sector */}
        <Card>
          <CardHeader>
            <CardTitle>Applications by Sector</CardTitle>
            <CardDescription>Industry breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <Bar
                data={{
                  labels: data.charts.sectorBreakdown.labels,
                  datasets: [
                    {
                      label: "Applications",
                      data: data.charts.sectorBreakdown.values,
                      backgroundColor: chartColors[0] || "hsl(var(--chart-1))",
                    },
                  ],
                }}
                options={{
                  ...commonOptions,
                  indexAxis: "y" as const,
                  scales: {
                    x: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Role Types */}
        <Card>
          <CardHeader>
            <CardTitle>Role Types</CardTitle>
            <CardDescription>Position categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <Bar
                data={{
                  labels: data.charts.roleTypes.labels,
                  datasets: [
                    {
                      label: "Applications",
                      data: data.charts.roleTypes.values,
                      backgroundColor: chartColors[2] || "hsl(var(--chart-3))",
                    },
                  ],
                }}
                options={{
                  ...commonOptions,
                  indexAxis: "y" as const,
                  scales: {
                    x: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Top Keywords */}
        <Card>
          <CardHeader>
            <CardTitle>Top Keywords</CardTitle>
            <CardDescription>Most frequent job keywords</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <Bar
                data={{
                  labels: data.charts.topKeywords.labels,
                  datasets: [
                    {
                      label: "Occurrences",
                      data: data.charts.topKeywords.values,
                      backgroundColor: chartColors[3] || "hsl(var(--chart-4))",
                    },
                  ],
                }}
                options={{
                  ...commonOptions,
                  indexAxis: "y" as const,
                  scales: {
                    x: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Sector Success Rate */}
        <Card>
          <CardHeader>
            <CardTitle>Sector Success Rate</CardTitle>
            <CardDescription>Non-rejection vs rejection by sector</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <Bar
                data={{
                  labels: data.charts.sectorSuccessRate.labels,
                  datasets: [
                    {
                      label: "Non-rejected",
                      data: data.charts.sectorSuccessRate.nonRejected,
                      backgroundColor: chartColors[0] || "hsl(var(--chart-1))",
                      stack: "stack1",
                    },
                    {
                      label: "Rejected",
                      data: data.charts.sectorSuccessRate.rejected,
                      backgroundColor: "hsl(var(--destructive))",
                      stack: "stack1",
                    },
                  ],
                }}
                options={{
                  ...commonOptions,
                  indexAxis: "y" as const,
                  scales: {
                    x: {
                      stacked: true,
                      beginAtZero: true,
                    },
                    y: {
                      stacked: true,
                    },
                  },
                }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Environment indicator (for development) */}
      {environment === "development" && (
        <div className="fixed bottom-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
          Dev Mode
        </div>
      )}
    </div>
  );
}
