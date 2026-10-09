import { useState } from 'react'
import ChoiceButtons from './components/ChoiceButtons'
import RoundResult from './components/RoundResult'
import Scoreboard from './components/Scoreboard'
import './App.css'

const INITIAL_SCORES = { victoires: 0, defaites: 0, egalites: 0 }

// TEMP : logique provisoire, à remplacer par celle de src/game.js (autre branche)
const IDS = ['pierre', 'feuille', 'ciseaux']
const BEATS = { pierre: 'ciseaux', ciseaux: 'feuille', feuille: 'pierre' }

function getComputerChoice() {
  return IDS[Math.floor(Math.random() * IDS.length)]
}

function getResult(joueur, ordi) {
  if (joueur === ordi) return 'egalite'
  return BEATS[joueur] === ordi ? 'victoire' : 'defaite'
}
// FIN TEMP

function App() {
  const [round, setRound] = useState(null)
  const [scores, setScores] = useState(INITIAL_SCORES)

  function handleChoose(joueur) {
    const ordi = getComputerChoice()
    const resultat = getResult(joueur, ordi)
    setRound({ joueur, ordi, resultat })
    setScores((prev) => {
      const key = { victoire: 'victoires', defaite: 'defaites', egalite: 'egalites' }[resultat]
      return { ...prev, [key]: prev[key] + 1 }
    })
  }

  function handleReset() {
    setRound(null)
    setScores(INITIAL_SCORES)
  }

  return (
    <main className="app">
      <h1>Pierre · Feuille · Ciseaux</h1>
      <Scoreboard scores={scores} />
      <RoundResult round={round} />
      <ChoiceButtons onChoose={handleChoose} />
      <button type="button" className="reset" onClick={handleReset}>
        Réinitialiser
      </button>
    </main>
  )
}

export default App
