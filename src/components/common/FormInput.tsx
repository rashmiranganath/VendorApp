import React from 'react';
import { Field, ErrorMessage } from 'formik';
import styles from './FormInput.module.scss';

interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  as?: string;
  options?: { value: string; label: string }[];
  required?: boolean;
  rows?: number;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type = 'text',
  placeholder,
  as,
  options,
  required = true,
  rows,
}) => {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={name}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>

      {type === 'currency' ? (
        <div className={styles.currencyInput}>
          <span>$</span>
          <Field
            type="number"
            id={name}
            name={name}
            placeholder={placeholder || '0.00'}
          />
        </div>
      ) : as === 'select' ? (
        <Field as="select" id={name} name={name}>
          <option value="">{placeholder || `Select ${label}`}</option>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Field>
      ) : as === 'textarea' ? (
        <Field
          as="textarea"
          id={name}
          name={name}
          placeholder={placeholder}
          rows={rows || 3}
        />
      ) : type === 'date' ? (
        <Field
          type="date"
          id={name}
          name={name}
          placeholder='MM/DD/YYYY'
        />
      ) : (
        <Field
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
        />
      )}

      <ErrorMessage
        name={name}
        component="div"
        className={styles.errorMessage}
      />
    </div>
  );
};

export default FormInput;