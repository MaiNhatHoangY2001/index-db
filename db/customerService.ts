import { openDB } from "./openDB";

export interface UserModel {
  userid: string;
  name: string;
  email: string;
  total_sales: string;
  create_date: string;
  update_date: string;
}

const STORE = "customers";

// ✅ Load initial data
export const loadCustomers = async (data: UserModel[]) => {
  const db = await openDB();

  const tx = db.transaction(STORE, "readwrite");
  const store = tx.objectStore(STORE);

  data.forEach((c) => store.put(c));

  return new Promise((res, rej) => {
    tx.oncomplete = () => res(true);
    tx.onerror = () => rej(tx.error);
  });
};

// ✅ Get all customers
export const getCustomers = async () => {
  const db = await openDB();

  const tx = db.transaction(STORE, "readonly");
  const store = tx.objectStore(STORE);

  return new Promise<UserModel[]>((resolve, reject) => {
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

// ✅ Clear all customers
export const clearCustomers = async () => {
  const db = await openDB();

  const tx = db.transaction(STORE, "readwrite");
  const store = tx.objectStore(STORE);

  store.clear();

  return new Promise((res, rej) => {
    tx.oncomplete = () => res(true);
    tx.onerror = () => rej(tx.error);
  });
};

// ✅ Add single customer
export const addCustomer = async (customer: UserModel) => {
  const db = await openDB();

  const tx = db.transaction(STORE, "readwrite");
  const store = tx.objectStore(STORE);

  store.put(customer);

  return new Promise((res, rej) => {
    tx.oncomplete = () => res(true);
    tx.onerror = () => rej(tx.error);
  });
};
