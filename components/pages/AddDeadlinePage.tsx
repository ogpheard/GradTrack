"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddDeadlinePageProps {
  environment: string;
}

type TimingType = "window" | "event";

interface DeadlineFormData {
  company: string;
  role: string;
  type: string;
  priority: string;
  timingType: TimingType;
  windowDate: string;
  windowTime: string;
  eventDate: string;
  eventStartTime: string;
  eventEndTime: string;
  timezone: string;
  location: string;
  meetingUrl: string;
  notes: string;
}

const AddDeadlinePage: React.FC<AddDeadlinePageProps> = ({ environment }) => {
  const [formData, setFormData] = useState<DeadlineFormData>({
    company: "",
    role: "",
    type: "",
    priority: "2",
    timingType: "window",
    windowDate: "",
    windowTime: "23:59",
    eventDate: "",
    eventStartTime: "",
    eventEndTime: "",
    timezone: "Europe/London",
    location: "",
    meetingUrl: "",
    notes: "",
  });

  const handleInputChange = (
    field: keyof DeadlineFormData,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTimingTypeChange = (type: TimingType) => {
    setFormData((prev) => ({
      ...prev,
      timingType: type,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // TODO: Implement actual form submission logic
  };

  const handleClearForm = () => {
    setFormData({
      company: "",
      role: "",
      type: "",
      priority: "2",
      timingType: "window",
      windowDate: "",
      windowTime: "23:59",
      eventDate: "",
      eventStartTime: "",
      eventEndTime: "",
      timezone: "Europe/London",
      location: "",
      meetingUrl: "",
      notes: "",
    });
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-4xl mx-auto p-6">
        {/* Hero Section */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-slate-900 mb-3">
              Add New Deadline
            </h1>
            <p className="text-lg text-slate-600">
              Create custom deadlines for interviews, assessments, and other
              important milestones.
            </p>
          </div>
          <div
            className="hidden md:flex items-center gap-4 text-5xl"
            aria-hidden="true"
          >
            <div className="animate-bounce" style={{ animationDelay: "0s" }}>
              📅
            </div>
            <div className="animate-bounce" style={{ animationDelay: "0.2s" }}>
              ⏰
            </div>
            <div className="animate-bounce" style={{ animationDelay: "0.4s" }}>
              🎯
            </div>
          </div>
        </div>

        {/* Form Card */}
        <Card className="shadow-lg border-slate-200">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information Section */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-800 border-b border-slate-200 pb-2">
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-slate-700">
                      Company <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) =>
                        handleInputChange("company", e.target.value)
                      }
                      placeholder="e.g. Google, Microsoft, Meta"
                      required
                      className="border-slate-300 focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role" className="text-slate-700">
                      Role <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="role"
                      value={formData.role}
                      onChange={(e) => handleInputChange("role", e.target.value)}
                      placeholder="e.g. Software Engineer, Product Manager"
                      required
                      className="border-slate-300 focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type" className="text-slate-700">
                      Type <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) => handleInputChange("type", value)}
                      required
                    >
                      <SelectTrigger
                        id="type"
                        className="border-slate-300 focus:border-blue-500"
                      >
                        <SelectValue placeholder="Select type..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="OA">Online Assessment</SelectItem>
                        <SelectItem value="HireVue">HireVue</SelectItem>
                        <SelectItem value="Interview">Interview</SelectItem>
                        <SelectItem value="Assessment">Assessment</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority" className="text-slate-700">
                      Priority
                    </Label>
                    <Select
                      value={formData.priority}
                      onValueChange={(value) =>
                        handleInputChange("priority", value)
                      }
                    >
                      <SelectTrigger
                        id="priority"
                        className="border-slate-300 focus:border-blue-500"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">High (1)</SelectItem>
                        <SelectItem value="2">Medium (2)</SelectItem>
                        <SelectItem value="3">Low (3)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Timing Section */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-800 border-b border-slate-200 pb-2">
                  Timing
                </h3>

                {/* Timing Type Selector */}
                <div className="space-y-3">
                  <div
                    className={`
                      relative flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all
                      ${
                        formData.timingType === "window"
                          ? "border-blue-500 bg-blue-50"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }
                    `}
                    onClick={() => handleTimingTypeChange("window")}
                  >
                    <div className="flex items-center h-6">
                      <div
                        className={`
                          w-5 h-5 rounded-full border-2 flex items-center justify-center
                          ${
                            formData.timingType === "window"
                              ? "border-blue-500"
                              : "border-slate-300"
                          }
                        `}
                      >
                        {formData.timingType === "window" && (
                          <div className="w-3 h-3 rounded-full bg-blue-500" />
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-slate-900 mb-1">
                        Time Window
                      </div>
                      <div className="text-sm text-slate-600">
                        Deadline with a closing time (e.g. submit by 11:59 PM)
                      </div>
                    </div>
                  </div>

                  <div
                    className={`
                      relative flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all
                      ${
                        formData.timingType === "event"
                          ? "border-blue-500 bg-blue-50"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }
                    `}
                    onClick={() => handleTimingTypeChange("event")}
                  >
                    <div className="flex items-center h-6">
                      <div
                        className={`
                          w-5 h-5 rounded-full border-2 flex items-center justify-center
                          ${
                            formData.timingType === "event"
                              ? "border-blue-500"
                              : "border-slate-300"
                          }
                        `}
                      >
                        {formData.timingType === "event" && (
                          <div className="w-3 h-3 rounded-full bg-blue-500" />
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-slate-900 mb-1">
                        Scheduled Event
                      </div>
                      <div className="text-sm text-slate-600">
                        Fixed time appointment (e.g. interview at 2:00 PM)
                      </div>
                    </div>
                  </div>
                </div>

                {/* Time Window Fields */}
                {formData.timingType === "window" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="windowDate" className="text-slate-700">
                        Deadline Date <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="windowDate"
                        type="date"
                        value={formData.windowDate}
                        onChange={(e) =>
                          handleInputChange("windowDate", e.target.value)
                        }
                        required
                        className="border-slate-300 focus:border-blue-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="windowTime" className="text-slate-700">
                        Deadline Time <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="windowTime"
                        type="time"
                        value={formData.windowTime}
                        onChange={(e) =>
                          handleInputChange("windowTime", e.target.value)
                        }
                        required
                        className="border-slate-300 focus:border-blue-500"
                      />
                    </div>
                  </div>
                )}

                {/* Scheduled Event Fields */}
                {formData.timingType === "event" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="eventDate" className="text-slate-700">
                        Event Date <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="eventDate"
                        type="date"
                        value={formData.eventDate}
                        onChange={(e) =>
                          handleInputChange("eventDate", e.target.value)
                        }
                        required
                        className="border-slate-300 focus:border-blue-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="eventStartTime" className="text-slate-700">
                        Start Time <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="eventStartTime"
                        type="time"
                        value={formData.eventStartTime}
                        onChange={(e) =>
                          handleInputChange("eventStartTime", e.target.value)
                        }
                        required
                        className="border-slate-300 focus:border-blue-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="eventEndTime" className="text-slate-700">
                        End Time
                      </Label>
                      <Input
                        id="eventEndTime"
                        type="time"
                        value={formData.eventEndTime}
                        onChange={(e) =>
                          handleInputChange("eventEndTime", e.target.value)
                        }
                        className="border-slate-300 focus:border-blue-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="timezone" className="text-slate-700">
                        Timezone
                      </Label>
                      <Select
                        value={formData.timezone}
                        onValueChange={(value) =>
                          handleInputChange("timezone", value)
                        }
                      >
                        <SelectTrigger
                          id="timezone"
                          className="border-slate-300 focus:border-blue-500"
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Europe/London">
                            Europe/London (GMT/BST)
                          </SelectItem>
                          <SelectItem value="America/New_York">
                            America/New_York (EST/EDT)
                          </SelectItem>
                          <SelectItem value="America/Los_Angeles">
                            America/Los_Angeles (PST/PDT)
                          </SelectItem>
                          <SelectItem value="Asia/Tokyo">
                            Asia/Tokyo (JST)
                          </SelectItem>
                          <SelectItem value="Australia/Sydney">
                            Australia/Sydney (AEST/AEDT)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </div>

              {/* Additional Details Section */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-800 border-b border-slate-200 pb-2">
                  Additional Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-slate-700">
                      Location
                    </Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) =>
                        handleInputChange("location", e.target.value)
                      }
                      placeholder="e.g. Video call, Office address"
                      className="border-slate-300 focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="meetingUrl" className="text-slate-700">
                      Meeting URL
                    </Label>
                    <Input
                      id="meetingUrl"
                      type="url"
                      value={formData.meetingUrl}
                      onChange={(e) =>
                        handleInputChange("meetingUrl", e.target.value)
                      }
                      placeholder="https://..."
                      className="border-slate-300 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-slate-700">
                    Notes
                  </Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    placeholder="Any additional information or preparation notes..."
                    rows={3}
                    className="border-slate-300 focus:border-blue-500 resize-none"
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  type="submit"
                  className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 px-8 text-base"
                >
                  <span className="mr-2">✅</span>
                  Create Deadline
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClearForm}
                  className="flex-1 sm:flex-none border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold py-6 px-8 text-base"
                >
                  <span className="mr-2">🔄</span>
                  Clear Form
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddDeadlinePage;
