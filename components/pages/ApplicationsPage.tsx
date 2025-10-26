"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X } from "lucide-react";

// Types
interface Application {
  id: string;
  title: string;
  company: string;
  status: string;
  sector?: string;
  roleType?: string;
  location?: string;
  salary?: string;
  startDate?: string;
  appliedDate?: string;
  statusUpdateDate?: string;
  fitScore?: number;
  alignmentScore?: number;
  source?: string;
  cvUsed?: string;
}

type SortOption = "date-desc" | "date-asc" | "fit-desc" | "company" | "relevance";

// Status configuration
const STATUS_OPTIONS = [
  { value: "applied", label: "Applied" },
  { value: "oa", label: "OA" },
  { value: "hirevue", label: "HireVue" },
  { value: "interview", label: "Interview" },
  { value: "offer", label: "Offer" },
  { value: "rejected", label: "Rejected" },
  { value: "withdrew", label: "Withdrew" },
  { value: "on-hold", label: "On-hold" },
  { value: "role-closed", label: "Role-closed" },
  { value: "ghosted", label: "Ghosted" },
];

const STATUS_COLORS: Record<string, string> = {
  applied: "hsl(253, 75%, 66%)",
  oa: "hsl(207, 98%, 64%)",
  hirevue: "hsl(291, 64%, 42%)",
  interview: "hsl(187, 100%, 42%)",
  offer: "hsl(122, 39%, 49%)",
  rejected: "hsl(4, 90%, 58%)",
  ghosted: "hsl(0, 0%, 62%)",
  withdrew: "hsl(200, 18%, 46%)",
  "on-hold": "hsl(36, 100%, 50%)",
  "role-closed": "hsl(291, 47%, 51%)",
  default: "hsl(220, 13%, 69%)",
};

const STATUS_VARIANT_MAP: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  offer: "default",
  interview: "default",
  oa: "secondary",
  hirevue: "secondary",
  applied: "secondary",
  rejected: "destructive",
  ghosted: "outline",
  withdrew: "outline",
  "on-hold": "outline",
  "role-closed": "outline",
};

// Mock data
const MOCK_APPLICATIONS: Application[] = [
  {
    id: "1",
    title: "Software Engineering Graduate",
    company: "Google",
    status: "interview",
    sector: "Technology",
    roleType: "Full-time",
    location: "London, UK",
    salary: "£50,000 - £60,000",
    startDate: "2025-09-01",
    appliedDate: "2025-01-15",
    statusUpdateDate: "2025-01-20",
    fitScore: 92,
    alignmentScore: 88,
    source: "LinkedIn",
    cvUsed: "CV_Tech_v2.pdf",
  },
  {
    id: "2",
    title: "Data Analyst Graduate",
    company: "Meta",
    status: "oa",
    sector: "Technology",
    roleType: "Full-time",
    location: "Remote",
    salary: "£45,000 - £55,000",
    startDate: "2025-09-01",
    appliedDate: "2025-01-18",
    statusUpdateDate: "2025-01-22",
    fitScore: 85,
    alignmentScore: 82,
    source: "Company Website",
    cvUsed: "CV_Data_v1.pdf",
  },
  {
    id: "3",
    title: "Graduate Product Manager",
    company: "Amazon",
    status: "applied",
    sector: "E-commerce",
    roleType: "Full-time",
    location: "Manchester, UK",
    salary: "£42,000 - £48,000",
    startDate: "2025-10-01",
    appliedDate: "2025-01-20",
    statusUpdateDate: "2025-01-20",
    fitScore: 78,
    alignmentScore: 75,
    source: "Glassdoor",
    cvUsed: "CV_PM_v1.pdf",
  },
  {
    id: "4",
    title: "Software Engineer",
    company: "Microsoft",
    status: "offer",
    sector: "Technology",
    roleType: "Full-time",
    location: "Reading, UK",
    salary: "£55,000 - £65,000",
    startDate: "2025-09-01",
    appliedDate: "2025-01-10",
    statusUpdateDate: "2025-01-25",
    fitScore: 95,
    alignmentScore: 93,
    source: "University Career Fair",
    cvUsed: "CV_Tech_v2.pdf",
  },
  {
    id: "5",
    title: "Marketing Graduate",
    company: "Unilever",
    status: "rejected",
    sector: "FMCG",
    roleType: "Full-time",
    location: "London, UK",
    salary: "£32,000 - £38,000",
    startDate: "2025-09-01",
    appliedDate: "2025-01-12",
    statusUpdateDate: "2025-01-19",
    fitScore: 65,
    alignmentScore: 68,
    source: "Indeed",
    cvUsed: "CV_Marketing_v1.pdf",
  },
  {
    id: "6",
    title: "Finance Graduate",
    company: "HSBC",
    status: "hirevue",
    sector: "Finance",
    roleType: "Full-time",
    location: "London, UK",
    salary: "£40,000 - £50,000",
    startDate: "2025-09-01",
    appliedDate: "2025-01-16",
    statusUpdateDate: "2025-01-23",
    fitScore: 80,
    alignmentScore: 77,
    source: "LinkedIn",
    cvUsed: "CV_Finance_v1.pdf",
  },
];

// Utility functions
const formatDate = (dateString?: string): string => {
  if (!dateString) return "—";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
};

const getStatusColor = (status: string): string => {
  return STATUS_COLORS[status] || STATUS_COLORS.default;
};

const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
  return STATUS_VARIANT_MAP[status] || "outline";
};

// Main component
interface ApplicationsPageProps {
  environment: string;
}

