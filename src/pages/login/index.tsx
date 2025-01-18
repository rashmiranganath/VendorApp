import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './login.module.scss';
import { useNavigate } from 'react-router-dom';

interface FormValues {
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (values: FormValues) => {
    localStorage.setItem('user', JSON.stringify(values));
    navigate('/dashboard');
  };

  return (
    <div className={styles.loginContainer}>
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={Yup.object({
          username: Yup.string().required('Username is required'),
          password: Yup.string().required('Password is required')
        })}
        onSubmit={handleSubmit}
      >
        <Form className={styles.loginForm}>
          <h2>Welcome</h2>
          <div>
            <label htmlFor="username">Username:</label>
            <Field type="text" id="username" name="username" className={styles.input} />
            <ErrorMessage name="username" component="div" className={styles.error} />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <Field type="password" id="password" name="password" className={styles.input} />
            <ErrorMessage name="password" component="div" className={styles.error} />
          </div>
          <button type="submit" className={styles.button}>Sign In</button>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginPage; 