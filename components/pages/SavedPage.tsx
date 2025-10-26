"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X } from "lucide-react";

interface SavedPageProps {
  environment: string;
}

interface SavedJob {
  id: string;
  title: string;
  company: string;
  location?: string;
  salary?: string;
  type?: string;
  fitScore: number;
  keywords: string[];
  savedDate: string;
  sourceUrl?: string;
  relevanceScore?: number;
}

export default function SavedPage({ environment }: SavedPageProps) {
  // State management
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("date-desc");

  // Mock data for saved jobs
  const [savedJobs] = useState<SavedJob[]>([
    {
      id: "1",
      title: "Senior Software Engineer",
      company: "Google",
      location: "London, UK",
      salary: "£80,000 - £120,000",
      type: "Full-time",
      fitScore: 92,
      keywords: ["React", "TypeScript", "Go", "Cloud", "Leadership"],
      savedDate: "2025-10-25",
      sourceUrl: "https://careers.google.com/jobs/123",
      relevanceScore: 95,
    },
    {
      id: "2",
      title: "Frontend Developer",
      company: "Meta",
      location: "Remote",
      salary: "£70,000 - £90,000",
      type: "Full-time",
      fitScore: 88,
      keywords: ["React", "JavaScript", "Next.js", "GraphQL"],
      savedDate: "2025-10-24",
      sourceUrl: "https://careers.meta.com/jobs/456",
      relevanceScore: 87,
    },
    {
      id: "3",
      title: "Full Stack Engineer",
      company: "Stripe",
      location: "Dublin, Ireland",
      salary: "€85,000 - €110,000",
      type: "Full-time",
      fitScore: 85,
      keywords: ["Node.js", "React", "AWS", "PostgreSQL"],
      savedDate: "2025-10-23",
      sourceUrl: "https://stripe.com/jobs/789",
      relevanceScore: 82,
    },
    {
      id: "4",
      title: "Software Development Engineer",
      company: "Amazon",
      location: "Edinburgh, UK",
      salary: "£60,000 - £95,000",
      type: "Full-time",
      fitScore: 79,
      keywords: ["Java", "Python", "AWS", "Microservices"],
      savedDate: "2025-10-22",
      sourceUrl: "https://amazon.jobs/en/jobs/abc",
      relevanceScore: 78,
    },
    {
      id: "5",
      title: "React Engineer",
      company: "Shopify",
      location: "Remote (UK)",
      salary: "£75,000 - £100,000",
      type: "Full-time",
      fitScore: 90,
      keywords: ["React", "TypeScript", "GraphQL", "Ruby"],
      savedDate: "2025-10-21",
      sourceUrl: "https://shopify.com/careers/xyz",
      relevanceScore: 90,
    },
  ]);

  // Filter jobs based on search query
  const filteredJobs = useMemo(() => {
    if (!searchQuery.trim()) return savedJobs;

    const query = searchQuery.toLowerCase();
    return savedJobs.filter((job) => {
      const searchableText = `
        ${job.title}
        ${job.company}
        ${job.location || ""}
        ${job.keywords.join(" ")}
      `.toLowerCase();
      return searchableText.includes(query);
    });
  }, [savedJobs, searchQuery]);

  // Sort jobs based on selected option
  const sortedJobs = useMemo(() => {
    const jobs = [...filteredJobs];

    switch (sortOption) {
      case "date-desc":
        return jobs.sort((a, b) => b.savedDate.localeCompare(a.savedDate));
      case "fit-desc":
        return jobs.sort((a, b) => b.fitScore - a.fitScore);
      case "company":
        return jobs.sort((a, b) => a.company.localeCompare(b.company));
      case "relevance":
        return jobs.sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0));
      default:
        return jobs;
    }
  }, [filteredJobs, sortOption]);

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const handleJobClick = (job: SavedJob) => {
    console.log("Opening job:", job);
    // TODO: Implement job details modal/view
  };

  const showSearchInfo = searchQuery.trim().length > 0;

  return (
    <div className="space-y-6">
      {/* Smart Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search saved jobs by company, role, or keywords..."
          className="pl-10 pr-4 h-12 text-base"
          autoComplete="off"
          spellCheck="false"
        />
      </div>

      {/* Search Results Info */}
      {showSearchInfo && (
        <div className="flex items-center justify-between px-4 py-3 bg-primary/5 rounded-lg border border-primary/10">
          <span className="text-sm font-medium text-muted-foreground">
            {filteredJobs.length} {filteredJobs.length === 1 ? "result" : "results"} found
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearSearch}
            className="h-8 px-3 text-sm"
          >
            <X className="h-4 w-4 mr-1" />
            Clear search
          </Button>
        </div>
      )}

      {/* Page Header with Sort */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-gray-900 dark:text-gray-100">
          Saved for later
        </h2>
        <Select value={sortOption} onValueChange={setSortOption}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date-desc">Newest first</SelectItem>
            <SelectItem value="fit-desc">Best fit first</SelectItem>
            <SelectItem value="company">By company</SelectItem>
            <SelectItem value="relevance">Most relevant</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* No Results Message */}
      {sortedJobs.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="pt-6 pb-8 text-center space-y-4">
            <div className="text-6xl" aria-hidden="true">💾</div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                No saved jobs found
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                {searchQuery.trim()
                  ? "Try adjusting your search terms to find what you're looking for."
                  : "Save jobs from the Analyse page to keep track of opportunities you're interested in."}
              </p>
            </div>
            {searchQuery.trim() && (
              <Button variant="outline" onClick={handleClearSearch} className="mt-4">
                Clear search
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Saved Jobs Grid */}
      {sortedJobs.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedJobs.map((job) => (
            <Card
              key={job.id}
              className="group cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 border-l-4 border-l-blue-500"
              onClick={() => handleJobClick(job)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <CardTitle className="text-lg font-bold leading-snug line-clamp-2">
                    {job.title}
                  </CardTitle>
                  <Badge
                    variant="secondary"
                    className="shrink-0 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100 font-bold"
                  >
                    SAVED
                  </Badge>
                </div>
                <div className="text-base font-semibold text-muted-foreground">
                  {job.company}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Job Details */}
                <div className="flex flex-wrap gap-2 text-sm">
                  {job.location && (
                    <Badge variant="outline" className="font-normal">
                      {job.location}
                    </Badge>
                  )}
                  {job.salary && (
                    <Badge variant="outline" className="font-normal">
                      {job.salary}
                    </Badge>
                  )}
                  {job.type && (
                    <Badge variant="outline" className="font-normal">
                      {job.type}
                    </Badge>
                  )}
                </div>

                {/* Fit Score */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-muted-foreground">AI Fit Score</span>
                    <span className="font-bold text-primary">{job.fitScore}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-500"
                      style={{ width: `${job.fitScore}%` }}
                    />
                  </div>
                </div>

                {/* Keywords */}
                <div className="flex flex-wrap gap-1.5">
                  {job.keywords.slice(0, 4).map((keyword, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="text-xs font-medium"
                    >
                      {keyword}
                    </Badge>
                  ))}
                  {job.keywords.length > 4 && (
                    <Badge
                      variant="secondary"
                      className="text-xs font-medium"
                    >
                      +{job.keywords.length - 4}
                    </Badge>
                  )}
                </div>

                {/* Saved Date */}
                <div className="text-xs text-muted-foreground pt-2 border-t">
                  Saved {new Date(job.savedDate).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Environment Badge */}
      <div className="flex justify-center pt-4">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border bg-card text-sm">
          <span
            className={`w-2 h-2 rounded-full ${
              environment === "prod" ? "bg-green-500" : "bg-yellow-500"
            }`}
          />
          <span className="text-muted-foreground">
            {environment === "prod" ? "Production" : "Test"} environment
          </span>
        </div>
      </div>
    </div>
  );
}
