import { CHOICES } from './ChoiceButtons'

const MESSAGES = {
  victoire: 'Victoire !',
  defaite: 'Défaite…',
  egalite: 'Égalité',
}

function findChoice(id) {
  return CHOICES.find((choice) => choice.id === id)
}

function RoundResult({ round }) {
  if (!round) {
    return <p className="hint">Choisis pierre, feuille ou ciseaux pour commencer.</p>
  }

  const player = findChoice(round.joueur)
  const computer = findChoice(round.ordi)

  return (
    <section className="round" aria-live="polite">
      <div className="round-choices">
        <div className="round-choice">
          <span className="round-emoji">{player.emoji}</span>
          <span>Toi : {player.label}</span>
        </div>
        <span className="round-vs">VS</span>
        <div className="round-choice">
          <span className="round-emoji">{computer.emoji}</span>
          <span>Ordi : {computer.label}</span>
        </div>
      </div>
      <p className={`round-message round-${round.resultat}`}>
        {MESSAGES[round.resultat]}
      </p>
    </section>
  )
}

export default RoundResult
