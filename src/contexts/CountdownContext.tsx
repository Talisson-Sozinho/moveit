import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengeContext";

let countdownTimeout: NodeJS.Timeout;

interface CountdownContextData{
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isRunning: boolean;
    stopCountdown: ()=>void;
    startCountdown:  ()=>void;
}

interface CountdownProviderProps{
    children: ReactNode;
}

export const CountdownContext = createContext( {} as CountdownContextData );

export function CountdownProvider( {children}: CountdownProviderProps ){

    const { startNewChallenge } = useContext( ChallengesContext );

    const [time, setTime] = useState(0.1 * 60);
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const [isRunning, setIsRunning] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    function startCountdown(){
        setIsRunning(true);
    }

    function stopCountdown(){
        clearTimeout( countdownTimeout );
        setIsRunning(false);
        setHasFinished(false);
        setTime(0.1 * 60);
    }

    useEffect( () => {
        if( isRunning && time > 0 ){
            countdownTimeout = setTimeout( () => {
                setTime(time - 1);
            }, 1000 );
        }else if( isRunning && time === 0){
            setHasFinished(true);
            setIsRunning(false);
            startNewChallenge();
        }
    },[ isRunning, time ]);

    return (
        <CountdownContext.Provider 
            value={ {
                minutes,
                seconds,
                hasFinished,
                isRunning,
                stopCountdown,
                startCountdown,
            } }
        >
            { children }
        </CountdownContext.Provider>
    );
}