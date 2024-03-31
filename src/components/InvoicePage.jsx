import { useEffect, useState } from "react";
import Input from "./Input";
import TextArea from "./TextArea";
import { initialOffering } from "../data/initialData";
import { CircleMinus, CirclePlus } from "lucide-react";
import Span from "./Span";

function InvoicePage({
  invoice,
  setInvoice,
  subtotal,
  setSubtotal,
  isEditingMode,
  salesTax,
  setSalesTax,
  logo,
  onChange,
}) {
  function handleChange(name, val) {
    const updatedInvoice = { ...invoice };
    updatedInvoice[name] = val;

    setInvoice(updatedInvoice);
  }

  function handleAddOfferings() {
    const offeringsLines = [...invoice.offeringsLines, { ...initialOffering }];
    setInvoice({ ...invoice, offeringsLines });
  }

  function handleOfferingsChange(index, name, value) {
    const offeringsLines = invoice.offeringsLines.map((offeringItem, ind) => {
      if (index === ind) {
        const newOfferingItem = { ...offeringItem };
        newOfferingItem[name] = value;

        return newOfferingItem;
      }
      return offeringItem;
    });

    setInvoice({ ...invoice, offeringsLines });

    // this code works. need scalable solution
    // const offeringsLines = invoice.offeringsLines.map((item, ind) =>
    //   ind === index ? { ...item, description: value } : item
    // );
    // setInvoice({ ...invoice, offeringsLines });
  }

  function handleDelete(index) {
    const offeringsLines = invoice.offeringsLines.filter(
      (item, i) => i !== index
    );

    setInvoice({ ...invoice, offeringsLines });
  }

  function getAmount(qty, rateInp) {
    const quantity = parseFloat(qty);
    const rate = parseFloat(rateInp);
    const amount = quantity && rate ? quantity * rate : 0;

    return amount.toFixed(2);
  }

  useEffect(() => {
    const taxRate = invoice.taxLabel.replace(/[^\d.]/g, "");
    const salesTax = taxRate && subtotal ? (subtotal * taxRate) / 100 : 0;

    setSalesTax(salesTax);
  }, [subtotal, invoice.taxLabel]);

  useEffect(() => {
    let subTotal = 0;

    invoice.offeringsLines.forEach((item) => {
      const quantity = +item.quantity;
      const rate = +item.rate;
      const amount = quantity && rate ? quantity * rate : 0;

      subTotal += amount;
    });

    setSubtotal(subTotal);
  }, [invoice.offeringsLines]);

  useEffect(() => {
    const today = new Date();
    invoice.invoiceDate = today.toLocaleDateString();
  }, []);

  return (
    <div className="">
      {/* Logo and Title */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex flex-col w-2/4">
          {logo ? (
            <img src={logo} alt="company logo" className="w-full max-w-24" />
          ) : (
            "you logo here"
          )}
        </div>
        <div className="flex flex-col w-2/4">
          <TextArea
            placeholder="Invoice title"
            className="text-3xl text-right uppercase font-medium text-sky-500 pt-1"
            value={invoice.title}
            onChange={(val) => handleChange("title", val)}
          />
        </div>
      </div>

      {/* Address and invoice details */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex flex-col w-2/4">
          <TextArea
            placeholder="Your company name"
            value={invoice.companyName}
            onChange={(val) => handleChange("companyName", val)}
          />
          <TextArea
            placeholder="Address"
            value={invoice.companyAddress}
            onChange={(val) => handleChange("companyAddress", val)}
          />
          <TextArea
            placeholder="City, State Zip"
            value={invoice.companyAddress2}
            onChange={(val) => handleChange("companyAddress2", val)}
          />
        </div>
        <div className="flex flex-col w-2/4">
          <div className="flex">
            <TextArea
              placeholder="Invoice#"
              value={invoice.invoiceTitleLabel}
              onChange={(val) => handleChange("invoiceTitleLabel", val)}
            />
            <TextArea
              placeholder="Inv 123"
              value={invoice.invoiceNo}
              onChange={(val) => handleChange("invoiceNo", val)}
            />
          </div>
          <div className="flex">
            <TextArea
              placeholder="Invoice date"
              value={invoice.invoiceDateLabel}
              onChange={(val) => handleChange("invoiceDateLabel", val)}
            />
            <TextArea
              placeholder="Invoice data"
              value={invoice.invoiceDate}
              onChange={(val) => handleChange("invoiceDate", val)}
            />
          </div>
          <div className="flex">
            <TextArea
              placeholder="Invoice due date"
              value={invoice.invoiceDueDateLabel}
              onChange={(val) => handleChange("invoiceDueDateLabel", val)}
            />
            <TextArea
              placeholder="10/01/2024"
              value={invoice.invoiceDueDate}
              onChange={(val) => handleChange("invoiceDueDate", val)}
            />
          </div>
        </div>
      </div>

      {/* Bill to */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col w-2/4">
          <TextArea
            placeholder="Bill to:"
            value={invoice.billTo}
            onChange={(val) => handleChange("billTo", val)}
          />
          <TextArea
            placeholder="Client name"
            value={invoice.clientName}
            onChange={(val) => handleChange("clientName", val)}
          />
          <TextArea
            placeholder="Client's address"
            value={invoice.clientAddress}
            onChange={(val) => handleChange("clientAddress", val)}
          />
          <TextArea
            placeholder="City, State Zip"
            value={invoice.clientAddress2}
            onChange={(val) => handleChange("clientAddress2", val)}
          />
        </div>
      </div>

      {/* Items header */}
      <div className="flex items-center bg-zinc-600 mt-8">
        <div className="px-2 py-1 w-[48%]">
          <TextArea
            placeholder="Item description"
            className="text-zinc-100 font-semibold hover:text-zinc-600 focus:text-zinc-600"
            value={invoice.offeringsLineDescription}
            onChange={(val) => handleChange("offeringsLineDescription", val)}
          />
        </div>
        <div className="px-2 py-1 w-[17%] ">
          <TextArea
            placeholder="Qty"
            className="text-right text-zinc-100 font-semibold hover:text-zinc-600 focus:text-zinc-600"
            value={invoice.offeringsLineQuantity}
            onChange={(val) => handleChange("offeringsLineQuantity", val)}
          />
        </div>
        <div className="px-2 py-1 w-[17%]">
          <TextArea
            placeholder="Rate"
            className="text-right text-zinc-100 font-semibold hover:text-zinc-600 focus:text-zinc-600"
            value={invoice.offeringsLineQuantityRate}
            onChange={(val) => handleChange("offeringsLineQuantityRate", val)}
          />
        </div>
        <div className="px-2 py-1 w-[18%]">
          <TextArea
            placeholder="Amount"
            className="text-right text-zinc-100 font-semibold hover:text-zinc-600 focus:text-zinc-600"
            value={invoice.offeringsLineQuantityAmount}
            onChange={(val) => handleChange("offeringsLineQuantityAmount", val)}
          />
        </div>
      </div>

      {/* Items list */}
      {invoice.offeringsLines &&
        invoice.offeringsLines.map((item, index) => (
          <div className="flex items-start relative group " key={index}>
            <div className="px-2 py-1 w-[48%] pb-2.5">
              <TextArea
                placeholder="Enter name description"
                value={item.description}
                onChange={(val) =>
                  handleOfferingsChange(index, "description", val)
                }
              />
            </div>
            <div className="px-2 py-1 w-[17%] pb-2.5">
              <TextArea
                type="number"
                placeholder="Qty"
                className="text-right "
                value={item.quantity}
                onChange={(val) =>
                  handleOfferingsChange(index, "quantity", val)
                }
              />
            </div>
            <div className="px-2 py-1 w-[17%] pb-2.5">
              <TextArea
                type="number"
                placeholder="Rate"
                className="text-right "
                value={item.rate}
                onChange={(val) => handleOfferingsChange(index, "rate", val)}
              />
            </div>
            <div className="px-2 py-1 w-[18%] pb-2.5">
              <Span placeholder="Amount" className="text-right ">
                {getAmount(item.quantity, item.rate)}
              </Span>
            </div>
            <button
              onClick={() => handleDelete(index)}
              className="absolute -right-6 top-2.5 text-red-600 invisible hover:visible group-hover:visible"
            >
              <span>
                <CircleMinus />
              </span>
            </button>
          </div>
        ))}

      {/* Add items and Total  */}

      <div className="flex items-center mt-2">
        <div className="basis-2/4 self-start">
          {isEditingMode && (
            <button
              className="flex hover:underline text-blue-500"
              onClick={handleAddOfferings}
            >
              <span className="mr-2.5 text-black">
                <CirclePlus />
              </span>
              Add items
            </button>
          )}
        </div>
        <div className="basis-2/4">
          <div className="flex">
            <TextArea
              placeholder="Sub Total"
              value={invoice.subTotalLabel}
              onChange={(val) => handleChange("subTotalLabel", val)}
            />
            <Span className="text-right font-semibold">
              {subtotal ? subtotal.toFixed(2) : 0}
            </Span>
          </div>
          <div className="flex">
            <TextArea
              placeholder="Sales tax"
              value={invoice.taxLabel}
              onChange={(val) => handleChange("taxLabel", val)}
            />
            <Span className="text-right font-semibold">
              {salesTax ? salesTax.toFixed(2) : 0}
            </Span>
          </div>
          <div className="flex p-1 bg-zinc-300 pr-0">
            <div className="basis-2/4">
              <TextArea
                placeholder="Total"
                className="font-semibold"
                value={invoice.totalLabel}
                onChange={(val) => handleChange("totalLabel", val)}
              />
            </div>
            <div className="basis-2/4 flex">
              <TextArea
                placeholder="$"
                className="text-right font-semibold ml-7"
                value={invoice.currency}
                onChange={(val) => handleChange("currency", val)}
              />
              <Span className="text-right font-semibold">
                {(subtotal + salesTax).toFixed(2)}
              </Span>
            </div>
          </div>
        </div>
      </div>

      {/* Notes section */}
      <div className="flex flex-col mt-6">
        <Input
          placeholder="Notes"
          className="font-semibold"
          value={invoice.notesLabel}
          onChange={(val) => handleChange("notesLabel", val)}
        />
        <TextArea
          placeholder="You can write stuff here..."
          value={invoice.notes}
          onChange={(val) => handleChange("notes", val)}
        />
      </div>
      {/* <div className="flex flex-col mt-6">
        <Input
          placeholder="Terms and conditions"
          className="font-semibold"
          value={invoice.termLabel}
          onChange={(val) => handleChange("termLabel", val)}
        />
        <TextArea
          placeholder="You can write stuff here..."
          value={invoice.term}
          onChange={(val) => handleChange("term", val)}
        />
      </div> */}
    </div>
  );
}

export default InvoicePage;
