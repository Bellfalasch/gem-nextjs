import { getUrl } from "@enonic/nextjs-adapter";
import type { FetchContentResult } from "@enonic/nextjs-adapter";
import { Text } from "@gjensidige/nci-core-typography/lib/text";
import { format } from "date-fns";
import React from "react";

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

  return (
    <ul className={styles.ul}>
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        filteredChildren.map((child: any, i: number) => (
          <li key={i}>
            <div className={styles.subheader}>
              <div className={styles.eventImage}>
                {child.data.image?.imageUrl && (
                  <img src={getUrl(child.data.image.imageUrl, meta)} alt="" />
                )}
              </div>
              <a href={getUrl(child._path, meta)}>
                <Text className={styles.title}>{child.displayName}</Text>
              </a>
            </div>
            <div className={styles.subHeaderContainer}>
              {child.data?.startDateTime && (
                <>
                  <Text className={styles.month}>
                    {format(new Date(child.data.startDateTime), "MMM")}
                  </Text>
                  <Text className={styles.day}>
                    {format(new Date(child.data.startDateTime), "dd")}
                  </Text>
                </>
              )}
              {child.data?.location && (
                <Text className={styles.location}>{child.data.location}</Text>
              )}
            </div>
          </li>
        ))
      }
    </ul>
  );
};

export default EventList;
