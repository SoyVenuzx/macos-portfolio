import type { LocationFolderItem, LocationRoot, locationsType } from "@/types";

export interface LocationState {
  activeLocation: LocationRoot | LocationFolderItem | null;
}

export interface LocationActions {
  setActiveLocation: (
    location: keyof locationsType | LocationRoot | LocationFolderItem | null,
  ) => void;
  resetActiveLocation: () => void;
}

export type LocationStore = LocationState & LocationActions;
