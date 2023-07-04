import type { FetchContentResult } from "@enonic/nextjs-adapter";
import { getUrl } from "@enonic/nextjs-adapter";
import { TextContainer } from "@gjensidige/core-components/lib/text-container";
import { DateRange } from "@gjensidige/nci-core-icons/lib/date-range";
import { Earth } from "@gjensidige/nci-core-icons/lib/products/earth";
import { Valuables } from "@gjensidige/nci-core-icons/lib/products/valuables";
import { Link } from "@gjensidige/nci-core-typography/lib/link";
import { Text } from "@gjensidige/nci-core-typography/lib/text";
import { Title } from "@gjensidige/nci-core-typography/lib/title";
import classNames from "classnames";
import { format } from "date-fns";
import React, { useState } from "react";

import styles from "./Event.module.css";

const Event = (props: FetchContentResult) => {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const { displayName, data, parent } = props.data?.get as any;
  const {
    startDateTime,
    endDateTime,
    description,
    location,
    showCountdown,
    attendees,
  } = data;
  const meta = props.meta;
  const { _path } = parent;
  const startDate = format(new Date(startDateTime), "dd.MM.yyyy");
  const startTime = format(new Date(startDateTime), "HH:mm");
  const endDate = format(new Date(endDateTime), "dd.MM.yyyy");
  const endTime = format(new Date(endDateTime), "HH:mm");

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
      <Title tag="h1" size="2">
        {displayName}
      </Title>
      <Text>{description}</Text>
      {location && (
        <div className={classNames([styles.iconAndTextCell, styles.fullRow])}>
          <Earth className={styles.icon} />
          <Text>{location}</Text>
        </div>
      )}
      <TextContainer className={styles.container}>
        <div className={styles.columnise}>
          <Title tag="h4" size="6">
            Begins at:
          </Title>
          {startDate && (
            <div className={styles.iconAndTextCell}>
              <DateRange className={styles.icon} />
              <Text>
                <strong>{format(new Date(startDateTime), "dd.MM.yyyy")}</strong>
              </Text>
            </div>
          )}
          {startTime && (
            <div className={styles.iconAndTextCell}>
              <Valuables className={styles.icon} />
              <Text>{startTime}</Text>
            </div>
          )}
        </div>

        <div className={styles.columnise}>
          <Title tag="h4" size="6">
            Ends at:
          </Title>
          {endDate && (
            <div className={styles.iconAndTextCell}>
              <DateRange className={styles.icon} />
              <Text>
                <strong>{format(new Date(endDateTime), "dd.MM.yyyy")}</strong>
              </Text>
            </div>
          )}
          {endTime && (
            <div className={styles.iconAndTextCell}>
              <Valuables className={styles.icon} />
              {endTime && <Text>{endTime}</Text>}
            </div>
          )}
        </div>
      </TextContainer>
      {startDate && startTime && showCountdown && (
        <div>
          {attendees > 0 && (
            <Text>
              This event is limited to <strong>{attendees}</strong>{" "}
              participants!
            </Text>
          )}
          <Title tag="h4" size="4">
            Countdown
          </Title>
          <Text>
            {timeLeft.days} days {timeLeft.hours} hours {timeLeft.minutes}{" "}
            minutes
          </Text>
        </div>
      )}
      <Link href={getUrl(_path, meta)}>Back to Events ...</Link>
    </>
  );
};

export default Event;
