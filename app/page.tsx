"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AnalysePage from "@/components/pages/AnalysePage";
import { ApplicationsPage } from "@/components/pages/ApplicationsPage";
import SavedPage from "@/components/pages/SavedPage";
import DeadlinesPage from "@/components/pages/DeadlinesPage";
import AddDeadlinePage from "@/components/pages/AddDeadlinePage";
import { AnalyticsPage } from "@/components/pages/AnalyticsPage";
import AddApplicationPage from "@/components/pages/AddApplicationPage";

export default function Home() {
  const [activeTab, setActiveTab] = useState("analyse");
  const [environment, setEnvironment] = useState("test");

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6 rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold tracking-tight">
              Graduate Applications Assistant
            </h1>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-7 gap-2">
                  <TabsTrigger value="analyse">Analyse</TabsTrigger>
                  <TabsTrigger value="applications">My Applications</TabsTrigger>
                  <TabsTrigger value="saved">Saved</TabsTrigger>
                  <TabsTrigger value="deadlines">Deadlines</TabsTrigger>
                  <TabsTrigger value="addDeadline">Add Deadline</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  <TabsTrigger value="add">Add Application</TabsTrigger>
                </TabsList>
              </Tabs>
              <Select value={environment} onValueChange={setEnvironment}>
                <SelectTrigger className="w-full lg:w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="test">Test</SelectItem>
                  <SelectItem value="prod">Production</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          {activeTab === "analyse" && <AnalysePage environment={environment} />}
          {activeTab === "applications" && (
            <ApplicationsPage environment={environment} />
          )}
          {activeTab === "saved" && <SavedPage environment={environment} />}
          {activeTab === "deadlines" && <DeadlinesPage environment={environment} />}
          {activeTab === "addDeadline" && <AddDeadlinePage environment={environment} />}
          {activeTab === "analytics" && <AnalyticsPage environment={environment} />}
          {activeTab === "add" && <AddApplicationPage environment={environment} />}
        </div>
      </div>
    </div>
  );
}
