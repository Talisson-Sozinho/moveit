import { createContext, ReactNode, useEffect, useState } from "react";
import Cookie from "js-cookie";
import challenges from "../../challenges.json";
import { LevelUpModal } from "../components/LevelUpmodal";

interface challenge{
    type: string;
    description: string;
    amount: number; 
}

interface ChallengesContextData{
    level: number;
    currentExp: number; 
    challengesCompleted: number;
    activeChallenge: challenge;
    expToNextLevel: number;
    CompleteChallenge: () => void;
    resetChallenge: ()=> void;
    startNewChallenge: ()=> void;
    levelUp: () => void;
    CloseLevelUpModal: ()=>void;
}

interface ChallengeProviderProps{
    children: ReactNode;
    level: number;
    currentExp: number;
    challangeCompleted: number;

}

export const ChallengesContext = createContext({} as ChallengesContextData );

export function ChallengeProvider( {children, ...rest }: ChallengeProviderProps ){
    const [ level, setLevel ] = useState( rest.level ?? 1 );
    const [ currentExp, setCurrentExp ] = useState( rest.currentExp ?? 0);
    const [ challengesCompleted, setChallengesCompleted ] = useState( rest.challangeCompleted ?? 0);

    const [activeChallenge, setActiveChallenge ] = useState(null);
    const [ isLevelUpModalOpen, setIsLevelUpModalOpen ] = useState(false); 

    const expToNextLevel = Math.pow( ( level + 1 ) * 4, 2);

    useEffect( ()=>{
        Notification.requestPermission();
    }, []);

    useEffect( ()=>{
        Cookie.set("level", String(level));
        Cookie.set("currentExp", String(currentExp));
        Cookie.set("challengesCompleted", String(challengesCompleted));
    } , [ level, currentExp, challengesCompleted ]);

    function startNewChallenge(){
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length );
        const challenge = challenges[ randomChallengeIndex ]

        setActiveChallenge(challenge);
        
        new Audio("/notification.mp3").play();

        if(Notification.permission === "granted"){
            new Notification ("Novo desafio 🎉", {
                body: `Valendo ${challenge.amount} xp!`
            });
        }
    }

    function resetChallenge(){
        setActiveChallenge(null);
    }

    function CompleteChallenge(){
        if( !activeChallenge ){
            return;
        }

        const { amount } = activeChallenge;

        let finalExp = currentExp + amount;

        if( finalExp >= expToNextLevel ){
            levelUp();
            finalExp = finalExp - expToNextLevel;
        }
        setCurrentExp(finalExp);
        resetChallenge();
        setChallengesCompleted( challengesCompleted + 1);
    }

    function levelUp(){
        setLevel( level + 1 );
        setIsLevelUpModalOpen(true);
    }
    function CloseLevelUpModal(){
        setIsLevelUpModalOpen(false);
    }

    return (
        <ChallengesContext.Provider 
            value={ { 
                level,
                levelUp,
                currentExp, 
                challengesCompleted,
                startNewChallenge,
                activeChallenge,
                resetChallenge,
                expToNextLevel,
                CompleteChallenge,
                CloseLevelUpModal,
            } } 
        >
            {children}
            { isLevelUpModalOpen && <LevelUpModal />}
        </ChallengesContext.Provider>
    );
}
