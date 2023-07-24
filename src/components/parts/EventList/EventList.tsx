import { getUrl } from "@enonic/nextjs-adapter";
import type { FetchContentResult } from "@enonic/nextjs-adapter";
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

  // Only keep Event-types of contents.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filteredChildren = children.filter((child: any) => {
    return child.type === "com.gjensidige.internal.gem:event";
  });
  if (filteredChildren.length < 1) return;

  const [selectedTab, setSelectedTab] = useState(0);
  const handleClick = (index: number) => setSelectedTab(index);

  return (
    <>
      <ToggleTabsContext selectedTab={selectedTab} setSelectedTab={handleClick}>
        <ToggleTabs>
          <ToggleTab label="Upcoming" index={0} />
          <ToggleTab label="Ongoing" index={1} />
          <ToggleTab label="Past" index={2} />
        </ToggleTabs>
        <ToggleTabPane index={0}>
          <ul className={styles.ul}>
            {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              filteredChildren.map((child: any, i: number) => (
                <a href={getUrl(child._path, meta)}>
                  <li key={i}>
                    <div
                      className={classNames(
                        styles["eventImage"],
                        styles[child.data.theme]
                      )}
                    >
                      {child.data.image?.imageUrl && (
                        <img
                          src={getUrl(child.data.image.imageUrl, meta)}
                          alt=""
                        />
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
        </ToggleTabPane>
        <ToggleTabPane index={1}>
          <ul className={styles.ul}>
            {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              filteredChildren.map((child: any, i: number) => (
                <a href={getUrl(child._path, meta)}>
                  <li key={i}>
                    <div
                      className={classNames(
                        styles["eventImage"],
                        styles[child.data.theme]
                      )}
                    >
                      {child.data.image?.imageUrl && (
                        <img
                          src={getUrl(child.data.image.imageUrl, meta)}
                          alt=""
                        />
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
        </ToggleTabPane>
        <ToggleTabPane index={2}>
          <ul className={styles.ul}>
            {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              filteredChildren.map((child: any, i: number) => (
                <a href={getUrl(child._path, meta)}>
                  <li key={i}>
                    <div
                      className={classNames(
                        styles["eventImage"],
                        styles[child.data.theme]
                      )}
                    >
                      {child.data.image?.imageUrl && (
                        <img
                          src={getUrl(child.data.image.imageUrl, meta)}
                          alt=""
                        />
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
        </ToggleTabPane>
      </ToggleTabsContext>
    </>
  );
};

export default EventList;
