function Scoreboard({ scores }) {
  return (
    <ul className="scoreboard">
      <li className="score score-win">
        <span className="score-value">{scores.victoires}</span>
        <span>Victoires</span>
      </li>
      <li className="score score-draw">
        <span className="score-value">{scores.egalites}</span>
        <span>Égalités</span>
      </li>
      <li className="score score-lose">
        <span className="score-value">{scores.defaites}</span>
        <span>Défaites</span>
      </li>
    </ul>
  )
}

export default Scoreboard
