declare module "html2canvas" {
	export default function html2canvas(element: HTMLElement, options?: Partial<{ backgroundColor: string; scale: number }>): Promise<HTMLCanvasElement>;
}
declare module "qrcode" {
	export function toDataURL(text: string, opts?: any): Promise<string>;
	const _default: { toDataURL: typeof toDataURL };
	export default _default;
}

// Minimal PWA install prompt event typing
interface BeforeInstallPromptEvent extends Event {
	prompt: () => Promise<void>;
	userChoice?: Promise<{ outcome: "accepted" | "dismissed"; platform?: string }>
}

declare global {
	interface WindowEventMap {
		beforeinstallprompt: BeforeInstallPromptEvent;
		appinstalled: Event;
	}
}
