import type { FetchContentResult } from "@enonic/nextjs-adapter";
import { getUrl } from "@enonic/nextjs-adapter";
import { Badge } from "@gjensidige/core-components/lib/badge";
import { Button } from "@gjensidige/core-components/lib/button";
import { TextContainer } from "@gjensidige/core-components/lib/text-container";
import { DateRange } from "@gjensidige/nci-core-icons/lib/date-range";
import { Earth } from "@gjensidige/nci-core-icons/lib/products/earth";
import { Valuables } from "@gjensidige/nci-core-icons/lib/products/valuables";
import { Text } from "@gjensidige/nci-core-typography/lib/text";
import { Title } from "@gjensidige/nci-core-typography/lib/title";
import classNames from "classnames";
import { format } from "date-fns";
import React, { useState } from "react";

import styles from "./Event.module.css";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore force work
const Event: React.FC = (props: FetchContentResult) => {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const { displayName, data, parent } = props.data?.get as any;
  if (!data) return;
  const {
    theme,
    startDateTime,
    endDateTime,
    description,
    body,
    location,
    showCountdown,
    attendees,
    eventPrice,
  } = data;
  const meta = props.meta;
  const { _path } = parent;
  const startDate = format(new Date(startDateTime), "dd.MM.yyyy");
  const startTime = format(new Date(startDateTime), "HH:mm");
  const endDate = format(new Date(endDateTime), "dd.MM.yyyy");
  const endTime = format(new Date(endDateTime), "HH:mm");

  const calculateTimeLeft = () => {
    const targetDate = new Date(startDateTime).getTime();
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
    <header className={classNames(styles["background"], styles[theme])}>
      <div id="partAnchor_event" className={styles.eventPart}>
        <Title tag="h1" size="2" className={styles.title}>
          {displayName}
        </Title>
        {description && <p className={styles.description}>{description}</p>}
        {location && (
          <div className={classNames([styles.iconAndTextCell, styles.fullRow])}>
            <Earth className={styles.icon} />
            <Text className={styles.location}>
              <strong>Location: </strong>
              {location}
            </Text>
          </div>
        )}
        {eventPrice > 0 && <Badge type="suggestion">{eventPrice}kr</Badge>}
        <TextContainer className={styles.container}>
          <div className={styles.columnise}>
            <Title tag="h4" size="6">
              Begins at:
            </Title>
            {startDate && (
              <div className={styles.iconAndTextCell}>
                <DateRange className={styles.icon} />
                <Text>
                  <strong>
                    {format(new Date(startDateTime), "dd.MM.yyyy")}
                  </strong>
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
              <Text className={styles.information}>
                This event is limited to <strong>{attendees}</strong>{" "}
                participants!
              </Text>
            )}
            <div className={styles.countdownContainer}>
              <Title tag="h4" size="4" className={styles.countdown}>
                Countdown
              </Title>
              <Text className={styles.countdowntext}>
                {timeLeft.days} days {timeLeft.hours} hours {timeLeft.minutes}{" "}
                minutes
              </Text>
            </div>
          </div>
        )}
        {body?.processedHtml && (
          <div
            className={styles.fullBody}
            dangerouslySetInnerHTML={{ __html: body.processedHtml }}
          ></div>
        )}
        <Button variant="secondary" href={getUrl(_path, meta)}>
          Back to Events
        </Button>
      </div>
    </header>
  );
};

export default Event;
