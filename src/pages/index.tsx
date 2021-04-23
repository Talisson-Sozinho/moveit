import Head from "next/head";
import React from "react";
import { GetServerSideProps } from "next";

import { ChallengeBox } from "../components/ChallengeBox";
import { ChallengeCompleted } from "../components/ChallengeCompleted";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { CountdownProvider } from "../contexts/CountdownContext";

import styles from "../styles/pages/Home.module.css";
import { ChallengeProvider } from "../contexts/ChallengeContext";

interface HomeProps{
  level: number;
  currentExp: number;
  challangeCompleted: number;
}

export default function Home(props: HomeProps) {
  return (
    <ChallengeProvider 
      level={props.level} 
      currentExp={props.currentExp} 
      challangeCompleted={props.challangeCompleted} 
    >
      <div className={ styles.container }>
        <Head>
            <title> Início | moveit </title>
        </Head>

        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <ChallengeCompleted />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section> 
        </CountdownProvider>
      </div>
    </ChallengeProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async(ctx) =>{

  const { level, currentExp, challangeCompleted } = ctx.req.cookies;
  
  return {
    props: {
      level: Number(level),
      currentExp: Number(currentExp),
      challangeCompleted: Number(challangeCompleted),
    }
  }
}

