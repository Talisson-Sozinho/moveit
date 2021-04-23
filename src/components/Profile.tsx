import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengeContext";
import styles from "../styles/components/Profile.module.css";

export function Profile(){
    const { level } = useContext( ChallengesContext );

    return(
        <div  className={ styles.profileContainer }>
            <img src="https://scontent-gig2-1.cdninstagram.com/v/t51.2885-15/e35/p1080x1080/140087477_1328820677452429_4766951262614460612_n.jpg?_nc_ht=scontent-gig2-1.cdninstagram.com&amp;_nc_cat=101&amp;_nc_ohc=xqEOzDAFxlUAX-GLXOf&amp;tp=1&amp;oh=cf070666845af48487a6bee7458615d9&amp;oe=605FC6B5" alt="Talisson" />
            <div>
                <strong> Talisson Sozinho </strong>
                <p>
                <img src="icons/level.svg" alt="level"/>
                Level {level}
                </p>
            </div>
        </div>
    )
}