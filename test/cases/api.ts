export interface LocatorExpect {
	readonly toBeVisible: () => Promise<void>;
	readonly toHaveText: (text: string) => Promise<void>;
	readonly toContainText: (text: string) => Promise<void>;
	readonly toHaveValue: (value: string) => Promise<void>;
	readonly toBeFocused: () => Promise<void>;
	readonly toHaveCSS: (key: string, value: string) => Promise<void>;
	readonly toHaveAttribute: (key: string, value: string | null) => Promise<void>;
	readonly toHaveJSProperty: (key: string, value: any) => Promise<void>;
	readonly toHaveClass: (className: string) => Promise<void>;
	readonly toHaveId: (id: string) => Promise<void>;
	readonly toHaveCount: (count: number) => Promise<void>;
	readonly toBeHidden: () => Promise<void>;
	readonly not: LocatorExpect;
}

interface LocatorClickOptions {
	readonly button?: string;
}

interface ILocatorExternal {
	readonly click: (options: LocatorClickOptions) => Promise<void>;
	readonly hover: () => Promise<void>;
	readonly first: () => ILocatorExternal;
	readonly locator: (subSelector: string) => ILocatorExternal;
	readonly nth: (nth: number) => ILocatorExternal;
	readonly type: (text: string) => Promise<void>;
	readonly dispatchEvent: (type: string, init: string) => Promise<void>;
}

interface LocatorConstructor {
  (selector: string, option?: any): ILocatorExternal
}

export interface Diagnostic {
	readonly rowIndex: number;
	readonly columnIndex: number;
	readonly endRowIndex: number;
	readonly endColumnIndex: number;
	readonly message: string;
	readonly type: "error" | "warning";
}

export interface DroppedFileHandle {
	readonly id: number;
	readonly file: File;
}

export interface FileSystemTmpDirOptions {
	readonly scheme?: string;
}

interface Workspace {
  readonly openTmpDir: () => Promise<string>;
  readonly setPath: (path: string) => Promise<void>;
}

interface About {
  readonly focusNext: () => Promise<void>;
  readonly focusPrevious: () => Promise<void>;
  readonly handleClickClose: () => Promise<void>;
  readonly handleClickCopy: () => Promise<void>;
  readonly handleClickOk: () => Promise<void>;
  readonly show: () => Promise<void>;
}

interface ActivityBar {
  readonly focus: () => Promise<void>;
  readonly focusFirst: () => Promise<void>;
  readonly focusLast: () => Promise<void>;
  readonly focusNext: () => Promise<void>;
  readonly focusPrevious: () => Promise<void>;
  readonly handleClick: (index: number) => Promise<void>;
  readonly handleContextMenu: () => Promise<void>;
  readonly selectCurrent: () => Promise<void>;
}

interface BaseUrl {
  readonly getBaseUrl: () => string;
}

interface ClipBoard {
  readonly disableMemoryClipBoard: () => Promise<void>;
  readonly enableMemoryClipBoard: () => Promise<void>;
  readonly readNativeFiles: () => Promise<void>;
  readonly shouldHaveText: (expectedText: string | RegExp) => Promise<void>;
  readonly writeNativeFiles: (uris: readonly string[]) => Promise<void>;
}

interface Command {
  readonly execute: (id: string, ...args: readonly any[]) => Promise<any>;
}

interface ContextMenu {
  readonly selectItem: (text: string) => Promise<void>;
}

interface Developer {
  readonly openCacheFolder: () => Promise<void>;
  readonly openConfigFolder: () => Promise<void>;
  readonly openIframeInspector: () => Promise<void>;
  readonly openLogsFolder: () => Promise<void>;
  readonly openProcessExplorer: () => Promise<void>;
  readonly reloadColorTheme: () => Promise<void>;
  readonly reloadIconTheme: () => Promise<void>;
  readonly toggleDeveloperTools: () => Promise<void>;
}

interface Dialog {
  readonly executeMock: (id: number, ...args: readonly any[]) => string;
  readonly mockConfirm: (fn: () => boolean) => Promise<void>;
  readonly mockSaveFilePicker: (fn: () => string) => Promise<void>;
  readonly showSaveFilePicker: () => Promise<void>;
}

