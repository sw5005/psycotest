'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import styles from './ResultPage.module.css';
import ThemeToggle from '../components/ThemeToggle'; // 경로 수정

// 각 유형별 상세 정보
const resultDetails: Record<
  string,
  {
    description: string;
    advice: string;
    workEnvironment: string;
    strengths: string[];
    weaknesses: string[];
  }
> = {
  똑부: {
    description: '똑똑하고 부지런한 당신! 최고의 직장인 유형입니다.',
    advice:
      '이미 완벽한 조합이에요! 다만 너무 완벽하려다 스트레스받지 마세요. 가끔은 여유를 가져보세요.',
    workEnvironment:
      '스타트업, 경영진, 프로젝트 리더, 창업 등이 잘 맞습니다.',
    strengths: ['계획적', '성실함', '문제해결능력', '책임감'],
    weaknesses: ['완벽주의', '스트레스', '여유부족'],
  },
  똑게: {
    description:
      '똑똑하지만 게으른 당신! 효율적으로 일하지만 가끔 미루기도 해요.',
    advice:
      '똑똑함을 활용해서 더 효율적으로 일하는 방법을 찾아보세요. 마감일을 잘 지키는 연습을 해보세요.',
    workEnvironment:
      '프리랜서, 연구직, 컨설팅, 창작직 등이 잘 맞습니다.',
    strengths: ['창의성', '효율성', '문제해결능력', '유연함'],
    weaknesses: ['미루는 습관', '마감일 지키기 어려움', '일정관리'],
  },
  멍부: {
    description: '멍청하지만 부지런한 당신! 성실함이 무기입니다.',
    advice:
      '성실함은 큰 장점이에요! 업무 스킬을 조금씩 늘려가면서 자신감을 키워보세요.',
    workEnvironment:
      '공무원, 서비스업, 제조업, 안정적인 회사 등이 잘 맞습니다.',
    strengths: ['성실함', '책임감', '꾸준함', '협조성'],
    weaknesses: ['업무 스킬 부족', '자신감 부족', '창의성 부족'],
  },
  멍게: {
    description: '멍청하고 게으른 당신! 조금 더 노력해봐요.',
    advice:
      '천천히 하나씩 바꿔가보세요. 작은 목표부터 시작해서 성취감을 느껴보세요.',
    workEnvironment:
      '단순 업무, 파트타임, 자유로운 환경 등이 잘 맞습니다.',
    strengths: ['스트레스 적음', '유연함', '자유로움'],
    weaknesses: ['업무 스킬 부족', '책임감 부족', '일정관리 어려움'],
  },
};

export default function ResultPage() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type') || '똑부';
  const router = useRouter();

  const validTypes = ['똑부', '똑게', '멍부', '멍게'];
  const isValidType = validTypes.includes(type);
  const details = resultDetails[type];

  return (
    <>
      <ThemeToggle />
      <main className={styles.container}>
        {isValidType ? (
          <>
            <h1 className={styles.title}>당신의 유형은: {type}</h1>
            <p className={styles.description}>
              {details.description}
            </p>

            {/* 조언 섹션 */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>💡 조언</h2>
              <p className={styles.sectionContent}>
                {details.advice}
              </p>
            </div>

            {/* 맞는 직장 환경 */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>
                🏢 잘 맞는 직장 환경
              </h2>
              <p className={styles.sectionContent}>
                {details.workEnvironment}
              </p>
            </div>

            {/* 장점 */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>✨ 장점</h2>
              <ul className={styles.strengthList}>
                {details.strengths.map((strength, idx) => (
                  <li key={idx} className={styles.strengthItem}>
                    {strength}
                  </li>
                ))}
              </ul>
            </div>

            {/* 개선점 */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>🔧 개선점</h2>
              <ul className={styles.weaknessList}>
                {details.weaknesses.map((weakness, idx) => (
                  <li key={idx} className={styles.weaknessItem}>
                    {weakness}
                  </li>
                ))}
              </ul>
            </div>

            <button
              className={styles.homeButton}
              onClick={() => router.push('/')}>
              홈으로 돌아가기
            </button>
          </>
        ) : (
          <>
            <h1 className={styles.title}>유효하지 않은 결과입니다</h1>
            <p className={styles.description}>
              정상적인 경로로 테스트를 완료해 주세요.
            </p>
            <button
              className={styles.homeButton}
              onClick={() => router.push('/')}>
              홈으로 돌아가기
            </button>
          </>
        )}
      </main>
    </>
  );
}
