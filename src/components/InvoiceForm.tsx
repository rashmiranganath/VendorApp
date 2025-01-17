import React, { useState, useRef } from "react";
import { Formik, Form, FormikProps } from "formik";
import * as Yup from "yup";
import styles from "./InvoiceForm.module.scss";
import FormInput from "./common/FormInput";
import FormSection from "./common/FormSection";
import { formOptions } from "../constants/formOptions";

interface InvoiceFormValues {
  vendor: string;
  purchaseOrderNumber: string;
  invoiceNumber: string;
  invoiceDate: string;
  totalAmount: string;
  paymentTerms: string;
  invoiceDueDate: string;
  postDate: string;
  invoiceDescription: string;
  lineAmount: string;
  department: string;
  account: string;
  location: string;
  description: string;
  comments: string;
}

const validationSchema = Yup.object().shape({
  vendor: Yup.string().required("Vendor is required"),
  purchaseOrderNumber: Yup.string().required(
    "Purchase Order Number is required"
  ),
  invoiceNumber: Yup.string().required("Invoice Number is required"),
  invoiceDate: Yup.date().required("Invoice Date is required"),
  totalAmount: Yup.number()
    .required("Total Amount is required")
    .min(0, "Amount must be greater than 0"),
  paymentTerms: Yup.string().required("Payment Terms are required"),
  invoiceDueDate: Yup.date().required("Invoice Due Date is required"),
  postDate: Yup.date().required("Post Date is required"),
  invoiceDescription: Yup.string().required("Invoice Description is required"),

  lineAmount: Yup.number()
    .required("Line Amount is required")
    .min(0, "Amount must be greater than 0"),
  department: Yup.string().required("Department is required"),
  account: Yup.string().required("Account is required"),
  location: Yup.string().required("Location is required"),
  description: Yup.string().required("Description is required"),
});

const initialValues: InvoiceFormValues = {
  vendor: "",
  purchaseOrderNumber: "",
  invoiceNumber: "",
  invoiceDate: "",
  totalAmount: "",
  paymentTerms: "",
  invoiceDueDate: "",
  postDate: "",
  invoiceDescription: "",
  lineAmount: "",
  department: "",
  account: "",
  location: "",
  description: "",
  comments: "",
};

const formatFormData = (values: InvoiceFormValues) => {
  return {
    vendorDetails: {
      vendor: values.vendor,
    },
    invoiceDetails: {
      purchaseOrderNumber: values.purchaseOrderNumber,
      invoiceNumber: values.invoiceNumber,
      invoiceDate: values.invoiceDate,
      totalAmount: values.totalAmount,
      paymentTerms: values.paymentTerms,
      invoiceDueDate: values.invoiceDueDate,
      postDate: values.postDate,
      invoiceDescription: values.invoiceDescription,
      lineAmount: values.lineAmount,
      department: values.department,
      account: values.account,
      location: values.location,
      description: values.description,
    },
    comments: {
      comments: values.comments || "",
    },
  };
};

