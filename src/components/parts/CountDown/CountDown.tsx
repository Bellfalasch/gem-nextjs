import { PartProps } from "@enonic/nextjs-adapter/views/BasePart";
import React, { useEffect, useState } from "react";

import styles from "./CountDown.module.css";

interface CountdownProps extends PartProps {
  targetDate: string;
  title: string;
}

const Countdown: React.FC<CountdownProps> = ({ part }) => {
  const targetDate = part?.config?.targetDate || "";
  const title = part?.config?.title || "";

  const calculateTimeLeft = () => {
    const difference = new Date(targetDate).getTime() - new Date().getTime();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className={styles.container}>
      <h4 className={styles.title}>{title}</h4>
      <div className={styles.countdown}>
        {timeLeft.days} {timeLeft.hours} {timeLeft.minutes} {timeLeft.seconds}
      </div>
      <div>
        <p className={styles.countdowntext}>DAGER TIMER MINUTTER SEKUNDER</p>
      </div>
    </div>
  );
};

export default Countdown;
