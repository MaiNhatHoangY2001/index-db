import { create } from "zustand";

type UIState = {
  isLoadEnabled: boolean;
  isQueryEnabled: boolean;
  isClearEnabled: boolean;

  setInitial: () => void;
  afterLoad: () => void;
  afterQuery: () => void;
  afterClear: () => void;
};

export const useUIStore = create<UIState>((set) => ({
  // initial state
  isLoadEnabled: true,
  isQueryEnabled: true,
  isClearEnabled: false,

  setInitial: () =>
    set({
      isLoadEnabled: true,
      isQueryEnabled: true,
      isClearEnabled: false,
    }),

  afterLoad: () =>
    set({
      isLoadEnabled: false,
      isQueryEnabled: true,
      isClearEnabled: true,
    }),

  afterQuery: () =>
    set({
      isLoadEnabled: false,
      isQueryEnabled: true,
      isClearEnabled: true,
    }),

  afterClear: () =>
    set({
      isLoadEnabled: true,
      isQueryEnabled: true,
      isClearEnabled: false,
    }),
}));
