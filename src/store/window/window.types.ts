import type { INITIAL_Z_INDEX, WINDOW_CONFIG } from "@/constants";

export type windowKeyType = keyof typeof WINDOW_CONFIG;

export interface WindowState {
  windows: typeof WINDOW_CONFIG;
  nextZIndex: typeof INITIAL_Z_INDEX;
}

export interface WindowActions {
  openWindow: (windowKey: windowKeyType, data?: null) => void;
  closeWindow: (windowKey: windowKeyType) => void;
  focusWindow: (windowKey: windowKeyType) => void;
}

export type WindowStore = WindowState & WindowActions;
