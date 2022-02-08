import React, { useState, useEffect } from "react";

const Timer = (props) => {
  const [timerValue, setTimerValue] = useState(props.initial);
  const [timer, setTimer] = useState();

  const handleReset = () => {
    clearTimeout(timer);
  };

  useEffect(() => {
    const t = setTimeout(() => {
      if (timerValue > 0) setTimerValue(timerValue - 1);
      if (timerValue === 0) {
        clearTimeout(t);
      }
    }, 1000);
    setTimer(t);
  }, [timerValue]);

  return (
    <div data-testid="app-title">
      <div className="mt-100 layout-column align-items-center justify-content-center">
        <div className="timer-value" data-testid="timer-value">
          {timerValue}
        </div>
        <button className="large" data-testid="stop-button" onClick={handleReset}>
          Stop Timer
        </button>
      </div>
    </div>
  );
};

export default Timer;
