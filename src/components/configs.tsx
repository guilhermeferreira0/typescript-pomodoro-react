import React, { useState } from 'react';
import { PomodoroTimer } from './pomodoro-timer';

export function Configs(): JSX.Element {
  const [inputWork, setInputWork] = useState(10);
  const [inputRest, setInputRest] = useState(10);
  const [inputCycles, setInputCycles] = useState(4);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const inputId = e.target.id;
    const inputValue = Number(e.target.value);
    if (inputId === 'inputWorkConfig') setInputWork(inputValue);
    else if (inputId === 'inputRestConfig') setInputRest(inputValue);
    else if (inputId === 'inputCyclesConfig') setInputCycles(inputValue);
    return;
  };

  return (
    <div className="container">
      <PomodoroTimer
        pomodoroTime={inputWork}
        shortRestTime={inputRest}
        longRestTime={5}
        cycles={inputCycles}
      />

      <div className="configs">
        <h3>Configurações</h3>
        <label htmlFor="inputWorkConfig">
          Tempo de Trabalho:
          <input
            type="number"
            id="inputWorkConfig"
            value={inputWork}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="inputRestConfig">
          Tempo de Descanso:
          <input
            type="number"
            id="inputRestConfig"
            value={inputRest}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="inputCyclesConfig">
          Ciclos:
          <input
            type="number"
            id="inputCyclesConfig"
            value={inputCycles}
            onChange={handleChange}
          />
        </label>
      </div>
    </div>
  );
}
