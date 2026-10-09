import { CHOICES } from './ChoiceButtons'

const LABELS = {
  victoire: 'Victoire',
  defaite: 'Défaite',
  egalite: 'Égalité',
}

function findChoice(id) {
  return CHOICES.find((choice) => choice.id === id)
}

function History({ history }) {
  if (history.length === 0) return null

  return (
    <section className="history">
      <h2>Historique</h2>
      <ul>
        {history.map((entry) => {
          const player = findChoice(entry.joueur)
          const computer = findChoice(entry.ordi)
          return (
            <li key={entry.id} className="history-item">
              <span className="history-number">#{entry.id}</span>
              <span>
                {player.emoji} {player.label} vs {computer.emoji} {computer.label}
              </span>
              <span className={`history-result round-${entry.resultat}`}>
                {LABELS[entry.resultat]}
              </span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default History
