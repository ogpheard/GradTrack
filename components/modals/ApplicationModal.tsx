"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";

interface ApplicationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  application: any; // Replace with proper type
}

export default function ApplicationModal({
  open,
  onOpenChange,
  application,
}: ApplicationModalProps) {
  if (!application) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {application.title}
          </DialogTitle>
          <div className="text-lg text-muted-foreground">
            {application.company}
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status and Metadata */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{application.status}</Badge>
            {application.location && (
              <Badge variant="outline">📍 {application.location}</Badge>
            )}
            {application.salary && (
              <Badge variant="outline">💰 {application.salary}</Badge>
            )}
          </div>

          <Separator />

          {/* Fit Score */}
          {application.fitScore && (
            <div>
              <h3 className="font-semibold mb-2">AI Fit Score</h3>
              <div className="flex items-center gap-4">
                <div className="text-3xl font-bold text-primary">
                  {application.fitScore}%
                </div>
                <div className="flex-1">
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{ width: `${application.fitScore}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Keywords */}
          {application.keywords && application.keywords.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {application.keywords.map((keyword: string, idx: number) => (
                  <Badge key={idx} variant="secondary">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <Separator />

          {/* Job Summary */}
          {application.summary && (
            <div>
              <h3 className="font-semibold mb-2">Job Summary</h3>
              <p className="text-muted-foreground leading-relaxed">
                {application.summary}
              </p>
            </div>
          )}

          {/* Full Description */}
          {application.description && (
            <div>
              <h3 className="font-semibold mb-2">Full Description</h3>
              <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap max-h-64 overflow-y-auto p-4 bg-muted/50 rounded-lg">
                {application.description}
              </div>
            </div>
          )}

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            {application.appliedDate && (
              <div>
                <span className="font-semibold">Applied:</span>{" "}
                <span className="text-muted-foreground">
                  {application.appliedDate}
                </span>
              </div>
            )}
            {application.addedDate && (
              <div>
                <span className="font-semibold">Added:</span>{" "}
                <span className="text-muted-foreground">
                  {application.addedDate}
                </span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4">
            {application.sourceUrl && (
              <Button asChild variant="default">
                <a
                  href={application.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Original Posting
                </a>
              </Button>
            )}
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
