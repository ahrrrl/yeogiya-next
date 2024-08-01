import styles from './LoginPage.module.scss';
import LoginForm from '../ui/login/login-form';

export default function LoginPage() {
  return (
    <main className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h3 className={styles.title}>로그인</h3>
        <LoginForm />
      </div>
    </main>
  );
}
