import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { locations } from "@/constants";
import type { LocationStore } from "@/store/location/location.types";

const DEFAULT_LOCATION = locations.work;

const useLocationStore = create<LocationStore>()(
  immer((set) => ({
    activeLocation: DEFAULT_LOCATION,

    setActiveLocation: (location = null) => {
      return set((state) => {
        if (!location) {
          state.activeLocation = DEFAULT_LOCATION;
          return;
        }

        if (typeof location === "string") {
          state.activeLocation = locations[location];
          return;
        }

        state.activeLocation = location;
      });
    },

    resetActiveLocation: () => {
      set((state) => {
        state.activeLocation = DEFAULT_LOCATION;
      });
    },
  })),
);

export default useLocationStore;
