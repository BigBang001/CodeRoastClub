import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface QRModalProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  dataUrl?: string;
}

export default function QRModal({ open, onOpenChange, dataUrl }: QRModalProps) {
  const download = () => {
    if (!dataUrl) return;
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "code-roast-qr.png";
    a.click();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm border-gray-700 bg-editor-bg">
        <DialogHeader>
          <DialogTitle>Share via QR</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4">
          {dataUrl ? (
            <img src={dataUrl} alt="QR code" className="w-48 h-48" />
          ) : (
            <div className="w-48 h-48 bg-gray-800 rounded" />
          )}
          <Button onClick={download} disabled={!dataUrl}>Download QR</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
