import React, { useEffect, useState, useCallback } from 'react';
import { useInterval } from '../hooks/use-interval';
import { Button } from './button';
import { Timer } from './timer';
import { secondsToTime } from '../utils/seconds-to-time';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bellStart = require('../sounds/src_sounds_bell-start.mp3');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bellFinish = require('../sounds/src_sounds_bell-finish.mp3');

const audioStartWork = new Audio(bellStart);
const audioStopWorking = new Audio(bellFinish);

interface Props {
  pomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
}

export function PomodoroTimer(props: Props): JSX.Element {
  const [mainTime, setMainTime] = useState(props.pomodoroTime);
  const [timeCounting, setTimeCounting] = useState(false);
  const [working, setWorking] = useState(false);
  const [resting, setResting] = useState(false);
  const [cyclesQtdManager, setCyclesQtdManager] = useState(
    new Array(props.cycles - 1).fill(true),
  );

  const [completedCycles, setCompletedCycles] = useState(0);
  const [fullWorkingTime, setFullWorkingTime] = useState(0);
  const [numberOfPomodoros, setNumberOfPomodoros] = useState(0);

  useInterval(
    () => {
      setMainTime(mainTime - 1);
      if (working) setFullWorkingTime(fullWorkingTime + 1);
    },
    timeCounting ? 1000 : null,
  );

  const configureWork = useCallback(() => {
    setTimeCounting(true);
    setWorking(true);
    setResting(false);
    setMainTime(props.pomodoroTime);
    audioStartWork.play();
  }, [setWorking, setResting, setMainTime, props.pomodoroTime]);

  const configureTextButton = () => {
    return timeCounting ? 'Pause' : 'Play';
  };

  const configureClassButton = () => {
    return !working && !resting ? 'hidden' : '';
  };

  const configureRest = useCallback(
    (long: boolean) => {
      setTimeCounting(true);
      setWorking(false);
      setResting(true);

      if (long) {
        setMainTime(props.longRestTime);
      } else {
        setMainTime(props.shortRestTime);
      }

      audioStopWorking.play();
    },
    [
      setTimeCounting,
      setWorking,
      setResting,
      setMainTime,
      props.longRestTime,
      props.shortRestTime,
    ],
  );

  useEffect(() => {
    if (working) document.body.classList.add('working');
    if (resting) document.body.classList.remove('working');

    if (mainTime > 0) return;
    if (working && cyclesQtdManager.length > 0) {
      configureRest(false);
      cyclesQtdManager.pop();
    } else if (working && cyclesQtdManager.length <= 0) {
      configureRest(true);
      setCyclesQtdManager(new Array(props.cycles - 1).fill(true));
      setCompletedCycles(completedCycles + 1);
    }

    if (working) setNumberOfPomodoros(numberOfPomodoros + 1);
    if (resting) configureWork();
  }, [
    working,
    resting,
    mainTime,
    cyclesQtdManager,
    numberOfPomodoros,
    completedCycles,
    configureRest,
    setCyclesQtdManager,
    configureWork,
    props.cycles,
  ]);

  return (
    <div className="pomodoro">
      <h2>Você está: {working ? 'Trabalhando' : 'Descansando'}</h2>
      <Timer mainTime={mainTime} />

      <div className="controls">
        <Button text="Work" onClick={() => configureWork()} />
        <Button text="Rest" onClick={() => configureRest(false)} />
        <Button
          className={configureClassButton()}
          text={configureTextButton()}
          onClick={() => setTimeCounting(!timeCounting)}
        />
      </div>

      <div className="details">
        <p>Ciclos concluídos: {completedCycles}</p>
        <p>Horas trabalhadas: {secondsToTime(fullWorkingTime)}</p>
        <p>Pomodoros concluídos: {numberOfPomodoros}</p>
      </div>
    </div>
  );
}
