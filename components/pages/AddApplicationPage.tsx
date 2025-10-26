"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";

interface AddApplicationPageProps {
  environment: string;
}

interface FormData {
  title: string;
  companyName: string;
  sourceUrl: string;
  status: string;
  locations: string[];
  appliedDate: string;
  salaryCurrency: string;
  salaryMin: string;
  salaryMax: string;
  salaryPeriod: string;
  applicationEffortRating: number;
  applicationChanceRating: number;
  cvUsed: string;
  keywords: string[];
  fits: string[];
  gaps: string[];
  jobSummary: string;
  jobDescription: string;
}

const AddApplicationPage: React.FC<AddApplicationPageProps> = ({ environment }) => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    companyName: "",
    sourceUrl: "",
    status: "saved",
    locations: [],
    appliedDate: "",
    salaryCurrency: "",
    salaryMin: "",
    salaryMax: "",
    salaryPeriod: "",
    applicationEffortRating: 5,
    applicationChanceRating: 5,
    cvUsed: "",
    keywords: [],
    fits: [],
    gaps: [],
    jobSummary: "",
    jobDescription: "",
  });

  // Tag input states
  const [locationsInput, setLocationsInput] = useState("");
  const [keywordsInput, setKeywordsInput] = useState("");
  const [fitsInput, setFitsInput] = useState("");
  const [gapsInput, setGapsInput] = useState("");

  // Handle text input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle slider changes
  const handleSliderChange = (name: string, value: number) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle tag input
  const handleTagInput = (
    field: "locations" | "keywords" | "fits" | "gaps",
    value: string,
    setInput: (value: string) => void
  ) => {
    // Handle comma or Enter key
    const tags = value.split(/[,\n]/).filter((tag) => tag.trim());
    if (tags.length > 1 || value.endsWith(",")) {
      const newTags = tags.map((tag) => tag.trim()).filter((tag) => tag);
      setFormData((prev) => ({
        ...prev,
        [field]: [...prev[field], ...newTags],
      }));
      setInput("");
    } else {
      setInput(value);
    }
  };

  const handleTagKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: "locations" | "keywords" | "fits" | "gaps",
    input: string,
    setInput: (value: string) => void
  ) => {
    if (e.key === "Enter" && input.trim()) {
      e.preventDefault();
      setFormData((prev) => ({
        ...prev,
        [field]: [...prev[field], input.trim()],
      }));
      setInput("");
    } else if (e.key === "Backspace" && !input && formData[field].length > 0) {
      // Remove last tag if input is empty
      setFormData((prev) => ({
        ...prev,
        [field]: prev[field].slice(0, -1),
      }));
    }
  };

  const removeTag = (field: "locations" | "keywords" | "fits" | "gaps", index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  // Calculate salary display
  const getSalaryDisplay = () => {
    const { salaryCurrency, salaryMin, salaryMax, salaryPeriod } = formData;
    if (!salaryCurrency || !salaryMin || !salaryMax || !salaryPeriod) {
      return "Salary range will appear here";
    }
    const min = parseInt(salaryMin).toLocaleString();
    const max = parseInt(salaryMax).toLocaleString();
    return `${salaryCurrency}${min} - ${salaryCurrency}${max} ${salaryPeriod}`;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // TODO: Implement API call to save application
  };

  // Handle form clear
  const handleClear = () => {
    setFormData({
      title: "",
      companyName: "",
      sourceUrl: "",
      status: "saved",
      locations: [],
      appliedDate: "",
      salaryCurrency: "",
      salaryMin: "",
      salaryMax: "",
      salaryPeriod: "",
      applicationEffortRating: 5,
      applicationChanceRating: 5,
      cvUsed: "",
      keywords: [],
      fits: [],
      gaps: [],
      jobSummary: "",
      jobDescription: "",
    });
    setLocationsInput("");
    setKeywordsInput("");
    setFitsInput("");
    setGapsInput("");
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6 md:p-8">
          {/* Hero Section */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Add New Application
            </h1>
            <p className="text-muted-foreground text-sm md:text-base">
              Keep track of your job applications with detailed information and smart organization
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center gap-2 mb-8">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className="h-2 w-16 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
              />
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information Section */}
            <div className="space-y-4">
              <div className="flex items-start gap-3 mb-4">
                <div className="text-2xl">💼</div>
                <div>
                  <h3 className="text-xl font-semibold">Basic Information</h3>
                  <p className="text-sm text-muted-foreground">
                    Essential details about the job opportunity
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">
                    Job Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g. Graduate Software Engineer"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyName">
                    Company <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="e.g. Google, Microsoft, Meta"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sourceUrl">Source URL</Label>
                  <Input
                    id="sourceUrl"
                    name="sourceUrl"
                    type="url"
                    value={formData.sourceUrl}
                    onChange={handleInputChange}
                    placeholder="https://careers.company.com/job/123"
                  />
                  <p className="text-xs text-muted-foreground">
                    Link to the original job posting
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Application Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => handleSelectChange("status", value)}
                  >
                    <SelectTrigger id="status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="saved">💾 Saved for Later</SelectItem>
                      <SelectItem value="applied">✅ Applied</SelectItem>
                      <SelectItem value="oa">📝 Online Assessment</SelectItem>
                      <SelectItem value="hirevue">🎥 HireVue Interview</SelectItem>
                      <SelectItem value="interview">👥 Interview Scheduled</SelectItem>
                      <SelectItem value="offer">🎉 Offer Received</SelectItem>
                      <SelectItem value="rejected">❌ Rejected</SelectItem>
                      <SelectItem value="withdrew">🚪 Withdrew</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Location & Timing Section */}
            <div className="space-y-4">
              <div className="flex items-start gap-3 mb-4">
                <div className="text-2xl">📍</div>
                <div>
                  <h3 className="text-xl font-semibold">Location & Timing</h3>
                  <p className="text-sm text-muted-foreground">
                    Where and when this opportunity is available
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="locations">Locations</Label>
                  <div className="flex flex-wrap gap-2 p-2 border rounded-md bg-background min-h-[42px]">
                    {formData.locations.map((location, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="gap-1 pr-1"
                      >
                        {location}
                        <button
                          type="button"
                          onClick={() => removeTag("locations", index)}
                          className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                    <input
                      id="locations"
                      type="text"
                      value={locationsInput}
                      onChange={(e) =>
                        handleTagInput("locations", e.target.value, setLocationsInput)
                      }
                      onKeyDown={(e) =>
                        handleTagKeyDown(e, "locations", locationsInput, setLocationsInput)
                      }
                      placeholder="Add locations (press Enter or comma)"
                      className="flex-1 min-w-[200px] outline-none bg-transparent text-sm"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Add multiple locations where this job can be performed
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="appliedDate">Applied Date</Label>
                  <Input
                    id="appliedDate"
                    name="appliedDate"
                    type="date"
                    value={formData.appliedDate}
                    onChange={handleInputChange}
                  />
                  <p className="text-xs text-muted-foreground">
                    Leave blank if you haven't applied yet
                  </p>
                </div>
              </div>
            </div>

            {/* Compensation Section */}
            <div className="space-y-4">
              <div className="flex items-start gap-3 mb-4">
                <div className="text-2xl">💰</div>
                <div>
                  <h3 className="text-xl font-semibold">Compensation Details</h3>
                  <p className="text-sm text-muted-foreground">
                    Salary and benefits information
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="salaryCurrency">Currency</Label>
                  <Select
                    value={formData.salaryCurrency}
                    onValueChange={(value) => handleSelectChange("salaryCurrency", value)}
                  >
                    <SelectTrigger id="salaryCurrency">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="£">£ GBP</SelectItem>
                      <SelectItem value="$">$ USD</SelectItem>
                      <SelectItem value="€">€ EUR</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="salaryMin">Minimum Salary</Label>
                  <Input
                    id="salaryMin"
                    name="salaryMin"
                    type="number"
                    min="0"
                    step="1000"
                    value={formData.salaryMin}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="salaryMax">Maximum Salary</Label>
                  <Input
                    id="salaryMax"
                    name="salaryMax"
                    type="number"
                    min="0"
                    step="1000"
                    value={formData.salaryMax}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="salaryPeriod">Period</Label>
                  <Select
                    value={formData.salaryPeriod}
                    onValueChange={(value) => handleSelectChange("salaryPeriod", value)}
                  >
                    <SelectTrigger id="salaryPeriod">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="per annum">Per Annum</SelectItem>
                      <SelectItem value="per month">Per Month</SelectItem>
                      <SelectItem value="per hour">Per Hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-2 lg:col-span-4 p-4 bg-secondary/50 rounded-md text-center font-medium">
                  {getSalaryDisplay()}
                </div>
              </div>
            </div>

            {/* Assessment & Ratings Section */}
            <div className="space-y-4">
              <div className="flex items-start gap-3 mb-4">
                <div className="text-2xl">📊</div>
                <div>
                  <h3 className="text-xl font-semibold">Personal Assessment</h3>
                  <p className="text-sm text-muted-foreground">
                    Rate your application effort and chances
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="effortRating">Application Effort</Label>
                  <div className="flex items-center gap-4">
                    <input
                      id="effortRating"
                      type="range"
                      min="1"
                      max="10"
                      value={formData.applicationEffortRating}
                      onChange={(e) =>
                        handleSliderChange("applicationEffortRating", parseInt(e.target.value))
                      }
                      className="flex-1 h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-purple-600"
                    />
                    <span className="text-sm font-medium min-w-[3rem] text-right">
                      {formData.applicationEffortRating}/10
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    How much effort did you put into this application?
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="chanceRating">Success Chance</Label>
                  <div className="flex items-center gap-4">
                    <input
                      id="chanceRating"
                      type="range"
                      min="1"
                      max="10"
                      value={formData.applicationChanceRating}
                      onChange={(e) =>
                        handleSliderChange("applicationChanceRating", parseInt(e.target.value))
                      }
                      className="flex-1 h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <span className="text-sm font-medium min-w-[3rem] text-right">
                      {formData.applicationChanceRating}/10
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    How likely do you think you are to get this job?
                  </p>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="cvUsed">CV Used</Label>
                  <Input
                    id="cvUsed"
                    name="cvUsed"
                    value={formData.cvUsed}
                    onChange={handleInputChange}
                    placeholder="e.g., Tech_CV_v3.pdf, Software_Engineer_Resume_2025.docx"
                  />
                  <p className="text-xs text-muted-foreground">
                    Optional: Record which CV version you used for this application
                  </p>
                </div>
              </div>
            </div>

            {/* Skills & Match Analysis Section */}
            <div className="space-y-4">
              <div className="flex items-start gap-3 mb-4">
                <div className="text-2xl">🎯</div>
                <div>
                  <h3 className="text-xl font-semibold">Skills & Match Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    Keywords and how well you match this role
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="keywords">Keywords & Skills</Label>
                  <div className="flex flex-wrap gap-2 p-2 border rounded-md bg-background min-h-[42px]">
                    {formData.keywords.map((keyword, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="gap-1 pr-1"
                      >
                        {keyword}
                        <button
                          type="button"
                          onClick={() => removeTag("keywords", index)}
                          className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                    <input
                      id="keywords"
                      type="text"
                      value={keywordsInput}
                      onChange={(e) =>
                        handleTagInput("keywords", e.target.value, setKeywordsInput)
                      }
                      onKeyDown={(e) =>
                        handleTagKeyDown(e, "keywords", keywordsInput, setKeywordsInput)
                      }
                      placeholder="Add skills and keywords (press Enter or comma)"
                      className="flex-1 min-w-[200px] outline-none bg-transparent text-sm"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Technical skills, soft skills, and relevant keywords
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fits">Perfect Matches</Label>
                  <div className="flex flex-wrap gap-2 p-2 border rounded-md bg-background min-h-[42px]">
                    {formData.fits.map((fit, index) => (
                      <Badge
                        key={index}
                        variant="default"
                        className="gap-1 pr-1 bg-green-600 hover:bg-green-700"
                      >
                        {fit}
                        <button
                          type="button"
                          onClick={() => removeTag("fits", index)}
                          className="ml-1 hover:bg-green-800 rounded-full p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                    <input
                      id="fits"
                      type="text"
                      value={fitsInput}
                      onChange={(e) =>
                        handleTagInput("fits", e.target.value, setFitsInput)
                      }
                      onKeyDown={(e) =>
                        handleTagKeyDown(e, "fits", fitsInput, setFitsInput)
                      }
                      placeholder="Add your strengths that match this role"
                      className="flex-1 min-w-[200px] outline-none bg-transparent text-sm"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    What makes you a great fit for this position?
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gaps">Areas to Address</Label>
                  <div className="flex flex-wrap gap-2 p-2 border rounded-md bg-background min-h-[42px]">
                    {formData.gaps.map((gap, index) => (
                      <Badge
                        key={index}
                        variant="destructive"
                        className="gap-1 pr-1"
                      >
                        {gap}
                        <button
                          type="button"
                          onClick={() => removeTag("gaps", index)}
                          className="ml-1 hover:bg-destructive/80 rounded-full p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                    <input
                      id="gaps"
                      type="text"
                      value={gapsInput}
                      onChange={(e) =>
                        handleTagInput("gaps", e.target.value, setGapsInput)
                      }
                      onKeyDown={(e) =>
                        handleTagKeyDown(e, "gaps", gapsInput, setGapsInput)
                      }
                      placeholder="Add areas you need to develop"
                      className="flex-1 min-w-[200px] outline-none bg-transparent text-sm"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Skills or experience you're still building
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Details Section */}
            <div className="space-y-4">
              <div className="flex items-start gap-3 mb-4">
                <div className="text-2xl">📝</div>
                <div>
                  <h3 className="text-xl font-semibold">Additional Details</h3>
                  <p className="text-sm text-muted-foreground">
                    Summary and full job description
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="jobSummary">Job Summary</Label>
                  <Textarea
                    id="jobSummary"
                    name="jobSummary"
                    value={formData.jobSummary}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Brief overview of the role and key responsibilities..."
                  />
                  <p className="text-xs text-muted-foreground">
                    A concise summary of what this job involves
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jobDescription">Full Job Description</Label>
                  <Textarea
                    id="jobDescription"
                    name="jobDescription"
                    value={formData.jobDescription}
                    onChange={handleInputChange}
                    rows={6}
                    placeholder="Full job posting content including requirements, benefits, etc..."
                    className="resize-y"
                  />
                  <p className="text-xs text-muted-foreground">
                    Complete job posting for future reference
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                <span className="mr-2">💾</span>
                Save Application
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={handleClear}
                className="flex-1"
              >
                <span className="mr-2">🔄</span>
                Clear Form
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddApplicationPage;
