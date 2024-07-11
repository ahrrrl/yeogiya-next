import styles from './LoginPage.module.scss';
import LoginForm from '../ui/login/login-form';

export default function LoginPage() {
  return (
    <main className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h3 className={styles.title}>Login to your account</h3>
        <h3>id: mokoko@lost.com / password: mokokolost</h3>
        <LoginForm />
      </div>
    </main>
  );
}
