import React, { useContext, useEffect } from 'react';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { timerState, TimerType } from '../Atoms/Timer';

type TimerInitializer = { children: React.ReactNode };

const TimerContextProviderMemo = ({ children }: TimerInitializer) => {
    const setTimerState = useSetRecoilState(timerState);
    const startTimer = (dispatchEvent: TimerType) => {
        const time = new Date().getTime();
        setTimerState(( prev ) => {
            prev.timerStartMap[dispatchEvent] = time;
            return {
                ...prev
            }
        })
    }

    const stopTimer = (dispatchEvent: TimerType) => {
        const elapsedTime = new Date().getTime();
        setTimerState((prev) => {
            const startTime = prev.timerStartMap[dispatchEvent];
            prev.timerStartMap[dispatchEvent] = undefined;
            if (startTime)
                prev.elapsedTime[dispatchEvent] = elapsedTime - startTime;
            return { 
                ...prev
            }
        })
    }

    useEffect(() => {
        const startTime = new Date().getTime();
        setTimerState((prev) => {
            prev.timerStartMap[TimerType.Splash] = startTime;
            return {
                ...prev,
                startTimer: startTimer,
                stopTimer: stopTimer,
            }
        })
    }, [])

    return (
        <>
            { children }
        </>
    )
}

const TimerContextProvider = React.memo(TimerContextProviderMemo, () => true);

export const useTimer = () => {
    const recoilValue = useRecoilValue(timerState);
    if (recoilValue === undefined) {
        throw new Error('useTimerContextState must be used within a TimerContextProvider');
    }
    return recoilValue;
};

export { TimerContextProvider };

