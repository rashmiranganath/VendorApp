import React from 'react';
import styles from './FormSection.module.scss';

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
  rightContent?: React.ReactNode;
  icon?: string; // Change icon prop type to string
  iconType?: 'left' | 'right';
  subTitle?:string;
}

const FormSection: React.FC<FormSectionProps> = ({
  title,
  children,
  rightContent,
  icon, 
  iconType = 'left',
  subTitle
}) => {
  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        {iconType === 'left' && icon && <span className={styles.icon}><img src={icon} alt="Icon" /></span>} 
        <h2>{title}</h2>
        {iconType === 'right' && icon && <span className={styles.icon}><img src={icon} alt="Icon" /></span>} 
        {rightContent}
      </div>
      <h4>{subTitle}</h4>
      {children}
    </div>
  );
};

export default FormSection;

// Usage:
