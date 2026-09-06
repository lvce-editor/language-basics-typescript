type RowData = {
  text: string | null;
  status: "done" | "next" | "pending";
};

type WaitForOptions = {
  timeout?: number;
};

export type TestHelpers = {
  load: (sample: string) => Promise<void>;
  loadCode: (server: string, client: string) => Promise<void>;
  step: () => Promise<string | null>;
  stepAll: () => Promise<string | null>;
  stepInfo: () => Promise<string>;
  getRows: () => Promise<RowData[]>;
  preview: (waitFor?: string) => Promise<string>;
  tree: () => Promise<string | null>;
  checkNoRemainingSteps: () => Promise<void>;
  frame: () => FrameLocator;
  waitFor: (predicate: () => boolean, options?: WaitForOptions) => Promise<void>;
};

let prevRowTexts: (string | null)[] = [];
let prevStatuses: ("done" | "next" | "pending")[] = [];
let prevPreview = "";
let previewAsserted = true;
let pageRef: Page | null = null;
let frameRef: FrameLocator | null = null;

export function createHelpers(page: Page): TestHelpers {
  pageRef = page;
  // Wait for iframe to load
}
