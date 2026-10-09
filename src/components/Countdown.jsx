function Countdown({ count }) {
  return (
    <section className="countdown" aria-live="assertive">
      {/* key force React à rejouer l'animation à chaque chiffre */}
      <span key={count} className="countdown-number">
        {count}
      </span>
    </section>
  )
}

export default Countdown
