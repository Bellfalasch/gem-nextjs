import type { FetchContentResult } from "@enonic/nextjs-adapter";
import { getUrl } from "@enonic/nextjs-adapter";
import { format } from "date-fns";
import React, { useState } from "react";

const Event = (props: FetchContentResult) => {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const { displayName, data, parent } = props.data?.get as any;
  const {
    startDate,
    endDate,
    description,
    startTime,
    endTime,
    location,
    showCountdown,
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

  const [timeLeft] = useState(calculateTimeLeft());

  return (
    <>
      <div>
        <h1>{displayName}</h1>
        <p>{description}</p>
        <p>Sted: {location}</p>
        {startDate && (
          <p>Begins: {format(new Date(startDate), "dd.MM.yyyy")}</p>
        )}
        {startTime && <p>Starts at: {startTime}</p>}
        {endDate && <p>Ends: {format(new Date(endDate), "dd.MM.yyyy")}</p>}
        {endTime && <p>Ends at: {endTime}</p>}
      </div>
      {startDate && startTime && showCountdown && (
        <div>
          <h4>Countdown</h4>
          <div>
            {timeLeft.days} days {timeLeft.hours} hours {timeLeft.minutes}{" "}
            minutes
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
