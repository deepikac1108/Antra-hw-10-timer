import React, { useState, useRef, useEffect } from 'react';

function Timer() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef(null);

  const handleStart = () => {
    const totalTime = parseInt(minutes) * 60 + parseInt(seconds);
    setTimeLeft(totalTime);
    setIsActive(true);
  };

  const handlePauseResume = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setTimeLeft(0);
    setMinutes(0);
    setSeconds(0);
  };

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isActive, timeLeft]);

  const displayTime = () => {
    const minutesLeft = Math.floor(timeLeft / 60);
    const secondsLeft = timeLeft % 60;
    return `${String(minutesLeft).padStart(2, '0')}:${String(secondsLeft).padStart(2, '0')}`;
  };

  return (
    <div>
      <div>
        <label>
          Minutes:
          <input
            type="number"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            disabled={isActive}
          />
        </label>
        <label>
          Seconds:
          <input
            type="number"
            value={seconds}
            onChange={(e) => setSeconds(e.target.value)}
            disabled={isActive}
          />
        </label>
      </div>
      <div>
        <button onClick={handleStart} disabled={isActive}>
          START
        </button>
        <button onClick={handlePauseResume}>
          {isActive ? 'PAUSE' : 'RESUME'}
        </button>
        <button onClick={handleReset}>
          RESET
        </button>
      </div>
      <h2>{displayTime()}</h2>
    </div>
  );
}

export default Timer;