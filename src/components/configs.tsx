import React, { useState } from 'react';
import { PomodoroTimer } from './pomodoro-timer';

export function Configs(): JSX.Element {
  const [inputWork, setInputWork] = useState(10);
  const [inputRest, setInputRest] = useState(10);
  const [inputCycles, setInputCycles] = useState(4);

  const handleChangeWork = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const inputValue = Number(e.target.value);
    setInputWork(inputValue);
  };

  const handleChangeRest = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const inputValue = Number(e.target.value);
    setInputRest(inputValue);
  };

  const handleChangeCycles = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const inputValue = Number(e.target.value);
    setInputCycles(inputValue);
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
            onChange={handleChangeWork}
          />
        </label>

        <label htmlFor="inputRestConfig">
          Tempo de Descanso:
          <input
            type="number"
            id="inputRestConfig"
            value={inputRest}
            onChange={handleChangeRest}
          />
        </label>

        <label htmlFor="inputCyclesConfig">
          Ciclos:
          <input
            type="number"
            id="inputCyclesConfig"
            value={inputCycles}
            onChange={handleChangeCycles}
          />
        </label>
      </div>
    </div>
  );
}