interface Editor {
  readonly addAllMissingImports: () => Promise<void>;
  readonly closeColorPicker: () => Promise<void>;
  readonly closeCompletion: () => Promise<void>;
  readonly closeCompletionDetails: () => Promise<void>;
  readonly copy: () => Promise<void>;
  readonly copyLineDown: () => Promise<void>;
  readonly copyLineUp: () => Promise<void>;
  readonly cursorCharacterLeft: () => Promise<void>;
  readonly cursorCharacterRight: () => Promise<void>;
  readonly cursorDown: () => Promise<void>;
  readonly cursorEnd: () => Promise<void>;
  readonly cursorHome: () => Promise<void>;
  readonly cursorUp: () => Promise<void>;
  readonly cursorWordLeft: () => Promise<void>;
  readonly cursorWordPartLeft: () => Promise<void>;
  readonly cursorWordPartRight: () => Promise<void>;
  readonly cursorWordRight: () => Promise<void>;
  readonly deleteAllLeft: () => Promise<void>;
  readonly deleteAllRight: () => Promise<void>;
  readonly executeTabCompletion: () => Promise<void>;
  readonly findAllImplementations: () => Promise<void>;
  readonly findAllReferences: () => Promise<void>;
  readonly format: () => Promise<void>;
  readonly getSelections: () => Promise<Uint32Array>;
  readonly getText: () => Promise<string>;
  readonly goToDefinition: () => Promise<void>;
  readonly goToTypeDefinition: () => Promise<void>;
  readonly growSelection: () => Promise<void>;
  readonly insertLineBreak: () => Promise<void>;
  readonly invokeBraceCompletion: (text: string) => Promise<void>;
  readonly invokeTabCompletion: () => Promise<void>;
  readonly openColorPicker: () => Promise<void>;
  readonly openCompletion: () => Promise<void>;
  readonly openCompletionDetails: () => Promise<void>;
  readonly openContextMenu: () => Promise<void>;
  readonly openEditorContextMenu: () => Promise<void>;
  readonly openFind: () => Promise<void>;
  readonly openFindWidget: () => Promise<void>;
  readonly openHover: () => Promise<void>;
  readonly openRename: () => Promise<void>;
  readonly openSourceActions: () => Promise<void>;
  readonly organizeImports: () => Promise<void>;
  readonly redo: () => Promise<void>;
  readonly rename: () => Promise<void>;
  readonly rename2: (newName: string) => Promise<void>;
  readonly selectAll: () => Promise<void>;
  readonly setCursor: (rowIndex: number, columnIndex: number) => Promise<void>;
  readonly setDeltaY: (deltaY: number) => Promise<void>;
  readonly setSelections: (selections: any) => Promise<void>;
  readonly shouldHaveDiagnostics: (expectedDiagnostics: readonly Diagnostic[]) => Promise<void>;
  readonly shouldHaveSelections: (expectedSelections: Uint32Array) => Promise<void>;
  readonly shouldHaveText: (expectedText: string) => Promise<void>;
  readonly showHover: () => Promise<void>;
  readonly sortImports: () => Promise<void>;
  readonly sourceActionsSelectCurrent: () => Promise<void>;
  readonly toggleBlockComment: () => Promise<void>;
  readonly toggleCompletionDetails: () => Promise<void>;
  readonly toggleLineComment: () => Promise<void>;
  readonly type: (text: string) => Promise<void>;
  readonly undo: () => Promise<void>;
}

interface EditorCompletion {
  readonly close: () => Promise<void>;
  readonly handlePointerdown: (clientX: number, clientY: number) => Promise<void>;
  readonly handleWheel: (deltaMode: number, deltaY: number) => Promise<void>;
  readonly selectCurrentIndex: () => Promise<void>;
  readonly selectIndex: (index: number) => Promise<void>;
}

interface EditorHover {
  readonly close: () => Promise<void>;
  readonly show: () => Promise<void>;
}

interface EditorRename {
  readonly accept: () => Promise<void>;
  readonly cancel: () => Promise<void>;
  readonly handleInput: (value: string) => Promise<void>;
}

