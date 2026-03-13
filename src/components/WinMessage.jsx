import React from 'react'

const WinMessage = ({ moves, score, onReset }) => {
  return (
    <div className="win-message">
      <h2>Congratulations🎉</h2>
      <p>
        you have completed the games in {moves} moves!
        {/* <strong>Score:</strong> {score} • <strong>Moves:</strong> {moves} */}
      </p>
    </div>
  )
}

export default WinMessage