import { create } from "zustand";
import * as SecureStore from "expo-secure-store";

interface InvoiceState {
  invoice: string | undefined;
  invoiceLoading: boolean;
  addInvoice: (invoiceId: string) => void;
  removeInvoice: () => void;
}

const useInvoiceStore = create<InvoiceState>((set) => ({
  invoiceLoading: true,
  invoice: undefined,

  addInvoice: async (invoiceId: string) => {
    await SecureStore.setItemAsync("invoice", invoiceId);
    set({ invoice: invoiceId });
  },
  removeInvoice: async () => {
    await SecureStore.deleteItemAsync("invoice");
  },
}));

export default useInvoiceStore;
