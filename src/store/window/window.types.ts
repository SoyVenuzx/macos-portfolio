import type { INITIAL_Z_INDEX, WINDOW_CONFIG } from "@/constants";
import type { LocationFileItem } from "@/types";

export type windowKeyType = keyof typeof WINDOW_CONFIG;
export type WindowData = LocationFileItem;
export type WindowEntry = Omit<
  (typeof WINDOW_CONFIG)[windowKeyType],
  "data"
> & {
  data: WindowData | null;
};
export type WindowConfig = {
  [Key in windowKeyType]: WindowEntry;
};

export interface WindowState {
  windows: WindowConfig;
  nextZIndex: typeof INITIAL_Z_INDEX;
}

export interface WindowActions {
  openWindow: (windowKey: windowKeyType, data?: WindowData | null) => void;
  closeWindow: (windowKey: windowKeyType) => void;
  focusWindow: (windowKey: windowKeyType) => void;
}

export type WindowStore = WindowState & WindowActions;
