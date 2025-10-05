// Lightweight OCR facade for the Image Roast page.
// Uses dynamic import to keep initial bundle small.

export type OcrProgress = {
  status: string;
  progress: number; // 0..1
};

export async function preprocessImageToDataUrl(file: File): Promise<string> {
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = url;
  });

  // Upscale small images to improve OCR accuracy
  const scale = Math.max(1, Math.min(2, 1400 / Math.max(img.width, img.height)));
  const targetW = Math.round(img.width * scale);
  const targetH = Math.round(img.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = targetW;
  canvas.height = targetH;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported");

  // Simple pre-processing to help OCR on low-quality images
  // Convert to grayscale and bump contrast slightly
  // Note: ctx.filter is widely supported in modern browsers
  // Fallback: draw without filter if not supported
  try {
    // @ts-ignore
    ctx.filter = "grayscale(100%) contrast(150%)";
  } catch {}
  ctx.drawImage(img, 0, 0, targetW, targetH);

  const dataUrl = canvas.toDataURL("image/png");
  return dataUrl;
}

export async function extractTextFromImage(
  file: File | string,
  onProgress?: (p: OcrProgress) => void,
): Promise<string> {
  const { createWorker } = await import("tesseract.js");

  const worker = await createWorker("eng", undefined, {
    logger: (m: any) => {
      if (m?.status && typeof m?.progress === "number") {
        onProgress?.({ status: m.status, progress: m.progress });
      }
    },
  });

  try {
    // Preserve spaces to keep indentation; boost DPI to improve recognition on screenshots
    await worker.setParameters({
      preserve_interword_spaces: "1",
      user_defined_dpi: "300",
    });

    const imageSource = typeof file === "string" ? file : await preprocessImageToDataUrl(file);
    const { data } = await worker.recognize(imageSource, { rotateAuto: true });
    return postProcessCode(data.text);
  } finally {
    await worker.terminate();
  }
}

function postProcessCode(text: string): string {
  // Normalize line endings, trim leading/trailing empty lines, and fix common OCR artifacts
  let out = text.replace(/\r\n?/g, "\n");
  // Replace fancy quotes
  out = out.replace(/[“”]/g, '"').replace(/[‘’]/g, "'");
  // Collapse >2 blank lines to just one
  out = out.replace(/\n{3,}/g, "\n\n");
  // Trim outer whitespace
  out = out.trim();
  return out;
}
