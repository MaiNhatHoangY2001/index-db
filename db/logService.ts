import { openDB } from "./openDB";

const STORE = "logs";

export type LogLevel = "INF" | "DEBUG" | "WARN" | "ERR";

export type LogData = {
  id?: number;
  time: number;
  label: string;
  level: LogLevel;
};

// ✅ Add log
export const addLog = async (log: LogData) => {
  const db = await openDB();

  const tx = db.transaction(STORE, "readwrite");
  const store = tx.objectStore(STORE);

  store.add(log);

  return new Promise((res, rej) => {
    tx.oncomplete = () => res(true);
    tx.onerror = () => rej(tx.error);
  });
};

// ✅ Get all logs
export const getLogs = async () => {
  const db = await openDB();

  const tx = db.transaction(STORE, "readonly");
  const store = tx.objectStore(STORE);

  return new Promise<LogData[]>((resolve, reject) => {
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

// ✅ Get logs by level
export const getLogsByLevel = async (level: LogLevel) => {
  const db = await openDB();

  const tx = db.transaction(STORE, "readonly");
  const store = tx.objectStore(STORE);
  const index = store.index("level");

  return new Promise<LogData[]>((resolve, reject) => {
    const request = index.getAll(level);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

// ✅ Get logs by time range
export const getLogsByTimeRange = async (start: number, end: number) => {
  const db = await openDB();

  const tx = db.transaction(STORE, "readonly");
  const store = tx.objectStore(STORE);
  const index = store.index("time");

  const range = IDBKeyRange.bound(start, end);

  return new Promise<LogData[]>((resolve, reject) => {
    const request = index.getAll(range);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

// ✅ Clear logs
export const clearLogs = async () => {
  const db = await openDB();

  const tx = db.transaction(STORE, "readwrite");
  const store = tx.objectStore(STORE);

  store.clear();

  return new Promise((res, rej) => {
    tx.oncomplete = () => res(true);
    tx.onerror = () => rej(tx.error);
  });
};