export function ApplicationsPage({ environment }: ApplicationsPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortFilter, setSortFilter] = useState<SortOption>("date-desc");
  const [applications] = useState<Application[]>(MOCK_APPLICATIONS);

  // Filter and sort applications
  const filteredAndSortedApplications = useMemo(() => {
    let filtered = [...applications];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (app) =>
          app.title.toLowerCase().includes(query) ||
          app.company.toLowerCase().includes(query) ||
          app.sector?.toLowerCase().includes(query) ||
          app.roleType?.toLowerCase().includes(query) ||
          app.location?.toLowerCase().includes(query)
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((app) => app.status === statusFilter);
    }

    // Apply sorting
    switch (sortFilter) {
      case "date-desc":
        filtered.sort((a, b) => {
          const dateA = new Date(a.appliedDate || "2000-01-01").getTime();
          const dateB = new Date(b.appliedDate || "2000-01-01").getTime();
          return dateB - dateA;
        });
        break;
      case "date-asc":
        filtered.sort((a, b) => {
          const dateA = new Date(a.appliedDate || "2000-01-01").getTime();
          const dateB = new Date(b.appliedDate || "2000-01-01").getTime();
          return dateA - dateB;
        });
        break;
      case "fit-desc":
        filtered.sort((a, b) => (b.fitScore || 0) - (a.fitScore || 0));
        break;
      case "company":
        filtered.sort((a, b) => a.company.localeCompare(b.company));
        break;
      case "relevance":
        // Already filtered by search relevance
        break;
    }

    return filtered;
  }, [applications, searchQuery, statusFilter, sortFilter]);

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const hasActiveSearch = searchQuery.trim().length > 0;
  const resultsCount = filteredAndSortedApplications.length;

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      {/* Smart Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search applications by company, role, or keywords..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 h-12 text-base"
          autoComplete="off"
          spellCheck={false}
        />
      </div>

      {/* Search Results Info */}
      {hasActiveSearch && (
        <div className="flex items-center justify-between bg-muted/50 rounded-lg px-4 py-3">
          <span className="text-sm text-muted-foreground">
            Found {resultsCount} {resultsCount === 1 ? "result" : "results"} for &ldquo;{searchQuery}&rdquo;
          </span>
          <Button variant="ghost" size="sm" onClick={handleClearSearch}>
            <X className="h-4 w-4 mr-1" />
            Clear search
          </Button>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {STATUS_OPTIONS.map((status) => (
              <SelectItem key={status.value} value={status.value}>
                {status.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sortFilter} onValueChange={(value) => setSortFilter(value as SortOption)}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date-desc">Newest first</SelectItem>
            <SelectItem value="date-asc">Oldest first</SelectItem>
            <SelectItem value="fit-desc">Best fit first</SelectItem>
            <SelectItem value="company">By company</SelectItem>
            <SelectItem value="relevance">Most relevant</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* No Results Message */}
      {resultsCount === 0 && (
        <div className="text-center py-16 px-4">
          <h3 className="text-xl font-semibold mb-2">No applications found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search terms or filters to find what you&rsquo;re looking for.
          </p>
        </div>
      )}

      {/* Applications Grid */}
      {resultsCount > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAndSortedApplications.map((app) => (
            <Card
              key={app.id}
              className="hover:shadow-lg transition-shadow duration-200 cursor-pointer group"
              style={{ borderLeft: `4px solid ${getStatusColor(app.status)}` }}
            >
              <CardContent className="p-6 space-y-3">
                {/* Status Badge */}
                <div className="flex items-start justify-between">
                  <Badge
                    variant={getStatusVariant(app.status)}
                    className="text-xs"
                    style={{
                      backgroundColor: getStatusColor(app.status),
                      color: "white",
                      borderColor: getStatusColor(app.status),
                    }}
                  >
                    {STATUS_OPTIONS.find((s) => s.value === app.status)?.label || app.status}
                  </Badge>
                  {app.fitScore && (
                    <span className="text-xs font-medium text-muted-foreground">
                      Fit: {app.fitScore}%
                    </span>
                  )}
                </div>

                {/* Title */}
                <div>
                  <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
                    {app.title}
                  </h3>
                  <p className="text-sm font-medium text-muted-foreground mt-1">{app.company}</p>
                </div>

                {/* Details */}
                <div className="space-y-1.5 text-sm text-muted-foreground">
                  {app.sector && (
                    <div className="flex items-center">
                      <span className="font-medium min-w-[90px]">Sector:</span>
                      <span>{app.sector}</span>
                    </div>
                  )}
                  {app.roleType && (
                    <div className="flex items-center">
                      <span className="font-medium min-w-[90px]">Role Type:</span>
                      <span>{app.roleType}</span>
                    </div>
                  )}
                  {app.location && (
                    <div className="flex items-center">
                      <span className="font-medium min-w-[90px]">Location:</span>
                      <span>{app.location}</span>
                    </div>
                  )}
                  {app.startDate && (
                    <div className="flex items-center">
                      <span className="font-medium min-w-[90px]">Start Date:</span>
                      <span>{formatDate(app.startDate)}</span>
                    </div>
                  )}
                  {app.appliedDate && (
                    <div className="flex items-center">
                      <span className="font-medium min-w-[90px]">Applied:</span>
                      <span>{formatDate(app.appliedDate)}</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("Edit application:", app.id);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="flex-1 text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("View application:", app.id);
                    }}
                  >
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Environment indicator (for development) */}
      {environment === "development" && (
        <div className="fixed bottom-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
          Dev Mode
        </div>
      )}
    </div>
  );
}
