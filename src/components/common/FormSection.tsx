import React from 'react';
import styles from './FormSection.module.scss';

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
  rightContent?: React.ReactNode;
}

const FormSection: React.FC<FormSectionProps> = ({
  title,
  children,
  rightContent
}) => {
  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h3>{title}</h3>
        {rightContent}
      </div>
      {children}
    </div>
  );
};

export default FormSection; 