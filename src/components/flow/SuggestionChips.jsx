import { chipButton } from '../../lib/flowClasses'

export default function SuggestionChips({ suggestions, value, onSelect }) {
  return (
    <div className="mb-6 flex flex-col gap-2">
      {suggestions.map(text => (
        <button
          key={text}
          type="button"
          onClick={() => onSelect(text)}
          className={chipButton(value === text)}
        >
          {text}
        </button>
      ))}
    </div>
  )
}
