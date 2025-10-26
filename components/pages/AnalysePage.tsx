"use client";

import { useState, useRef, KeyboardEvent, ChangeEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface AnalysePageProps {
  environment: string;
}

interface JobDetails {
  title: string;
  company: string;
  location?: string;
  salary?: string;
  type?: string;
}

interface AnalysisResult {
  jobDetails: JobDetails;
  fitScore: number;
  alignScore: number;
  keywords: string[];
  perfectFits: string[];
  gaps: string[];
  summary: string;
  fullDescription: string;
  cvSuggestions?: {
    selectedCV: string;
    reason: string;
    documentLink?: string;
    tweaks: string[];
  };
  coverLetter?: string;
}

export default function AnalysePage({ environment }: AnalysePageProps) {
  const [jobText, setJobText] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(1);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [showRatingInputs, setShowRatingInputs] = useState(false);
  const [showCoverSection, setShowCoverSection] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [effort, setEffort] = useState(7);
  const [chance, setChance] = useState(6);
  const [cvUsed, setCvUsed] = useState("");
  const [coverLetterLoading, setCoverLetterLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const maxChars = 30000;
  const charCount = jobText.length;

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (text.length <= maxChars) {
      setJobText(text);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      handleAnalyse();
    }
  };

  const handleAnalyse = async () => {
    if (!jobText.trim()) return;

    setIsLoading(true);
    setAnalysisResult(null);
    setShowRatingInputs(false);
    setShowCoverSection(false);
    setShowDetails(false);

    // Simulate loading steps
    setLoadingStep(1);
    await new Promise(resolve => setTimeout(resolve, 800));
    setLoadingStep(2);
    await new Promise(resolve => setTimeout(resolve, 800));
    setLoadingStep(3);
    await new Promise(resolve => setTimeout(resolve, 800));

    // Mock analysis result (replace with actual API call)
    const mockResult: AnalysisResult = {
      jobDetails: {
        title: "Software Engineer",
        company: "Tech Corp",
        location: "London, UK",
        salary: "£50,000 - £70,000",
        type: "Full-time"
      },
      fitScore: 85,
      alignScore: 78,
      keywords: ["React", "TypeScript", "Node.js", "AWS", "Agile", "REST APIs"],
      perfectFits: [
        "Strong TypeScript and React experience",
        "Experience with cloud platforms (AWS)",
        "Agile development methodology"
      ],
      gaps: [
        "Limited experience with GraphQL",
        "No mention of Kubernetes in CV",
        "Could improve DevOps knowledge"
      ],
      summary: "This is an excellent opportunity for a mid-level software engineer. The role focuses on full-stack development with modern technologies. The company values innovation and offers strong growth potential.",
      fullDescription: jobText
    };

    setAnalysisResult(mockResult);
    setIsLoading(false);
  };

  const handleSave = () => {
    console.log("Saving job for later...");
    // Implement save functionality
  };

  const handleApply = () => {
    setShowRatingInputs(true);
  };

  const handleConfirmApply = () => {
    console.log("Confirming application with effort:", effort, "chance:", chance, "CV:", cvUsed);
    setShowRatingInputs(false);
    // Implement confirm functionality
  };

  const handleCoverLetter = async () => {
    setShowCoverSection(true);
    setCoverLetterLoading(true);

    // Simulate loading cover letter
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (analysisResult) {
      setAnalysisResult({
        ...analysisResult,
        cvSuggestions: {
          selectedCV: "Tech_CV_v3.pdf",
          reason: "Best matches the technical requirements",
          documentLink: "https://docs.google.com/document/d/...",
          tweaks: [
            "Emphasize your React and TypeScript projects",
            "Add metrics to your cloud infrastructure work",
            "Highlight agile methodology experience"
          ]
        },
        coverLetter: "Dear Hiring Manager,\n\nI am writing to express my strong interest in the Software Engineer position at Tech Corp. With my extensive experience in React and TypeScript development, combined with my cloud infrastructure expertise, I am confident I would be a valuable addition to your team.\n\nYour requirements align perfectly with my background in building scalable web applications using modern frameworks. I am particularly excited about the opportunity to work with cutting-edge technologies and contribute to innovative projects.\n\nThank you for your consideration."
      });
    }

    setCoverLetterLoading(false);
  };

  const handleIgnore = () => {
    console.log("Dismissing job...");
    setAnalysisResult(null);
    setJobText("");
    setSourceUrl("");
  };

  const handleCopyCover = () => {
    if (analysisResult?.coverLetter) {
      navigator.clipboard.writeText(analysisResult.coverLetter);
      // Show toast notification
    }
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="text-center space-y-3 py-8">
        <div className="flex justify-center gap-4 mb-4" aria-hidden="true">
          <div className="text-4xl animate-bounce" style={{ animationDelay: "0s" }}>🎓</div>
          <div className="text-4xl animate-bounce" style={{ animationDelay: "0.2s" }}>📊</div>
          <div className="text-4xl animate-bounce" style={{ animationDelay: "0.4s" }}>⚡️</div>
        </div>
        <h2 className="text-3xl font-bold tracking-tight">Analyse any job in seconds</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Paste the job description and we'll surface key requirements, fit scores, and insights
          so you can prioritise your applications with confidence.
        </p>
      </div>

      {/* Input Form */}
      <Card>
        <CardContent className="pt-6 space-y-6">
          {/* Job Description Textarea */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="jobText">Paste job description</Label>
              <span className="text-sm text-muted-foreground">
                {charCount} / {maxChars}
              </span>
            </div>
            <div className="relative">
              <Textarea
                ref={textareaRef}
                id="jobText"
                value={jobText}
                onChange={handleTextChange}
                onKeyDown={handleKeyDown}
                placeholder="Cmd/Ctrl+A then Cmd/Ctrl+C on the job page, and paste here…"
                className="min-h-[200px] resize-y"
                autoComplete="off"
              />
              <div className="mt-2 space-y-1">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                    ⌘
                  </kbd>
                  <span>Press Cmd/Ctrl + Enter to analyse instantly</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="text-base">✨</span>
                  <span>We extract salary, skills, and key requirements</span>
                </div>
              </div>
            </div>
          </div>

          {/* Source URL Input */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="jobSourceUrl">Source URL</Label>
              <Badge variant="secondary" className="text-xs">Optional</Badge>
            </div>
            <Input
              id="jobSourceUrl"
              type="url"
              value={sourceUrl}
              onChange={(e) => setSourceUrl(e.target.value)}
              placeholder="https://example.com/jobs/role"
              autoComplete="off"
            />
            <p className="text-xs text-muted-foreground">
              Provide the original posting to auto-fill canonical links.
            </p>
          </div>

          {/* Analyse Button */}
          <Button
            onClick={handleAnalyse}
            disabled={!jobText.trim() || isLoading}
            className="w-full relative overflow-hidden group"
            size="lg"
          >
            <span className="mr-2">🔍</span>
            <span>{isLoading ? "Analysing..." : "Analyse role"}</span>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
          </Button>
        </CardContent>
      </Card>

      {/* Loading State */}
      {isLoading && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-8 py-8">
              {/* Loading Animation */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative w-24 h-24">
                  <span className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
                  <span className="absolute inset-2 rounded-full bg-primary/20 animate-ping" style={{ animationDelay: "0.2s" }} />
                  <span className="absolute inset-4 rounded-full bg-primary/20 animate-ping" style={{ animationDelay: "0.4s" }} />
                </div>
                <h3 className="text-xl font-semibold">Analysing your role</h3>
                <p className="text-sm text-muted-foreground text-center max-w-md">
                  We're highlighting crucial requirements, skills, and compensation details.
                </p>
              </div>

              {/* Loading Steps */}
              <div className="space-y-4 max-w-md mx-auto">
                {[
                  { step: 1, icon: "📥", text: "Capturing the job description" },
                  { step: 2, icon: "🧠", text: "Extracting key skills & requirements" },
                  { step: 3, icon: "🚀", text: "Summarising insights for you" }
                ].map((item) => (
                  <div
                    key={item.step}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                      loadingStep >= item.step
                        ? "bg-primary/10 border border-primary/20"
                        : "bg-muted/50"
                    }`}
                  >
                    <div className="text-2xl">{item.icon}</div>
                    <div className="text-sm font-medium">{item.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results Section */}
      {analysisResult && !isLoading && (
        <Card>
          <CardContent className="pt-6 space-y-6">
            {/* Job Header */}
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">{analysisResult.jobDetails.title}</h2>
              <div className="text-lg text-muted-foreground">{analysisResult.jobDetails.company}</div>
              <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                {analysisResult.jobDetails.location && (
                  <Badge variant="outline">{analysisResult.jobDetails.location}</Badge>
                )}
                {analysisResult.jobDetails.salary && (
                  <Badge variant="outline">{analysisResult.jobDetails.salary}</Badge>
                )}
                {analysisResult.jobDetails.type && (
                  <Badge variant="outline">{analysisResult.jobDetails.type}</Badge>
                )}
              </div>
            </div>

            <Separator />

            {/* Scores Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="pt-6 space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">AI Fit Score</div>
                  <div className="text-3xl font-bold">{analysisResult.fitScore}%</div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-500"
                      style={{ width: `${analysisResult.fitScore}%` }}
                    />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">Alignment Score</div>
                  <div className="text-3xl font-bold">{analysisResult.alignScore}%</div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-500"
                      style={{ width: `${analysisResult.alignScore}%` }}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Keywords */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {analysisResult.keywords.map((keyword, index) => (
                  <Badge key={index} variant="secondary">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            {/* Perfect Fits and Gaps */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <span>✅</span>
                  <span>Perfect fits</span>
                </h3>
                <ul className="space-y-2">
                  {analysisResult.perfectFits.map((fit, index) => (
                    <li key={index} className="text-sm text-muted-foreground pl-6 relative">
                      <span className="absolute left-0">•</span>
                      {fit}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <span>⚠️</span>
                  <span>Areas to address</span>
                </h3>
                <ul className="space-y-2">
                  {analysisResult.gaps.map((gap, index) => (
                    <li key={index} className="text-sm text-muted-foreground pl-6 relative">
                      <span className="absolute left-0">•</span>
                      {gap}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Separator />

            {/* Job Summary */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Job summary</h3>
              <div className="text-sm text-muted-foreground leading-relaxed bg-muted/50 p-4 rounded-lg">
                {analysisResult.summary}
              </div>
            </div>

            <Separator />

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <Button
                variant="outline"
                className="h-auto flex-col items-start p-4 hover:bg-accent"
                onClick={handleSave}
              >
                <div className="text-2xl mb-1">💾</div>
                <div className="font-semibold text-left">Save for Later</div>
                <div className="text-xs text-muted-foreground">Add to saved jobs</div>
              </Button>

              <Button
                variant="outline"
                className="h-auto flex-col items-start p-4 hover:bg-accent"
                onClick={handleApply}
              >
                <div className="text-2xl mb-1">✅</div>
                <div className="font-semibold text-left">I Applied!</div>
                <div className="text-xs text-muted-foreground">Mark as applied</div>
              </Button>

              <Button
                variant="outline"
                className="h-auto flex-col items-start p-4 hover:bg-accent"
                onClick={handleCoverLetter}
              >
                <div className="text-2xl mb-1">📝</div>
                <div className="font-semibold text-left">Cover Letter & CV</div>
                <div className="text-xs text-muted-foreground">Get AI assistance</div>
              </Button>

              <Button
                variant="outline"
                className="h-auto flex-col items-start p-4 hover:bg-destructive/10 hover:text-destructive"
                onClick={handleIgnore}
              >
                <div className="text-2xl mb-1">❌</div>
                <div className="font-semibold text-left">Not Interested</div>
                <div className="text-xs text-muted-foreground">Dismiss this job</div>
              </Button>
            </div>

            {/* Rating Inputs */}
            {showRatingInputs && (
              <Card className="bg-muted/50">
                <CardContent className="pt-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="effort">Effort /10</Label>
                      <Input
                        id="effort"
                        type="number"
                        min="0"
                        max="10"
                        step="1"
                        value={effort}
                        onChange={(e) => setEffort(Number(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="chance">Chance /10</Label>
                      <Input
                        id="chance"
                        type="number"
                        min="0"
                        max="10"
                        step="1"
                        value={chance}
                        onChange={(e) => setChance(Number(e.target.value))}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvUsed" className="flex items-center gap-2">
                      <span>📄</span>
                      <span>CV Used (optional)</span>
                    </Label>
                    <Input
                      id="cvUsed"
                      type="text"
                      value={cvUsed}
                      onChange={(e) => setCvUsed(e.target.value)}
                      placeholder="e.g., Tech_CV_v3.pdf, Software_Engineer_Resume_2025.docx"
                    />
                    <p className="text-xs text-muted-foreground">
                      Record which CV version you used for future reference
                    </p>
                  </div>
                  <Button onClick={handleConfirmApply} className="w-full">
                    Confirm
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Cover Letter Section */}
            {showCoverSection && (
              <Card className="bg-muted/50">
                <CardContent className="pt-6 space-y-4">
                  {coverLetterLoading ? (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
                      <span>Preparing cover letter & CV tips…</span>
                    </div>
                  ) : (
                    <>
                      {analysisResult.cvSuggestions && (
                        <div className="space-y-3">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <div className="font-medium mb-1">Selected CV</div>
                              <div className="text-muted-foreground">{analysisResult.cvSuggestions.selectedCV}</div>
                            </div>
                            <div>
                              <div className="font-medium mb-1">Why this CV</div>
                              <div className="text-muted-foreground">{analysisResult.cvSuggestions.reason}</div>
                            </div>
                            <div>
                              <div className="font-medium mb-1">Cover letter doc</div>
                              <div className="text-muted-foreground">
                                {analysisResult.cvSuggestions.documentLink ? (
                                  <a href={analysisResult.cvSuggestions.documentLink} className="text-primary hover:underline">
                                    Open in Google Docs
                                  </a>
                                ) : (
                                  "—"
                                )}
                              </div>
                            </div>
                          </div>

                          <Separator />

                          <div className="space-y-3">
                            <h3 className="text-lg font-semibold">CV tweak suggestions</h3>
                            <ul className="space-y-2">
                              {analysisResult.cvSuggestions.tweaks.map((tweak, index) => (
                                <li key={index} className="text-sm text-muted-foreground pl-6 relative">
                                  <span className="absolute left-0">•</span>
                                  {tweak}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}

                      {analysisResult.coverLetter && (
                        <>
                          <Separator />
                          <div className="space-y-3">
                            <h3 className="text-lg font-semibold">Cover letter (preview)</h3>
                            <div className="bg-background p-4 rounded-lg border text-sm whitespace-pre-wrap">
                              {analysisResult.coverLetter}
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" onClick={handleCopyCover}>
                                Copy text
                              </Button>
                              {analysisResult.cvSuggestions?.documentLink && (
                                <Button onClick={() => window.open(analysisResult.cvSuggestions!.documentLink, '_blank')}>
                                  Open Google Doc
                                </Button>
                              )}
                            </div>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Details Toggle Section */}
            <div className="space-y-4">
              <Button variant="outline" onClick={toggleDetails} className="w-full">
                {showDetails ? "View less" : "View more"}
              </Button>
              {showDetails && (
                <Card className="bg-muted/50">
                  <CardContent className="pt-6 space-y-3">
                    <h3 className="text-lg font-semibold">Full description</h3>
                    <div className="text-sm text-muted-foreground whitespace-pre-wrap">
                      {analysisResult.fullDescription}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </CardContent>
        </Card>
      )}

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
