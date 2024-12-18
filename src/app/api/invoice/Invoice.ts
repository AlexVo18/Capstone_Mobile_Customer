import { PayParams } from "../../models/invoice_models";
import requests from "../request";

const Invoice = {
  getUserInvoices: () => requests.jwtApiGet("/invoices/my-invoice"),
  getInvoiceDetail: (input: string) => requests.jwtApiGet(`/invoices/${input}`),
  payInvoice: (input: PayParams) =>
    requests.jwtApiPost(`/invoices/${input.invoiceId}/pay`, {
      urlCancel: input.urlCancel,
      urlReturn: input.urlReturn,
    }),
  sendInvoiceData: (input: string) =>
    requests.jwtApiPost(`/invoices/${input}/post-transaction-check`, {}),
  getBankList: () => requests.vietqrApiGet("/banks"),
  getTaxCodeInfo: (input: string) =>
    requests.vietqrApiGet(`/business/${input}`),
  checkPayment: (input: string) =>
    requests.jwtApiPost(`/invoices/${input}/post-transaction-check`, {}),
};
export default Invoice;
