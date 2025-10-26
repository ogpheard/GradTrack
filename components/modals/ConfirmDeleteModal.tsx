"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface ConfirmDeleteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  itemTitle?: string;
  itemDescription?: string;
}

export default function ConfirmDeleteModal({
  open,
  onOpenChange,
  onConfirm,
  itemTitle = "this entry",
  itemDescription,
}: ConfirmDeleteModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </div>
            <DialogTitle className="text-xl font-bold">
              Delete {itemTitle}?
            </DialogTitle>
          </div>
          <DialogDescription className="text-base">
            {itemDescription ||
              "This action cannot be undone. This will permanently delete this entry from your records."}
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-3 pt-4">
          <Button
            variant="destructive"
            onClick={handleConfirm}
            className="flex-1"
          >
            Delete
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
          This will permanently remove the entry from your database.
        </p>
      </DialogContent>
    </Dialog>
  );
}
