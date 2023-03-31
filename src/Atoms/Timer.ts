import { atom } from "recoil";

export enum TimerType {
    App = 'timeToApp',
    Splash = 'timeToSplash',
}

type TimerMap = { [key in TimerType]?: number };

interface TimerState {
    timerStartMap: TimerMap;
    elapsedTime: TimerMap;
    startTimer: (_: TimerType) => void;
    stopTimer: (_: TimerType) => void;
}

export const timerState = atom({
    key: 'timerState',
    default: {
        timerStartMap: {},
        elapsedTime: {},
        startTimer: (_: TimerType) => {},
        stopTimer: (_: TimerType) => {},
    } as TimerState
})