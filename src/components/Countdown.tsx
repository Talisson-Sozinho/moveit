import { useContext } from "react";
import { CountdownContext } from "../contexts/CountdownContext";
import styles from "../styles/components/Countdown.module.css";

export function Countdown(){
    
    const { minutes, seconds, hasFinished, isRunning, startCountdown, stopCountdown } = useContext(CountdownContext);

    const [minutesLeft, minutesRight] = String(minutes).padStart(2,"0").split("");
    const [secondsLeft, secondsRight] = String(seconds).padStart(2,"0").split("");

    return(
        <div>
            <div className={ styles.countdownContainer }>
                <div>
                    <span>{ minutesLeft }</span>
                    <span>{ minutesRight }</span>
                </div>
                 <span>:</span>
                 <div>
                   <span>{secondsLeft}</span>
                   <span>{secondsRight}</span>
                </div>
            </div>

            {   hasFinished ? (
                <button 
                    disabled
                    className={ styles.CountdownButton } 
                >
                    Ciclo terminou &#9989;
                </button>
            ):(
                <>
                {   isRunning ? ( 
                    <button 
                        type="button" 
                        className={ `${styles.CountdownButton} ${styles.stopCountdownButton}` } 
                        onClick={stopCountdown} 
                    >
                        Parar ciclo
                    </button>
                ) : (
                    <button 
                        type="button" 
                        className={ styles.CountdownButton } 
                        onClick={startCountdown} 
                    >
                        Iniciar ciclo
                    </button>
                )
                }
                </>
            )
            }     
        </div>
    );
}