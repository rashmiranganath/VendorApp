import React, {  useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import styles from './login.module.scss';
import { useNavigate } from 'react-router-dom';

interface FormValues {
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const initialValues: FormValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object<FormValues>({
    username: Yup.string()
      .required('Username is required')
      .min(3, 'Username must be at least 3 characters'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
  });

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    try {
      localStorage.setItem('user', JSON.stringify(values));
      setSubmitting(false);
      navigate('/dashboard', { replace: true });
    } catch (error) {
      console.error('Login error:', error);
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
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