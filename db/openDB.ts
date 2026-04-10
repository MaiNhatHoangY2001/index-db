const DB_NAME = "app_db";
const DB_VERSION = 1;

export const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);

    request.onupgradeneeded = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains("customers")) {
        const store = db.createObjectStore("customers", {
          keyPath: "userid",
        });
        store.createIndex("name", "name", { unique: false });
        store.createIndex("email", "email", { unique: true });
      }

      if (!db.objectStoreNames.contains("logs")) {
        const logStore = db.createObjectStore("logs", {
          keyPath: "id",
          autoIncrement: true,
        });

        logStore.createIndex("time", "time");
        logStore.createIndex("level", "level");
        logStore.createIndex("level_time", ["level", "time"]);
      }
    };

    request.onsuccess = () => resolve(request.result);
  });
};