interface EditorSourceAction {
  readonly selectCurrentIndex: () => Promise<void>;
  readonly selectIndex: (index: number) => Promise<void>;
}

interface Explorer {
  readonly acceptEdit: () => Promise<void>;
  readonly cancelEdit: () => Promise<void>;
  readonly clickCurrent: () => Promise<void>;
  readonly collapseAll: () => Promise<void>;
  readonly copyPath: () => Promise<void>;
  readonly copyRelativePath: () => Promise<void>;
  readonly expandAll: () => Promise<void>;
  readonly expandRecursively: () => Promise<void>;
  readonly focus: () => Promise<void>;
  readonly focusFirst: () => Promise<void>;
  readonly focusIndex: (index: number) => Promise<void>;
  readonly focusLast: () => Promise<void>;
  readonly focusNext: () => Promise<void>;
  readonly handleArrowLeft: () => Promise<void>;
  readonly handleBlur: () => Promise<void>;
  readonly handleClick: (index: number) => Promise<void>;
  readonly handleClickAt: (preventDefault: boolean, button: number, ctrlKey: boolean, shiftKey: boolean, x: number, y: number) => Promise<void>;
  readonly handleCopy: () => Promise<void>;
  readonly handleCut: () => Promise<void>;
  readonly handleDragLeave: () => Promise<void>;
  readonly handleDragOver: (x: number, y: number) => Promise<void>;
  readonly handleDragOverIndex: (index: number) => Promise<void>;
  readonly handleDrop: (x: number, y: number, fileIds: readonly number[], fileList: FileList | readonly File[]) => Promise<void>;
  readonly handleEscape: () => Promise<void>;
  readonly handleInputBlur: () => Promise<void>;
  readonly handlePaste: () => Promise<void>;
  readonly newFile: () => Promise<void>;
  readonly newFolder: () => Promise<void>;
  readonly openContextMenu: (index: number) => Promise<void>;
  readonly refresh: () => Promise<void>;
  readonly removeDirent: () => Promise<void>;
  readonly rename: () => Promise<void>;
  readonly renameDirent: () => Promise<void>;
  readonly selectAll: () => Promise<void>;
  readonly selectDown: () => Promise<void>;
  readonly selectIndices: (indices: readonly number[]) => Promise<void>;
  readonly selectUp: () => Promise<void>;
  readonly toggleIndividualSelection: (index: number) => Promise<void>;
  readonly updateEditingValue: (value: string) => Promise<void>;
}

interface Extension {
  readonly addNodeExtension: (relativePath: string) => Promise<void>;
  readonly addWebExtension: (relativePath: string) => Promise<void>;
}

interface ExtensionDetail {
  readonly handleClickCategory: (categoryId: string) => Promise<void>;
  readonly handleClickDisable: () => Promise<void>;
  readonly handleClickEnable: () => Promise<void>;
  readonly handleClickSetColorTheme: () => Promise<void>;
  readonly handleScroll: (scrollTop: number) => Promise<void>;
  readonly open: (extensionId: string) => Promise<void>;
  readonly openCommands: () => Promise<void>;
  readonly openFeature: (featureName: string) => Promise<void>;
  readonly openJsonValidation: () => Promise<void>;
  readonly openRuntimeStatus: () => Promise<void>;
  readonly openSettings: () => Promise<void>;
  readonly openThemes: () => Promise<void>;
  readonly openWebViews: () => Promise<void>;
  readonly selectChangelog: () => Promise<void>;
  readonly selectDetails: () => Promise<void>;
  readonly selectFeature: (name: string) => Promise<void>;
  readonly selectFeatures: () => Promise<void>;
  readonly selectTab: (name: string) => Promise<void>;
}

