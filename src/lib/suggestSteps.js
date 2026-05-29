export function suggestSteps(goal) {
  const presets = [
    [/(운동|헬스|달리기|걷기)/, ['운동복 입기', '밖으로 나가기', '10분 움직이기']],
    [/(논문|보고서|글)/, ['파일 열기', '첫 문장 쓰기', '한 단락 완성하기']],
    [/(공부|시험|학습)/, ['교재 펴기', '오늘 범위 확인', '첫 페이지 읽기']],
    [/(코딩|개발|프로젝트)/, ['에디터 열기', '할 일 한 줄 적기', '코드 한 줄 쓰기']],
  ]
  for (const [pattern, steps] of presets) {
    if (pattern.test(goal)) return steps
  }
  return [`${goal} — 준비하기`, `${goal} — 일부 해보기`, `${goal} — 마무리`]
}
