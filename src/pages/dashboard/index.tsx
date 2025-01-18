import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './dashboard.module.scss';
import InvoiceForm from '../../components/InvoiceForm';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.header}>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Logout
        </button>
      </div>
      <InvoiceForm />
    </div>
  );
};

export default DashboardPage; 