interface FileSystem {
  readonly addFileHandle: (file: File) => Promise<void>;
  readonly chmod: (uri: string, permissions: any) => Promise<void>;
  readonly createDroppedFileHandle: () => Promise<DroppedFileHandle>;
  readonly createExecutable: (content: string) => Promise<string>;
  readonly createExecutableFrom: (uri: string) => Promise<string>;
  readonly getTmpDir: ({ scheme }?: FileSystemTmpDirOptions) => Promise<string>;
  readonly loadFixture: (url: string) => Promise<string>;
  readonly mkdir: (uri: string) => Promise<void>;
  readonly readDir: (uri: string) => Promise<void>;
  readonly readFile: (uri: string) => Promise<string>;
  readonly remove: (uri: string) => Promise<void>;
  readonly writeFile: (uri: string, content: string) => Promise<void>;
  readonly writeJson: (uri: string, data: any) => Promise<void>;
}

interface FindWidget {
  readonly close: () => Promise<void>;
  readonly focusElement: (whenExpression: number) => Promise<void>;
  readonly focusNext: () => Promise<void>;
  readonly focusNextElement: () => Promise<void>;
  readonly focusPrevious: () => Promise<void>;
  readonly focusPreviousElement: () => Promise<void>;
  readonly replace: () => Promise<void>;
  readonly replaceAll: () => Promise<void>;
  readonly setReplaceValue: (value: string) => Promise<void>;
  readonly setValue: (value: string) => Promise<void>;
  readonly toggleMatchCase: () => Promise<void>;
  readonly toggleMatchWholeWord: () => Promise<void>;
  readonly togglePreserveCase: () => Promise<void>;
  readonly toggleReplace: () => Promise<void>;
  readonly toggleUseRegularExpression: () => Promise<void>;
}

interface IconTheme {
  readonly setIconTheme: (id: string) => Promise<void>;
}

interface IframeInspector {
  readonly focusFirst: () => Promise<void>;
  readonly focusLast: () => Promise<void>;
  readonly focusNext: () => Promise<void>;
  readonly focusPrevious: () => Promise<void>;
  readonly selectIndex: (index: number) => Promise<void>;
}

interface KeyBindingsEditor {
  readonly addKeyBinding: () => Promise<void>;
  readonly changeWhenExpression: () => Promise<void>;
  readonly clearInput: () => Promise<void>;
  readonly copyCommandId: () => Promise<void>;
  readonly copyCommandTitle: () => Promise<void>;
  readonly focusFirst: () => Promise<void>;
  readonly focusIndex: (index: number) => Promise<void>;
  readonly focusLast: () => Promise<void>;
  readonly focusNext: () => Promise<void>;
  readonly focusPrevious: () => Promise<void>;
  readonly handleClick: (x: number, y: number) => Promise<void>;
  readonly handleContextMenu: (button: number, x: number, y: number) => Promise<void>;
  readonly handleDoubleClick: (x: number, y: number) => Promise<void>;
  readonly handleInput: (value: string) => Promise<void>;
  readonly handleWheel: (deltaMode: number, deltaY: number) => Promise<void>;
  readonly open: () => Promise<void>;
  readonly removeKeyBinding: () => Promise<void>;
  readonly resetKeyBinding: () => Promise<void>;
  readonly showSameKeyBindings: () => Promise<void>;
  readonly sortByPrecedence: () => Promise<void>;
  readonly startRecordingKeys: () => Promise<void>;
  readonly stopRecordingKeys: () => Promise<void>;
  readonly toggleRecordingKeys: () => Promise<void>;
}

interface KeyBoard {
  readonly press: (key: string) => Promise<void>;
}

interface Main {
  readonly closeActiveEditor: () => Promise<void>;
  readonly closeAllEditors: () => Promise<void>;
  readonly closeOthers: () => Promise<void>;
  readonly closeTabsLeft: () => Promise<void>;
  readonly closeTabsRight: () => Promise<void>;
  readonly focusFirst: () => Promise<void>;
  readonly focusLast: () => Promise<void>;
  readonly focusNext: () => Promise<void>;
  readonly focusPrevious: () => Promise<void>;
  readonly openKeyBindings: () => Promise<void>;
  readonly openUri: (uri: string) => Promise<void>;
  readonly splitRight: () => Promise<void>;
}

interface Output {
  readonly clear: () => Promise<void>;
  readonly handleFilterInput: (text: string) => Promise<void>;
  readonly selectChannel: (channelId: string) => Promise<void>;
  readonly show: () => Promise<void>;
}

interface Panel {
  readonly open: (id: string) => Promise<void>;
  readonly openProblems: () => Promise<void>;
}

interface Platform {
  readonly getNodePath: () => Promise<string>;
  readonly isFirefox: () => boolean;
}

interface Problems {
  readonly copyMessage: () => Promise<void>;
  readonly focusIndex: (index: number) => Promise<void>;
  readonly handleArrowLeft: () => Promise<void>;
  readonly handleArrowRight: () => Promise<void>;
  readonly handleClickAt: (x: number, y: number) => Promise<void>;
  readonly handleFilterInput: (text: string) => Promise<void>;
  readonly handleIconThemeChange: () => Promise<void>;
  readonly show: () => Promise<void>;
  readonly viewAsList: () => Promise<void>;
  readonly viewAsTable: () => Promise<void>;
}

interface QuickPick {
  readonly executeCommand: (label: string) => Promise<void>;
  readonly focusFirst: () => Promise<void>;
  readonly focusIndex: (index: number) => Promise<void>;
  readonly focusLast: () => Promise<void>;
  readonly focusNext: () => Promise<void>;
  readonly focusPrevious: () => Promise<void>;
  readonly handleClickAt: (x: number, y: number) => Promise<void>;
  readonly handleInput: (value: string) => Promise<void>;
  readonly open: () => Promise<void>;
  readonly selectCurrentIndex: () => Promise<void>;
  readonly selectIndex: (index: number) => Promise<void>;
  readonly selectItem: (label: string) => Promise<void>;
  readonly setValue: (value: string) => Promise<void>;
}

interface References {
  readonly clear: () => Promise<void>;
  readonly collapseAll: () => Promise<void>;
  readonly refresh: () => Promise<void>;
}

interface RunAndDebug {
  readonly acceptWatchExpressionEdit: () => Promise<void>;
  readonly addWatchExpression: (expression: string) => Promise<void>;
  readonly handleClickSectionBreakPoints: () => Promise<void>;
  readonly handleClickSectionWatch: () => Promise<void>;
  readonly handleRename: () => Promise<void>;
  readonly handleSpace: () => Promise<void>;
  readonly handleWatchValueChange: () => Promise<void>;
  readonly selectIndex: (index: number) => Promise<void>;
  readonly setPauseOnExceptions: (value: number) => Promise<void>;
  readonly show: () => Promise<void>;
}

interface Search {
  readonly clearSearchResults: () => Promise<void>;
  readonly collapseAll: () => Promise<void>;
  readonly collapseDetails: () => Promise<void>;
  readonly copy: () => Promise<void>;
  readonly copyPath: () => Promise<void>;
  readonly dismissItem: () => Promise<void>;
  readonly focusFirst: () => Promise<void>;
  readonly focusIndex: (index: number) => Promise<void>;
  readonly focusNext: () => Promise<void>;
  readonly focusNextPage: () => Promise<void>;
  readonly focusPrevious: () => Promise<void>;
  readonly focusPreviousPage: () => Promise<void>;
  readonly handleListBlur: () => Promise<void>;
  readonly handleWheel: (deltaMode: number, deltaY: number) => Promise<void>;
  readonly open: () => Promise<void>;
  readonly openDetails: () => Promise<void>;
  readonly replaceAll: () => Promise<void>;
  readonly selectIndex: (index: number) => Promise<void>;
  readonly setExcludeValue: (value: string) => Promise<void>;
  readonly setIncludeValue: (value: string) => Promise<void>;
  readonly setLimit: (limit: number) => Promise<void>;
  readonly setReplaceValue: (value: string) => Promise<void>;
  readonly setValue: (value: string) => Promise<void>;
  readonly toggleMatchCase: () => Promise<void>;
  readonly toggleMatchWholeWord: () => Promise<void>;
  readonly togglePreserveCase: () => Promise<void>;
  readonly toggleReplace: () => Promise<void>;
  readonly toggleSearchDetails: () => Promise<void>;
  readonly toggleUseRegularExpression: () => Promise<void>;
}

interface Settings {
  readonly disableDiagnostics: () => Promise<void>;
  readonly enableDiagnostics: () => Promise<void>;
  readonly update: (settings: any) => Promise<void>;
}

