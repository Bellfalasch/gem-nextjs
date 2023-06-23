import React, { useState } from "react";
import { FetchContentResult, getUrl } from "@enonic/nextjs-adapter";

const Event = (props: FetchContentResult) => {
  const { displayName, data, parent } = props.data?.get as any;
  const {
    startDate,
    endDate,
    description,
    startTime,
    endTime,
    location,
    showCountdown
  } = data;
  const meta = props.meta;
  const { _path } = parent;

  const calculateTimeLeft = () => {
    const targetDate = new Date(`${startDate}T${startTime}`).getTime();
    const difference = targetDate - new Date().getTime();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  return (
    <>
      <div>
        <h1>{displayName}</h1>
        <p>{description}</p>
        <p>Sted: {location}</p>
        {startDate && <p>Begins: {startDate}</p>}
        {startTime && <p>Starts at: {startTime}</p>}
        {endDate && <p>Ends: {endDate}</p>}
        {endTime && <p>Ends at: {endTime}</p>}
      </div>
      {startDate && startTime && showCountdown && (
        <div>
          <h4>Countdown</h4>
          <div>
            {timeLeft.days} days {timeLeft.hours} hours {timeLeft.minutes} minutes
          </div>
        </div>
      )}
      <p>
        <a href={getUrl(_path, meta)}>Back to Events ...</a>
      </p>
    </>
  );
};

export default Event;
