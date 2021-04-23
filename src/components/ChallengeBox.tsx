import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengeContext";
import { CountdownContext } from "../contexts/CountdownContext";

import styles from "../styles/components/ChallengeBox.module.css"

export function ChallengeBox(){
    const { activeChallenge, resetChallenge, CompleteChallenge } = useContext( ChallengesContext );
    const { stopCountdown,  } = useContext( CountdownContext );

    function handleChallengeSucessed(){
        CompleteChallenge();
        stopCountdown();
    }

    function handleChallengeFailed(){
        resetChallenge();
        stopCountdown();
    }

    return(
        <div className={ styles.challengeBoxContainer }>
            {   activeChallenge ? (
                <div className={ styles.challengeActive }>
                    <header>Ganhe {activeChallenge.amount} xp</header>
                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} alt="icon desafio" />
                        <strong>Exercite-se</strong>
                        <p>{activeChallenge.description}</p>
                    </main>
                    <footer>
                        <button 
                            type="button"
                            className={ styles.challengeFailedButton }
                            onClick={ handleChallengeFailed }
                        >
                            Fahei
                        </button>
                        <button 
                            type="button"
                            className={ styles.challengeCompletedButton }
                            onClick={ handleChallengeSucessed }
                        >
                            Completei
                        </button>
                    </footer>
                </div>
            ) : (
                <div className={ styles.challengeNotActive }>
                    <strong>Inicie um ciclo para receber desafios</strong>
                    <p>
                        <img src="icons/level-up.svg" alt="Level Up" />
                        Avance de level completando os desafios.
                    </p>
                </div>   
            )
            }
        </div>
    );
}