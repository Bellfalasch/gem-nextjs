import { getUrl } from "@enonic/nextjs-adapter";
import type { FetchContentResult } from "@enonic/nextjs-adapter";
import { Pagination } from "@gjensidige/core-components/lib/pagination";
import {
  ToggleTab,
  ToggleTabPane,
  ToggleTabs,
  ToggleTabsContext,
} from "@gjensidige/core-components/lib/toggle";
import { Text } from "@gjensidige/nci-core-typography/lib/text";
import classNames from "classnames";
import { format } from "date-fns";
import React, { useState } from "react";

import styles from "./EventList.module.css";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore force work
const EventList: React.FC = (props: FetchContentResult) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, meta } = props as any;
  const children = data.get.children;
  if (!children || children.length === 0) {
    return null;
  }

  const [selectedTab, setSelectedTab] = useState(0);
  const handleClick = (i: number) => setSelectedTab(i);
  const [activePage, setActivePage] = useState(1);
  const [postPerPage, setpostPerPage] = useState(4);

  // Only keep Event-types of contents.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filteredChildren = children.filter((child: any) => {
    return child.type === "com.gjensidige.internal.gem:event";
  });
  if (filteredChildren.length < 1) return;

  const currentDate = new Date();

  const upcomingEvents = filteredChildren.filter(
    (child: any) => new Date(child.data.startDateTime) > currentDate
  );

  const ongoingEvents = filteredChildren.filter(
    (child: any) =>
      new Date(child.data.startDateTime) <= currentDate &&
      new Date(child.data.endDateTime) >= currentDate
  );

  const pastEvents = filteredChildren.filter(
    (child: any) => new Date(child.data.endDateTime) < currentDate
  );

  const renderEventList = (events: any[]) => (
    <ul className={styles.ul}>
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        events.map((child: any, i: number) => (
          <a href={getUrl(child._path, meta)} key={i}>
            <li>
              <div
                className={classNames(
                  styles["eventImage"],
                  styles[child.data.theme]
                )}
              >
                {child.data.image?.imageUrl && (
                  <img src={getUrl(child.data.image.imageUrl, meta)} alt="" />
                )}
              </div>
              <div className={styles.wrapper}>
                <Text>{child.displayName}</Text>
                {child.data?.location && (
                  <p className={styles.location}>{child.data.location}</p>
                )}
                {child.data?.startDateTime && (
                  <div>
                    <Text className={styles.month}>
                      {format(new Date(child.data.startDateTime), "MMM")}
                    </Text>
                    <Text className={styles.day}>
                      {format(new Date(child.data.startDateTime), "dd")}
                    </Text>
                  </div>
                )}
              </div>
            </li>
          </a>
        ))
      }
    </ul>
  );

  const lastPostIndex = activePage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;

  const upComingEventsPosts = upcomingEvents.slice(
    firstPostIndex,
    lastPostIndex
  );

  const ongoingPosts = ongoingEvents.slice(firstPostIndex, lastPostIndex);

  const pastPosts = pastEvents.slice(firstPostIndex, lastPostIndex);

  const postsToShow =
    selectedTab === 0
      ? upcomingEvents
      : selectedTab === 1
      ? ongoingEvents
      : pastEvents;

  return (
    <div className={styles.container}>
      <ToggleTabsContext selectedTab={selectedTab} setSelectedTab={handleClick}>
        <ToggleTabs>
          <ToggleTab label="Upcoming" index={0} />
          <ToggleTab label="Ongoing" index={1} />
          <ToggleTab label="Past" index={2} />
        </ToggleTabs>
        <ToggleTabPane index={0}>
          {renderEventList(upcomingEvents && upComingEventsPosts)}
        </ToggleTabPane>
        <ToggleTabPane index={1}>
          {renderEventList(ongoingEvents && ongoingPosts)}
        </ToggleTabPane>
        <ToggleTabPane index={2}>
          {renderEventList(pastEvents && pastPosts)}
        </ToggleTabPane>
      </ToggleTabsContext>
      {Math.ceil(postsToShow.length / postPerPage) > 1 && (
        <Pagination
          activePage={activePage}
          totalPages={Math.ceil(postsToShow.length / postPerPage)}
          setActivePage={setActivePage}
        />
      )}
    </div>
  );
};

export default EventList;
