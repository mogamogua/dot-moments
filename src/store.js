const STORAGE_KEY = 'dot-moments-data'

export const DOT_COLORS = [
  { key: 'blue',   flat: '#1976d2', gradient: 'linear-gradient(135deg, #4fc3f7 0%, #1976d2 45%, #7b1fa2 100%)', glow: 'rgba(79,195,247,0.55)' },
  { key: 'purple', flat: '#7b1fa2', gradient: 'linear-gradient(135deg, #ce93d8 0%, #7b1fa2 50%, #311b92 100%)', glow: 'rgba(206,147,216,0.55)' },
  { key: 'orange', flat: '#e65100', gradient: 'linear-gradient(135deg, #ffd740 0%, #ff6d00 50%, #e91e63 100%)', glow: 'rgba(255,109,0,0.5)' },
  { key: 'green',  flat: '#2e7d32', gradient: 'linear-gradient(135deg, #b9f6ca 0%, #00c853 50%, #007b43 100%)', glow: 'rgba(0,200,83,0.5)' },
  { key: 'pink',   flat: '#c2185b', gradient: 'linear-gradient(135deg, #f48fb1 0%, #e91e63 50%, #880e4f 100%)', glow: 'rgba(244,143,177,0.55)' },
]

const DEFAULT_DATA = {
  onboardingDone: false,
  milestones: [], // { id, name, colorKey }
  dots: [],       // { id, date, milestoneId, label, note, reflection }
}

export function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? { ...DEFAULT_DATA, ...JSON.parse(raw) } : { ...DEFAULT_DATA }
  } catch {
    return { ...DEFAULT_DATA }
  }
}

export function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function addDot(dot) {
  const data = loadData()
  data.dots.push({ id: Date.now(), date: new Date().toISOString(), ...dot })
  saveData(data)
  return data
}

export function getTodayDots() {
  const data = loadData()
  const today = new Date().toDateString()
  return data.dots.filter(d => new Date(d.date).toDateString() === today)
}

export function getMilestoneById(milestones, id) {
  return milestones.find(m => m.id === id) || { id: 'unknown', name: '기타', colorKey: 'purple' }
}

export function getColorByKey(key) {
  return DOT_COLORS.find(c => c.key === key) || DOT_COLORS[1]
}

export function formatDate(isoString) {
  const d = new Date(isoString)
  const month = d.getMonth() + 1
  const day = d.getDate()
  const weekdays = ['일', '월', '화', '수', '목', '금', '토']
  return `${month}월 ${day}일 ${weekdays[d.getDay()]}요일`
}
