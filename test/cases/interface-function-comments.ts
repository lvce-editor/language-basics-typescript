interface LocatorClickOptions {
  readonly button?: string;
}

interface LocatorExternal {
  /**
   * @deprecated Use commands instead to avoid race conditions.
   */
  readonly click: (options?: LocatorClickOptions) => Promise<void>;
  /**
   * @deprecated Use commands instead to avoid race conditions.
   */
  readonly dispatchEvent: (type: string, init: string) => Promise<void>;
  readonly first: () => ILocatorExternal;
  /**
   * @deprecated Use commands instead to avoid race conditions.
   */
  readonly hover: () => Promise<void>;
  readonly locator: (subSelector: string) => ILocatorExternal;
  readonly nth: (nth: number) => ILocatorExternal;
  /**
   * @deprecated Use commands instead to avoid race conditions.
   */
  readonly type: (text: string) => Promise<void>;
}

export interface UpdateConfig {
  readonly progress: number;
  readonly state: number;
}
