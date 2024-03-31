import "./App.css";
import ReactDOMServer from "react-dom/server";
import html2pdf from "html2pdf.js";
import InvoicePage from "./components/InvoicePage";
import { initialInvoice } from "./data/initialData";
import { useEffect, useState } from "react";
import InputLogo from "./components/InputLogo";

function App() {
  const savedInvoice = JSON.parse(window.localStorage.getItem("invoiceData"));

  const [invoice, setInvoice] = useState(
    savedInvoice ? { ...savedInvoice } : { ...initialInvoice }
  );
  const [subtotal, setSubtotal] = useState(0);
  const [salesTax, setSalesTax] = useState(0);
  const [logo, setLogo] = useState(null);

  function updateInvoice(invoice) {
    window.localStorage.setItem("invoiceData", JSON.stringify(invoice));
  }

  console.log(savedInvoice);

  useEffect(() => {
    updateInvoice(invoice);
  }, [invoice]);

  const handleLogoChange = (img) => {
    const file = img;
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogo(reader.result); // Set logo as base64 string
      setInvoice({ ...invoice, logo: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file); // Convert uploaded image to base64
    }
  };

  const generatePDF = () => {
    // Create a React element for the InvoicePage component
    const invoiceElement = (
      <InvoicePage
        invoice={invoice}
        setInvoice={setInvoice}
        subtotal={subtotal}
        setSubtotal={setSubtotal}
        isEditingMode={false}
        salesTax={salesTax}
        setSalesTax={setSalesTax}
        logo={logo}
      />
    );

    // Get the HTML representation of the component
    const htmlContent = ReactDOMServer.renderToStaticMarkup(invoiceElement);

    // Options for html2pdf
    const options = {
      margin: [10, 10],
      filename: initialInvoice.clientName || "invoice",
      autoPaging: "text",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 3, letterRendering: true, scrollY: 0 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["avoid-all", "css", "legacy"] },
    };

    // Convert HTML to PDF using html2pdf
    html2pdf().from(htmlContent).set(options).save();
  };

  return (
    <>
      <main className="max-w-2xl mx-auto mt-4 border shadow-lg p-8">
        <InputLogo onChange={handleLogoChange} className="logo w-4/12" />
        <InvoicePage
          invoice={invoice}
          setInvoice={setInvoice}
          subtotal={subtotal}
          setSubtotal={setSubtotal}
          salesTax={salesTax}
          setSalesTax={setSalesTax}
          isEditingMode={true}
          logo={logo}
          onChange={updateInvoice}
        />
        <button
          onClick={generatePDF}
          className="bg-sky-500 rounded-sm py-1 px-3 text-zinc-100 outline-none hover:bg-sky-700 focus:ring focus:ring-slate-400 transition-all duration-200 ease-in-out"
        >
          Generate PDF
        </button>
      </main>
    </>
  );
}

export default App;
