import useInvoiceStore from "../store/useInvoiceStore";

const useInvoice = () => {
  const { invoice, addInvoice, invoiceLoading, removeInvoice } =
    useInvoiceStore();

  return {
    invoice,
    addInvoice,
    invoiceLoading,
    removeInvoice,
  };
};

export default useInvoice;
