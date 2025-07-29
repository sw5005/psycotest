'use client';

import { useRouter } from 'next/navigation';
import styles from './HomePage.module.css';
import ThemeToggle from './components/ThemeToggle';

export default function Home() {
  const router = useRouter();

  return (
    <>
      <ThemeToggle />
      <main className={styles.container}>
        <h1 className={styles.title}>직장인 유형 테스트</h1>
        <p className={styles.description}>
          10가지 질문에 답하면
          <br />
          당신의 직장인 유형(똑부/똑게/멍부/멍게)을 알려드립니다!
        </p>
        <button
          className={styles.startButton}
          onClick={() => router.push('/test')}>
          테스트 시작
        </button>
      </main>
    </>
  );
}
