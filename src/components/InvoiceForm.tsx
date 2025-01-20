import React, { useState, useRef, useEffect } from "react";
import { Formik, Form, FormikProps } from "formik";
import * as Yup from "yup";
import styles from "./InvoiceForm.module.scss";
import FormInput from "./common/FormInput";
import FormSection from "./common/FormSection";
import { formOptions } from "../constants/formOptions";
import buildingIcon from "../assets/buildingIcon.png";
import invoiceIcon from "../assets/invoiceIcon.png";
import commentIcon from "../assets/invoiceIcon.png";

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

const STORAGE_KEY = "vendorInvoiceData";

const UploadIcon = () => (
  <svg
    width="120"
    height="120"
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="60" cy="60" r="60" fill="#2563EB" />
    <rect
      x="35"
      y="35"
      width="50"
      height="50"
      rx="4"
      stroke="white"
      strokeWidth="2"
    />
    <path
      d="M60 45V75M60 45L48 57M60 45L72 57"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M45 65V70C45 71.6569 46.3431 73 48 73H72C73.6569 73 75 71.6569 75 70V65"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.6666 5L7.49992 14.1667L3.33325 10"
      stroke="#10B981"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const InvoiceForm: React.FC = () => {
  const [activeTab, setActiveTab] = useState("vendorDetails");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formikRef = useRef<FormikProps<InvoiceFormValues>>(null);

  const getSavedFormData = (): InvoiceFormValues => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (!savedData) return initialValues;

      const parsedData = JSON.parse(savedData);
      return {
        vendor: parsedData.vendorDetails?.vendor || "",
        purchaseOrderNumber:
          parsedData.invoiceDetails?.purchaseOrderNumber || "",
        invoiceNumber: parsedData.invoiceDetails?.invoiceNumber || "",
        invoiceDate: parsedData.invoiceDetails?.invoiceDate || "",
        totalAmount: parsedData.invoiceDetails?.totalAmount || "",
        paymentTerms: parsedData.invoiceDetails?.paymentTerms || "",
        invoiceDueDate: parsedData.invoiceDetails?.invoiceDueDate || "",
        postDate: parsedData.invoiceDetails?.postDate || "",
        invoiceDescription: parsedData.invoiceDetails?.invoiceDescription || "",
        lineAmount: parsedData.invoiceDetails?.lineAmount || "",
        department: parsedData.invoiceDetails?.department || "",
        account: parsedData.invoiceDetails?.account || "",
        location: parsedData.invoiceDetails?.location || "",
        description: parsedData.invoiceDetails?.description || "",
        comments: parsedData.comments?.comments || "",
      };
    } catch (error) {
      console.error("Error loading saved form data:", error);
      return initialValues;
    }
  };

  useEffect(() => {
    const savedData = getSavedFormData();
    if (
      formikRef.current &&
      JSON.stringify(savedData) !== JSON.stringify(initialValues)
    ) {
      formikRef.current.setValues(savedData);
    }
  }, []);

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

      localStorage.setItem(STORAGE_KEY, JSON.stringify(formattedData));

      const submissions = JSON.parse(
        localStorage.getItem("invoiceSubmissions") || "[]"
      );
      submissions.push({
        id: Date.now(),
        data: formattedData,
        submittedAt: new Date().toISOString(),
      });

      console.log("Form submitted successfully:", formattedData);
      alert("Invoice saved successfully!");

      const savedData = localStorage.getItem(STORAGE_KEY);

      if (!savedData) {
        resetForm();
        setSelectedFile(null);
        setActiveTab("vendorDetails");
      }

      setSubmitting(false);
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
            <UploadIcon />
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
            <div className={styles.fileInfo}>
              <CheckIcon />
              <span>{selectedFile.name}</span>
            </div>
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
          {({ isSubmitting }) => (
            <Form>
              <div id="vendorDetails" className={styles.vendorDetails}>
                <FormSection
                  title="Vendor Details"
                  icon={buildingIcon}
                  iconType="left"
                  subTitle="Vendor Information"
                >
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
                <FormSection
                  title="Invoice Details"
                  icon={invoiceIcon}
                  iconType="left"
                  subTitle="General Information"
                >
                  <FormInput
                    label="Purchase Order Number"
                    name="purchaseOrderNumber"
                    placeholder="Enter purchase order number"
                  />
                </FormSection>

                <FormSection title="" subTitle="Invoice Deatils">
                  <div className={styles.detailsContainer}>
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
                   <FormInput label="GL Post Date" name="postDate" type="date" />
                  </div>

                  <FormInput
                    label="Invoice Description"
                    name="invoiceDescription"
                    placeholder="Enter invoice description"
                  />
                </FormSection>
                <FormSection title="" subTitle="Expense Details">
                  <div className={styles.detailsContainer}>
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
                  </div>

                  <FormInput
                    label="Description"
                    name="description"
                    placeholder="Enter description"
                  />
                </FormSection>
              </div>

              <div id="comments" className={styles.comments}>
                <FormSection
                  title="Comments"
                  icon={commentIcon}
                  iconType="left"
                >
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
