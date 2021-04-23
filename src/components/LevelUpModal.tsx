import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengeContext";
import styles from "../styles/components/LevelUpModal.module.css";

export function LevelUpModal(){
    const { level, CloseLevelUpModal } = useContext(ChallengesContext)

    return(
        <div className={styles.overLay}>
            <div className={styles.container}>
                <header>{ level }</header>
                <strong>Parabéns</strong>
                <p>vc alcançou o lvl {level}.</p>
                <button type="button"
                    onClick={CloseLevelUpModal}
                >
                    <img src="/icons/close.svg" alt="fechar modal"/>
                </button>
            </div>
        </div>
    );   
}