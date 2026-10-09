import { useEffect, useState } from 'react'
import ChoiceButtons from './components/ChoiceButtons'
import Countdown from './components/Countdown'
import History from './components/History'
import RoundResult from './components/RoundResult'
import Scoreboard from './components/Scoreboard'
import './App.css'

const INITIAL_SCORES = { victoires: 0, defaites: 0, egalites: 0 }
const HISTORY_SIZE = 10
const COUNTDOWN_START = 3
const COUNTDOWN_STEP_MS = 700

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
  const [history, setHistory] = useState([])

  // pending : choix du joueur en attente pendant le compte à rebours
  const [pending, setPending] = useState(null)

  function handleChoose(joueur) {
    setRound(null)
    setPending({ joueur, count: COUNTDOWN_START })
  }

  function playRound(joueur) {
    const ordi = getComputerChoice()
    const resultat = getResult(joueur, ordi)
    setRound({ joueur, ordi, resultat })
    setHistory((prev) => {
      const id = (prev[0]?.id ?? 0) + 1
      return [{ id, joueur, ordi, resultat }, ...prev].slice(0, HISTORY_SIZE)
    })
    setScores((prev) => {
      const key = { victoire: 'victoires', defaite: 'defaites', egalite: 'egalites' }[resultat]
      return { ...prev, [key]: prev[key] + 1 }
    })
  }

  useEffect(() => {
    if (!pending) return
    const timer = setTimeout(() => {
      if (pending.count > 1) {
        setPending({ ...pending, count: pending.count - 1 })
      } else {
        setPending(null)
        playRound(pending.joueur)
      }
    }, COUNTDOWN_STEP_MS)
    return () => clearTimeout(timer)
  }, [pending])

  function handleReset() {
    setPending(null)
    setRound(null)
    setScores(INITIAL_SCORES)
    setHistory([])
  }

  return (
    <main className="app">
      <h1>Pierre · Feuille · Ciseaux</h1>
      <Scoreboard scores={scores} />
      {pending ? <Countdown count={pending.count} /> : <RoundResult round={round} />}
      <ChoiceButtons onChoose={handleChoose} disabled={pending !== null} />
      <button type="button" className="reset" onClick={handleReset}>
        Réinitialiser
      </button>
      <History history={history} />
    </main>
  )
}

export default App
