"use client";

import * as customerService from "@/db/customerService";
import * as logService from "@/db/logService";
import { useCustomerStore } from "@/store/customerStore";
import { useLogStore } from "@/store/logStore";
import { mockUsers } from "./mockdata";

export const useCustomerActions = () => {
  const setCustomers = useCustomerStore((s) => s.setCustomers);
  const clearCustomersState = useCustomerStore((s) => s.clearCustomers);
  const addLogUI = useLogStore((s) => s.addLog);

  const log = (message: string, level: "INF" | "ERR" = "INF") => {
    const logData = {
      time: Date.now(),
      label: message,
      level,
    };

    addLogUI(logData); // UI
    logService.addLog(logData); // persist
  };

  const loadDB = async () => {
    log("Loading customers...");

    try {
      await customerService.loadCustomers(mockUsers);

      log("Load success ✅");
    } catch (e) {
      log(e + "", "ERR");
    }
  };

  const clearDB = async () => {
    log("Clearing customers...");

    try {
      await customerService.clearCustomers();
      log("Clear success ✅");
      clearCustomersState();
    } catch (e) {
      log(e + "", "ERR");
    }
  };

  const queryDB = async () => {
    log("Querying customers...");

    try {
      const data = await customerService.getCustomers();
      log(`Found ${data.length} customers`);
      setCustomers(data);
    } catch (e) {
      log(e + "", "ERR");
      return [];
    }
  };

  return {
    loadDB,
    clearDB,
    queryDB,
  };
};
