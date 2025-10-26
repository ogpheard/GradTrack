"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface RateApplyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (data: { effort: number; chance: number; cvUsed: string }) => void;
  applicationTitle?: string;
  companyName?: string;
}

export default function RateApplyModal({
  open,
  onOpenChange,
  onConfirm,
  applicationTitle = "this application",
  companyName,
}: RateApplyModalProps) {
  const [effort, setEffort] = useState(7);
  const [chance, setChance] = useState(6);
  const [cvUsed, setCvUsed] = useState("");

  const handleConfirm = () => {
    onConfirm({ effort, chance, cvUsed });
    onOpenChange(false);
    // Reset form
    setEffort(7);
    setChance(6);
    setCvUsed("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Mark as Applied
          </DialogTitle>
          <DialogDescription>
            {companyName ? (
              <>
                Rate your application for <strong>{applicationTitle}</strong> at{" "}
                <strong>{companyName}</strong>
              </>
            ) : (
              <>
                Rate your application for <strong>{applicationTitle}</strong>
              </>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Effort Rating */}
          <div className="space-y-2">
            <Label htmlFor="effort" className="text-base font-semibold">
              Application Effort
              <span className="ml-2 text-sm font-normal text-muted-foreground">
                ({effort}/10)
              </span>
            </Label>
            <div className="flex items-center gap-4">
              <Input
                type="range"
                id="effort"
                min="0"
                max="10"
                step="1"
                value={effort}
                onChange={(e) => setEffort(Number(e.target.value))}
                className="flex-1"
              />
              <Input
                type="number"
                min="0"
                max="10"
                value={effort}
                onChange={(e) => setEffort(Number(e.target.value))}
                className="w-16 text-center"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              How much effort did you put into this application?
            </p>
          </div>

          {/* Chance Rating */}
          <div className="space-y-2">
            <Label htmlFor="chance" className="text-base font-semibold">
              Success Chance
              <span className="ml-2 text-sm font-normal text-muted-foreground">
                ({chance}/10)
              </span>
            </Label>
            <div className="flex items-center gap-4">
              <Input
                type="range"
                id="chance"
                min="0"
                max="10"
                step="1"
                value={chance}
                onChange={(e) => setChance(Number(e.target.value))}
                className="flex-1"
              />
              <Input
                type="number"
                min="0"
                max="10"
                value={chance}
                onChange={(e) => setChance(Number(e.target.value))}
                className="w-16 text-center"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              How likely do you think you are to get this job?
            </p>
          </div>

          {/* CV Used */}
          <div className="space-y-2">
            <Label htmlFor="cvUsed" className="text-base font-semibold">
              📄 CV Used
              <span className="ml-2 text-sm font-normal text-muted-foreground">
                (optional)
              </span>
            </Label>
            <Input
              type="text"
              id="cvUsed"
              value={cvUsed}
              onChange={(e) => setCvUsed(e.target.value)}
              placeholder="e.g., Tech_CV_v3.pdf, Software_Engineer_Resume_2025.docx"
            />
            <p className="text-xs text-muted-foreground">
              Record which CV version you used for future reference
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button onClick={handleConfirm} className="flex-1">
            Confirm & Mark Applied
          </Button>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>

        <p className="text-xs text-muted-foreground pt-2">
          Your ratings and CV info will be saved with this application.
        </p>
      </DialogContent>
    </Dialog>
  );
}
