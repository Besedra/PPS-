export const CHOICES = [
  { id: 'pierre', label: 'Pierre', emoji: '✊' },
  { id: 'feuille', label: 'Feuille', emoji: '✋' },
  { id: 'ciseaux', label: 'Ciseaux', emoji: '✌️' },
]

function ChoiceButtons({ onChoose, disabled = false }) {
  return (
    <div className="choices">
      {CHOICES.map((choice) => (
        <button
          key={choice.id}
          type="button"
          className="choice"
          disabled={disabled}
          onClick={() => onChoose(choice.id)}
        >
          <span className="choice-emoji" aria-hidden="true">
            {choice.emoji}
          </span>
          <span>{choice.label}</span>
        </button>
      ))}
    </div>
  )
}

export default ChoiceButtons
