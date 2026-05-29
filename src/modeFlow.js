export const BLOCKER_SUGGESTIONS = [
  '많은 시간이 들 것 같아서 시작할 엄두가 안 나요.',
  '완벽하게 하고 싶다는 생각에 부담감이 들어요.',
  '어디부터 시작해야 할지 감이 안 잡혀요.',
  '오늘은 에너지가 부족해요.',
]

export const GOAL_SUGGESTIONS = [
  '논문 관련 작업하기',
  '운동하기',
  '보고서 한 장 쓰기',
  '메일 답장하기',
]

export const START_TEMPLATES = [
  {
    id: 'small',
    title: '지금 당장 할 수 있는 작은 일 생각하기',
    desc: '부담 없이 딱 한 가지만 골라봐요.',
    buildAction: (ctx) => suggestFromContext(ctx, '딱 1분만 시작해보기'),
  },
  {
    id: 'easy',
    title: '가장 쉬운 부분부터 시작하기',
    desc: '부담이 가장 적은 단계로 시작해보세요.',
    buildAction: (ctx) => suggestFromContext(ctx, '가장 쉬운 부분부터 해보기'),
  },
  {
    id: 'draft',
    title: '초안만 만들어보기',
    desc: '완벽하지 않아도 괜찮아요. 일단 형태만 남겨보세요.',
    buildAction: (ctx) => suggestFromContext(ctx, '초안만 남겨보기'),
  },
  {
    id: 'messy',
    title: '엉망으로라도 완료하기',
    desc: '한번에 완벽하게가 아니라, 완료하는데 초점을 맞춰봐요.',
    buildAction: (ctx) => suggestFromContext(ctx, '엉망이어도 끝까지 해보기'),
  },
  {
    id: 'timer',
    title: '타이머 켜고 10분만 해보기',
    desc: '길게 집중하지 않아도 괜찮아요.',
    buildAction: (ctx) => suggestFromContext(ctx, '10분만 해보기'),
    defaultTimer: 10,
    step3Title: '가볍게 10분만 시작해봐요!',
  },
  {
    id: 'seventy',
    title: '목표의 70%만 해보기',
    desc: '충분한 수준까지만 가볍게 도달해요.',
    buildAction: (ctx) => suggestFromContext(ctx, '70%만 해보기'),
  },
]

const MIN_ACTION_TEMPLATES = [
  [/(논문|리포트|report)/, '파일만 열어두기'],
  [/(운동|헬스|달리기|걷기)/, '운동복만 꺼내두기'],
  [/(메일|이메일|답장)/, '메일 창만 열어두기'],
  [/(공부|시험|학습|책)/, '책상에 앉아보기'],
  [/(청소|정리|설거지)/, '도구 하나만 꺼내두기'],
  [/(글|글쓰기|일기)/, '빈 문서 파일만 열기'],
  [/(코딩|개발|프로젝트)/, '에디터만 켜두기'],
]

function suggestMinAction(text) {
  for (const [pattern, action] of MIN_ACTION_TEMPLATES) {
    if (pattern.test(text)) return action
  }
  return '딱 1분만 시작해보기'
}

function suggestFromContext({ blocker, milestoneName }, suffix) {
  const subject = milestoneName || blocker.trim()
  if (!subject) return suffix
  const min = suggestMinAction(subject)
  return `${subject} — ${suffix || min}`
}

export function buildMinAction(template, blocker, milestoneName) {
  return template.buildAction({ blocker, milestoneName })
}