const InvoiceForm: React.FC = () => {
  const [activeTab, setActiveTab] = useState("vendorDetails");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formikRef = useRef<FormikProps<InvoiceFormValues>>(null);

  const getSavedFormData = (): InvoiceFormValues => {
    try {
      const savedData = localStorage.getItem("invoiceSubmissions");
      if (!savedData) return initialValues;

      const parsedData = JSON.parse(savedData);
      if (!Array.isArray(parsedData) || parsedData.length === 0) {
        return initialValues;
      }

      const latestSubmission = parsedData[parsedData.length - 1];
      if (!latestSubmission || !latestSubmission.data) {
        return initialValues;
      }

      const formData = latestSubmission.data;
      console.log("Loading saved form data:", formData);

      return {
        vendor: formData.vendorDetails?.vendor || "",
        purchaseOrderNumber: formData.invoiceDetails?.purchaseOrderNumber || "",
        invoiceNumber: formData.invoiceDetails?.invoiceNumber || "",
        invoiceDate: formData.invoiceDetails?.invoiceDate || "",
        totalAmount: formData.invoiceDetails?.totalAmount || "",
        paymentTerms: formData.invoiceDetails?.paymentTerms || "",
        invoiceDueDate: formData.invoiceDetails?.invoiceDueDate || "",
        postDate: formData.invoiceDetails?.postDate || "",
        invoiceDescription: formData.invoiceDetails?.invoiceDescription || "",
        lineAmount: formData.invoiceDetails?.lineAmount || "",
        department: formData.invoiceDetails?.department || "",
        account: formData.invoiceDetails?.account || "",
        location: formData.invoiceDetails?.location || "",
        description: formData.invoiceDetails?.description || "",
        comments: formData.comments?.comments || "",
      };
    } catch (error) {
      console.error("Error loading saved form data:", error);
      return initialValues;
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = (
    values: InvoiceFormValues,
    { setSubmitting, resetForm }: any
  ) => {
    try {
      const formattedData = formatFormData(values);
      const submissions = JSON.parse(
        localStorage.getItem("invoiceSubmissions") || "[]"
      );
      submissions.push({
        id: Date.now(),
        data: formattedData,
        submittedAt: new Date().toISOString(),
      });
      localStorage.setItem("invoiceSubmissions", JSON.stringify(submissions));

      console.log("Form submitted successfully:", formattedData);
      alert("Invoice saved successfully!");
      resetForm();
      setSubmitting(false);
      setSelectedFile(null);
      setActiveTab("vendorDetails");
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitting(false);
      alert("Error saving invoice. Please try again.");
    }
  };

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    const section = document.getElementById(tabId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.uploadSection}>
        <div className={styles.header}>
          <h2>Create New Invoice</h2>
        </div>
        <div
          className={styles.dropZone}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleUploadClick}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            style={{ display: "none" }}
          />
          <div className={styles.uploadIcon}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 17V7m0 0L5 11m4-4l4 4" />
              <path d="M20 21H4a2 2 0 01-2-2V5a2 2 0 012-2h16a2 2 0 012 2v14a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p>Upload Your Invoice</p>
          <span className={styles.uploadHint}>
            To auto-populate fields and save time
          </span>
          <button className={styles.uploadButton}>Upload File</button>
          <span className={styles.dragText}>
            Click to upload or drag and drop
          </span>
        </div>

        {selectedFile && (
          <div className={styles.selectedFile}>
            <span>Selected file: {selectedFile.name}</span>
            <button onClick={() => setSelectedFile(null)}>Remove</button>
          </div>
        )}
      </div>
      <div className={styles.tabsSection}>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${
              activeTab === "vendorDetails" ? styles.active : ""
            }`}
            onClick={() => handleTabClick("vendorDetails")}
          >
            Vendor Details
          </button>
          <button
            className={`${styles.tab} ${
              activeTab === "invoiceDetails" ? styles.active : ""
            }`}
            onClick={() => handleTabClick("invoiceDetails")}
          >
            Invoice Details
          </button>
          <button
            className={`${styles.tab} ${
              activeTab === "comments" ? styles.active : ""
            }`}
            onClick={() => handleTabClick("comments")}
          >
            Comments
          </button>
        </div>

        <Formik
          innerRef={formikRef}
          initialValues={getSavedFormData()}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {({ isSubmitting, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <div id="vendorDetails" className={styles.vendorDetails}>
                <FormSection title="Vendor Information">
                  <FormInput
                    label="Vendor"
                    name="vendor"
                    as="select"
                    options={formOptions.vendors}
                    placeholder="Select Vendor"
                  />
                  <a href="#" className={styles.link}>
                    + New Vendor Details
                  </a>
                </FormSection>
              </div>

              <div id="invoiceDetails" className={styles.invoiceDetails}>
                <FormSection title="General Information">
                  <FormInput
                    label="Purchase Order Number"
                    name="purchaseOrderNumber"
                    placeholder="Enter purchase order number"
                  />
                  <FormInput
                    label="Invoice Number"
                    name="invoiceNumber"
                    placeholder="Enter invoice number"
                  />
                  <FormInput
                    label="Invoice Date"
                    name="invoiceDate"
                    type="date"
                  />
                  <FormInput
                    label="Total Amount"
                    name="totalAmount"
                    type="currency"
                  />
                  <FormInput
                    label="Payment Terms"
                    name="paymentTerms"
                    as="select"
                    options={formOptions.paymentTerms}
                    placeholder="Select Payment Terms"
                  />
                  <FormInput
                    label="Invoice Due Date"
                    name="invoiceDueDate"
                    type="date"
                  />
                  <FormInput label="Post Date" name="postDate" type="date" />
                  <FormInput
                    label="Invoice Description"
                    name="invoiceDescription"
                    as="textarea"
                    placeholder="Enter invoice description"
                  />
                </FormSection>
                <FormSection title="Invoice Details">
                  <FormInput
                    label="Line Amount"
                    name="lineAmount"
                    type="currency"
                  />
                  <FormInput
                    label="Department"
                    name="department"
                    placeholder="Enter department"
                  />
                  <FormInput
                    label="Account"
                    name="account"
                    placeholder="Enter account"
                  />
                  <FormInput
                    label="Location"
                    name="location"
                    placeholder="Enter location"
                  />
                  <FormInput
                    label="Description"
                    name="description"
                    as="textarea"
                    placeholder="Enter description"
                  />
                </FormSection>
              </div>

              <div id="comments" className={styles.comments}>
                <FormSection title="Comments">
                  <FormInput
                    label="Comments"
                    name="comments"
                    as="textarea"
                    placeholder="Add a comment and press Return to log comment."
                    required={false}
                  />
                </FormSection>
              </div>

              <div className={styles.formActions}>
                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={isSubmitting}
                >
                  Submit & New
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default InvoiceForm;
