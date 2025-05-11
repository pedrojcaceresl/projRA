// global.d.ts
declare module "@google/model-viewer";

declare namespace JSX {
	interface IntrinsicElements {
		"model-viewer": React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLElement> & {
				src?: string;
				alt?: string;
				ar?: boolean;
				"ar-modes"?: string;
				"camera-controls"?: boolean;
				"auto-rotate"?: boolean;
				slot?: string;
			},
			HTMLElement
		>;
	}
}
