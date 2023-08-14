import type { FetchContentResult } from "@enonic/nextjs-adapter";
import { Badge } from "@gjensidige/core-components/lib/badge";
import { TextContainer } from "@gjensidige/core-components/lib/text-container";
import { Tooltip } from "@gjensidige/core-components/lib/tooltip";
import { DateRange } from "@gjensidige/nci-core-icons/lib/date-range";
import { Earth } from "@gjensidige/nci-core-icons/lib/products/earth";
import { Valuables } from "@gjensidige/nci-core-icons/lib/products/valuables";
import { Text } from "@gjensidige/nci-core-typography/lib/text";
import { Title } from "@gjensidige/nci-core-typography/lib/title";
import Axios from "axios";
import classNames from "classnames";
import { format } from "date-fns";
import React, { use, useEffect, useState } from "react";

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

  const eventId =
    props?.common?.get.type === "com.gjensidige.internal.gem:event"
      ? props?.common?.get._id
      : undefined;
  if (!eventId) return;

  const [participants, setParticipants] = useState(0);

  useEffect(() => {
    Axios.get(
      `http://localhost:8080/admin/site/preview/moviedb/draft/gem/test-event/_/service/com.gjensidige.internal.gem/rsvp?eventId=${eventId}`
    ).then((res) => {
      setParticipants(res.data.participants);
    });
  }, [eventId]);

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
        {eventPrice > 0 && (
          <>
            <div>
              For this event, a{" "}
              <Tooltip
                data-testid="tooltip"
                color="blue"
                size="sm"
                arrow="left"
                place="bottom"
                content={
                  <p>
                    A deductible payment is required to secure your
                    participation. Don't worry, we've got you covered for the
                    rest of the expenses!
                  </p>
                }
              >
                deductible
              </Tooltip>{" "}
              payment is required:
            </div>
            <div>
              <Badge type="suggestion">{eventPrice}kr</Badge>
            </div>
          </>
        )}
        <TextContainer className={styles.container}>
          <div className={styles.columnise}>
            <Title tag="h6">Begins at:</Title>
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
            <Title tag="h6">Ends at:</Title>
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
              <>
                <Text className={styles.information}>
                  This event is limited to <strong>{attendees}</strong>{" "}
                  participants!
                </Text>
                <Text>
                  There is currently
                  <strong> {participants}</strong> registered
                </Text>
              </>
            )}
            <div className={styles.countdownContainer}>
              <Title tag="h4" className={styles.countdown}>
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
      </div>
    </header>
  );
};

export default Event;
