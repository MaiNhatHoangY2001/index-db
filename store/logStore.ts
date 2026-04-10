import { create } from "zustand";

export type LogLevel = "INF" | "DEBUG" | "WARN" | "ERR";

export type LogData = {
  id?: number;
  time: number;
  label: string;
  level: LogLevel;
};

type LogStore = {
  logs: LogData[];

  addLog: (log: LogData) => void;
  log: (label: string, level?: LogLevel) => void;
  clearLogs: () => void;
};

export const useLogStore = create<LogStore>((set) => ({
  logs: [],

  addLog: (log) =>
    set((state) => {
      const next = [...state.logs, log];
      return { logs: next.slice(-200) };
    }),

  log: (label, level = "INF") =>
    set((state) => {
      const next = [
        ...state.logs,
        {
          time: Date.now(),
          label,
          level,
        },
      ];

      return { logs: next.slice(-200) };
    }),

  clearLogs: () => set({ logs: [] }),
}));
