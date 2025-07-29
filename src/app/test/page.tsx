'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './TestPage.module.css';
import ThemeToggle from '../components/ThemeToggle'; // 경로 수정

export default function TestPage() {
  // 질문 데이터 배열 (10개)
  const questions = [
    {
      id: 1,
      question: '업무가 몰렸을 때 당신의 행동은?',
      options: [
        { text: '계획을 세워 우선순위대로 처리한다', type: 'smart' },
        {
          text: '일단 손에 잡히는 것부터 처리한다',
          type: 'diligent',
        },
        { text: '미루다가 마감 직전에 처리한다', type: 'lazy' },
        { text: '누군가 도와주길 기다린다', type: 'dumb' },
      ],
    },
    {
      id: 2,
      question: '회의 시간에 당신의 모습은?',
      options: [
        { text: '적극적으로 의견을 낸다', type: 'smart' },
        { text: '필요할 때만 말한다', type: 'diligent' },
        { text: '딴생각을 한다', type: 'lazy' },
        { text: '아무 말도 안 한다', type: 'dumb' },
      ],
    },
    {
      id: 3,
      question: '새로운 업무를 맡았을 때 당신은?',
      options: [
        { text: '빠르게 파악하고 계획을 세운다', type: 'smart' },
        { text: '일단 시작부터 한다', type: 'diligent' },
        { text: '미루다가 천천히 시작한다', type: 'lazy' },
        { text: '누군가 알려주길 기다린다', type: 'dumb' },
      ],
    },
    {
      id: 4,
      question: '동료가 실수했을 때 당신의 반응은?',
      options: [
        { text: '원인을 분석해 조언해준다', type: 'smart' },
        { text: '묵묵히 도와준다', type: 'diligent' },
        { text: '모른 척 한다', type: 'lazy' },
        { text: '같이 실수한다', type: 'dumb' },
      ],
    },
    {
      id: 5,
      question: '업무 중 갑자기 쉬는 시간이 생기면?',
      options: [
        { text: '남은 업무를 정리한다', type: 'smart' },
        { text: '다른 동료를 도와준다', type: 'diligent' },
        { text: '휴대폰을 본다', type: 'lazy' },
        { text: '아무 생각 없이 쉰다', type: 'dumb' },
      ],
    },
    {
      id: 6,
      question: '프로젝트 마감이 다가올 때 당신은?',
      options: [
        { text: '일정을 재점검하고 계획을 조정한다', type: 'smart' },
        { text: '남은 일을 밤새워서라도 끝낸다', type: 'diligent' },
        { text: '마감 직전까지 미룬다', type: 'lazy' },
        { text: '포기하고 상사에게 맡긴다', type: 'dumb' },
      ],
    },
    {
      id: 7,
      question: '상사가 갑자기 새로운 일을 시킬 때?',
      options: [
        { text: '빠르게 파악하고 질문한다', type: 'smart' },
        { text: '일단 시키는 대로 해본다', type: 'diligent' },
        { text: '나중에 하겠다고 미룬다', type: 'lazy' },
        { text: '아무것도 하지 않는다', type: 'dumb' },
      ],
    },
    {
      id: 8,
      question: '업무 중 실수를 했을 때 당신은?',
      options: [
        {
          text: '원인을 분석하고 재발 방지책을 세운다',
          type: 'smart',
        },
        { text: '바로 수정하고 다시 시도한다', type: 'diligent' },
        { text: '모른 척 넘어간다', type: 'lazy' },
        { text: '남 탓을 한다', type: 'dumb' },
      ],
    },
    {
      id: 9,
      question: '팀 프로젝트에서 맡은 역할이 끝났을 때?',
      options: [
        { text: '전체 진행 상황을 점검한다', type: 'smart' },
        { text: '다른 팀원을 도와준다', type: 'diligent' },
        { text: '휴식을 취한다', type: 'lazy' },
        { text: '아무것도 하지 않는다', type: 'dumb' },
      ],
    },
    {
      id: 10,
      question: '업무 평가 시즌이 다가올 때 당신은?',
      options: [
        {
          text: '지난 업무를 정리하고 피드백을 준비한다',
          type: 'smart',
        },
        { text: '평소처럼 성실하게 일한다', type: 'diligent' },
        { text: '평가에 신경 쓰지 않는다', type: 'lazy' },
        { text: '평가를 잊고 지낸다', type: 'dumb' },
      ],
    },
  ];

  // 현재 몇 번째 질문을 보여줄지 상태로 관리 (처음엔 0번 인덱스)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // 사용자가 선택한 답변을 저장하는 배열
  const [answers, setAnswers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
  const router = useRouter();

  // 현재 질문 객체
  const currentQuestion = questions[currentQuestionIndex];

  // 선택지 클릭 시 실행되는 함수
  const handleOptionClick = async (type: string) => {
    // 버튼 클릭 시 로딩 상태로 변경
    setIsLoading(true);

    // 잠깐 지연시켜서 애니메이션 효과를 볼 수 있게 함
    await new Promise((resolve) => setTimeout(resolve, 300));

    setAnswers([...answers, type]);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // 결과 계산
      const allAnswers = [...answers, type];
      // smart/dumb, diligent/lazy 카운트
      let smart = 0,
        dumb = 0,
        diligent = 0,
        lazy = 0;
      allAnswers.forEach((ans) => {
        if (ans === 'smart') smart++;
        if (ans === 'dumb') dumb++;
        if (ans === 'diligent') diligent++;
        if (ans === 'lazy') lazy++;
      });

      // 유형 결정
      let resultType = '';
      if (smart >= dumb && diligent >= lazy) resultType = '똑부';
      else if (smart >= dumb && lazy > diligent) resultType = '똑게';
      else if (dumb > smart && diligent >= lazy) resultType = '멍부';
      else resultType = '멍게';

      // 결과 페이지로 이동 (쿼리스트링으로 유형 전달)
      router.push(`/result?type=${encodeURIComponent(resultType)}`);
    }

    // 로딩 상태 해제
    setIsLoading(false);
  };

  return (
    <>
      <ThemeToggle />
      <main className={styles.container}>
        <h1 className={styles.title}>직장인 유형 테스트</h1>
        <p className={styles.question}>{currentQuestion.question}</p>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {currentQuestion.options.map((option, idx) => (
            <li key={idx}>
              <button
                className={styles.button}
                onClick={() => handleOptionClick(option.type)}
                disabled={isLoading} // 로딩 중에는 버튼 비활성화
                style={{
                  opacity: isLoading ? 0.6 : 1,
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                }}>
                {isLoading ? '처리 중...' : option.text}
              </button>
            </li>
          ))}
        </ul>
        <div className={styles.progress}>
          {currentQuestionIndex + 1} / {questions.length} 문항
        </div>
      </main>
    </>
  );
}
