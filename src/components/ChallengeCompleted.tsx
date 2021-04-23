import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengeContext";
import styles from "../styles/components/ChallengeCompleted.module.css"

export function ChallengeCompleted(){
    const { challengesCompleted } = useContext( ChallengesContext );

    return(
        <div className={ styles.finishedContainer } >
            <span>Desafios completos</span>
            <span>{ String(challengesCompleted).padStart(2, "0") }</span>
        </div>
    );
}