"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface DeadlinesPageProps {
  environment: string;
}

interface Deadline {
  id: string;
  company: string;
  type: string;
  title: string;
  dueDate: Date;
  status: string;
  hasConflict: boolean;
  completed: boolean;
}

interface KPIStats {
  dueToday: number;
  dueThisWeek: number;
  overdue: number;
}

export default function DeadlinesPage({ environment }: DeadlinesPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showCompleted, setShowCompleted] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"agenda" | "calendar">("agenda");
  const [isLoading, setIsLoading] = useState(false);

  // Filter states
  const [companyFilter, setCompanyFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [conflictFilter, setConflictFilter] = useState("");

  // Mock data
  const [deadlines, setDeadlines] = useState<Deadline[]>([]);
  const [kpiStats, setKpiStats] = useState<KPIStats>({
    dueToday: 0,
    dueThisWeek: 0,
    overdue: 0,
  });

  // Calendar navigation
  const [currentWeekOffset, setCurrentWeekOffset] = useState(0);

  const handleReload = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  const handleClearFilters = () => {
    setCompanyFilter("");
    setTypeFilter("");
    setStatusFilter("");
    setConflictFilter("");
    setSearchQuery("");
  };

  const toggleShowCompleted = () => {
    setShowCompleted(!showCompleted);
  };

  const getTimezoneText = () => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const now = new Date();
    const isDST = new Date(now.getFullYear(), 0, 1).getTimezoneOffset() < now.getTimezoneOffset();
    const offset = -now.getTimezoneOffset() / 60;
    return `Showing times in ${timezone} (UTC${offset >= 0 ? '+' : ''}${offset})`;
  };

  const getCalendarWeekTitle = () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + currentWeekOffset * 7);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const formatDate = (date: Date) => {
      return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
    };

    return `${formatDate(startOfWeek)} – ${formatDate(endOfWeek)}`;
  };

  const filteredDeadlines = deadlines.filter(deadline => {
    if (!showCompleted && deadline.completed) return false;
    if (searchQuery && !deadline.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !deadline.company.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (companyFilter && deadline.company !== companyFilter) return false;
    if (typeFilter && deadline.type !== typeFilter) return false;
    if (statusFilter && deadline.status !== statusFilter) return false;
    if (conflictFilter === "true" && !deadline.hasConflict) return false;
    if (conflictFilter === "false" && deadline.hasConflict) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6 space-y-6">
          {/* Header Top Section */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Deadlines</h2>
                <p className="text-muted-foreground">
                  Stay on top of assessments, interviews and other milestones.
                </p>
              </div>

              {/* KPI Chips */}
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="px-3 py-1.5 text-sm">
                  Due today: {kpiStats.dueToday}
                </Badge>
                <Badge variant="secondary" className="px-3 py-1.5 text-sm">
                  Due this week: {kpiStats.dueThisWeek}
                </Badge>
                <Badge variant="destructive" className="px-3 py-1.5 text-sm">
                  Overdue: {kpiStats.overdue}
                </Badge>
              </div>
            </div>

            {/* Meta Row: Timezone and Show Completed */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border bg-muted/50 text-xs text-muted-foreground w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                {getTimezoneText()}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={toggleShowCompleted}
              >
                {showCompleted ? "Hide completed" : "Show completed"}
              </Button>
            </div>

            <Separator />

            {/* Actions Row */}
            <div className="flex flex-col md:flex-row gap-3">
              {/* Search Bar */}
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Search deadlines..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Actions Right */}
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="ghost"
                  onClick={handleReload}
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Reload"}
                </Button>

                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className={showFilters ? "bg-accent" : ""}
                >
                  Filters
                </Button>

                {/* View Switcher */}
                <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "agenda" | "calendar")}>
                  <TabsList>
                    <TabsTrigger value="agenda">Agenda</TabsTrigger>
                    <TabsTrigger value="calendar">Calendar</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <>
              <Separator />
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Company Filter */}
                  <div className="space-y-2">
                    <Label htmlFor="companyFilter">Company</Label>
                    <Select value={companyFilter} onValueChange={setCompanyFilter}>
                      <SelectTrigger id="companyFilter">
                        <SelectValue placeholder="All companies" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All companies</SelectItem>
                        {/* Add dynamic company options here */}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Type Filter */}
                  <div className="space-y-2">
                    <Label htmlFor="typeFilter">Type</Label>
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                      <SelectTrigger id="typeFilter">
                        <SelectValue placeholder="All types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All types</SelectItem>
                        <SelectItem value="OA">OA</SelectItem>
                        <SelectItem value="HireVue">HireVue</SelectItem>
                        <SelectItem value="Interview">Interview</SelectItem>
                        <SelectItem value="Assessment">Assessment</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Status Filter */}
                  <div className="space-y-2">
                    <Label htmlFor="statusFilter">Status</Label>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger id="statusFilter">
                        <SelectValue placeholder="All statuses" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All statuses</SelectItem>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="snoozed">Snoozed</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="overdue">Overdue</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Conflicts Filter */}
                  <div className="space-y-2">
                    <Label htmlFor="conflictFilter">Conflicts</Label>
                    <Select value={conflictFilter} onValueChange={setConflictFilter}>
                      <SelectTrigger id="conflictFilter">
                        <SelectValue placeholder="All items" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All items</SelectItem>
                        <SelectItem value="true">Has conflict</SelectItem>
                        <SelectItem value="false">No conflict</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Clear Filters Button */}
                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    onClick={handleClearFilters}
                    size="sm"
                  >
                    Clear all filters
                  </Button>
                </div>
              </div>
            </>
          )}

          <Separator />

          {/* Loading Skeleton */}
          {isLoading && (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-20 bg-muted rounded-lg animate-pulse"
                />
              ))}
            </div>
          )}

          {/* Content Views */}
          {!isLoading && (
            <>
              {viewMode === "agenda" && (
                <div className="space-y-4">
                  {filteredDeadlines.length === 0 ? (
                    <div className="text-center py-12 space-y-3">
                      <h3 className="text-xl font-semibold">No deadlines found</h3>
                      <p className="text-muted-foreground">
                        Adjust your filters or search terms.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredDeadlines.map((deadline) => (
                        <Card key={deadline.id} className="hover:bg-accent/50 transition-colors cursor-pointer">
                          <CardContent className="pt-4 pb-4">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1 space-y-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h3 className="font-semibold">{deadline.title}</h3>
                                  {deadline.hasConflict && (
                                    <Badge variant="destructive" className="text-xs">
                                      Conflict
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
                                  <span>{deadline.company}</span>
                                  <span>•</span>
                                  <Badge variant="outline" className="text-xs">
                                    {deadline.type}
                                  </Badge>
                                  <span>•</span>
                                  <span>{deadline.dueDate.toLocaleDateString()}</span>
                                </div>
                              </div>
                              <Badge
                                variant={deadline.status === "overdue" ? "destructive" : "secondary"}
                                className="text-xs"
                              >
                                {deadline.status}
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {viewMode === "calendar" && (
                <div className="space-y-4">
                  {/* Calendar Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setCurrentWeekOffset(currentWeekOffset - 1)}
                      >
                        Prev week
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setCurrentWeekOffset(currentWeekOffset + 1)}
                      >
                        Next week
                      </Button>
                    </div>
                    <div className="text-sm font-medium">
                      {getCalendarWeekTitle()}
                    </div>
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-7 gap-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => {
                      const date = new Date();
                      date.setDate(date.getDate() - date.getDay() + index + currentWeekOffset * 7);

                      const dayDeadlines = filteredDeadlines.filter(deadline => {
                        const deadlineDate = new Date(deadline.dueDate);
                        return deadlineDate.toDateString() === date.toDateString();
                      });

                      const isToday = date.toDateString() === new Date().toDateString();

                      return (
                        <div
                          key={day}
                          className={`border rounded-lg p-3 min-h-[120px] space-y-2 ${
                            isToday ? 'bg-primary/5 border-primary' : 'bg-card'
                          }`}
                        >
                          <div className="text-xs font-medium text-muted-foreground">
                            {day}
                          </div>
                          <div className={`text-lg font-semibold ${isToday ? 'text-primary' : ''}`}>
                            {date.getDate()}
                          </div>
                          <div className="space-y-1">
                            {dayDeadlines.map((deadline) => (
                              <div
                                key={deadline.id}
                                className="text-xs p-1.5 rounded bg-accent hover:bg-accent/70 cursor-pointer line-clamp-2"
                                title={`${deadline.company} - ${deadline.title}`}
                              >
                                <div className="font-medium">{deadline.company}</div>
                                <div className="text-muted-foreground">{deadline.type}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {filteredDeadlines.length === 0 && (
                    <div className="text-center py-12 space-y-3">
                      <h3 className="text-xl font-semibold">No deadlines found</h3>
                      <p className="text-muted-foreground">
                        Adjust your filters or search terms.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Environment Badge */}
      <div className="flex justify-center">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border bg-card text-sm">
          <span className={`w-2 h-2 rounded-full ${environment === 'prod' ? 'bg-green-500' : 'bg-yellow-500'}`} />
          <span className="text-muted-foreground">
            {environment === 'prod' ? 'Production' : 'Test'} environment
          </span>
        </div>
      </div>
    </div>
  );
}
