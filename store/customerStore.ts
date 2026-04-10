import { UserModel } from "@/db/customerService";
import { create } from "zustand";

type CustomerStore = {
  customers: UserModel[];
  setCustomers: (data: UserModel[]) => void;
  clearCustomers: () => void;
};

export const useCustomerStore = create<CustomerStore>((set) => ({
  customers: [],
  setCustomers: (data) => set({ customers: data }),
  clearCustomers: () => set({ customers: [] }),
}));