interface SettingsView {
  readonly clear: (searchValue: string) => Promise<void>;
  readonly handleInput: (searchValue: string) => Promise<void>;
  readonly handleScroll: (scrollTop: number) => Promise<void>;
  readonly selectExtensions: () => Promise<void>;
  readonly selectTab: (tabId: string) => Promise<void>;
  readonly selectTextEditor: () => Promise<void>;
  readonly selectWorkspace: () => Promise<void>;
  readonly show: () => Promise<void>;
  readonly useNextSearchValue: () => Promise<void>;
  readonly usePreviousSearchValue: () => Promise<void>;
}

interface SideBar {
  readonly hide: () => Promise<void>;
  readonly open: (id: string) => Promise<void>;
}

interface SourceControl {
  readonly acceptInput: () => Promise<void>;
  readonly handleClickSourceControlButtons: (index: number, name: string) => Promise<void>;
  readonly handleInput: (text: string) => Promise<void>;
  readonly selectIndex: (index: number) => Promise<void>;
  readonly show: () => Promise<void>;
}

interface StatusBar {
  readonly update: () => Promise<void>;
}

interface TitleBarMenuBar {
  readonly closeMenu: () => Promise<void>;
  readonly focus: () => Promise<void>;
  readonly focusFirst: () => Promise<void>;
  readonly focusIndex: (index: number) => Promise<void>;
  readonly focusLast: () => Promise<void>;
  readonly focusNext: () => Promise<void>;
  readonly focusPrevious: () => Promise<void>;
  readonly handleKeyArrowDown: () => Promise<void>;
  readonly handleKeyArrowLeft: () => Promise<void>;
  readonly handleKeyArrowRight: () => Promise<void>;
  readonly handleKeyArrowUp: () => Promise<void>;
  readonly handleKeyEnd: () => Promise<void>;
  readonly handleKeyEscape: () => Promise<void>;
  readonly handleKeyHome: () => Promise<void>;
  readonly handleKeySpace: () => Promise<void>;
  readonly toggleIndex: (index: number) => Promise<void>;
  readonly toggleMenu: () => Promise<void>;
}

interface Url {
  readonly resolve: (relativePath: string) => string;
  readonly setUrl: (newUrl: string) => void;
}

interface WebView {
  readonly fromId: (webViewId: string) => Promise<any>;
}

export interface TestApi {
  readonly Workspace: Workspace
  readonly About: About
  readonly ActivityBar: ActivityBar
  readonly BaseUrl: BaseUrl
  readonly ClipBoard: ClipBoard
  readonly Command: Command
  readonly ContextMenu: ContextMenu
  readonly Developer: Developer
  readonly Dialog: Dialog
  readonly Editor: Editor
  readonly EditorCompletion: EditorCompletion
  readonly EditorHover: EditorHover
  readonly EditorRename: EditorRename
  readonly EditorSourceAction: EditorSourceAction
  readonly Explorer: Explorer
  readonly Extension: Extension
  readonly ExtensionDetail: ExtensionDetail
  readonly FileSystem: FileSystem
  readonly FindWidget: FindWidget
  readonly IconTheme: IconTheme
  readonly IframeInspector: IframeInspector
  readonly KeyBindingsEditor: KeyBindingsEditor
  readonly KeyBoard: KeyBoard
  readonly Main: Main
  readonly Output: Output
  readonly Panel: Panel
  readonly Platform: Platform
  readonly Problems: Problems
  readonly QuickPick: QuickPick
  readonly References: References
  readonly RunAndDebug: RunAndDebug
  readonly Search: Search
  readonly Settings: Settings
  readonly SettingsView: SettingsView
  readonly SideBar: SideBar
  readonly SourceControl: SourceControl
  readonly StatusBar: StatusBar
  readonly TitleBarMenuBar: TitleBarMenuBar
  readonly Url: Url
  readonly WebView: WebView
  readonly expect: (locator: ILocatorExternal) => LocatorExpect
  readonly Locator: (selector: string, option?: any) => ILocatorExternal
}

export interface Test {
  (api: TestApi): Promise<void>
}