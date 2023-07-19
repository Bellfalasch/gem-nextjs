import { getUrl } from "@enonic/nextjs-adapter";
import { PartProps } from "@enonic/nextjs-adapter/views/BasePart";
import { Text } from "@gjensidige/nci-core-typography/lib/text";
import { format } from "date-fns";
import React from "react";

import styles from "./EventList.module.css";

const EventList = (props: PartProps) => {
  const { data, meta } = props;
  const children = data.get.children;
  if (!children || children.length === 0) {
    return null;
  }

  // Only keep Event-types of contents.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filteredChildren = children.filter((child: any) => {
    return child.type === "com.gjensidige.internal.gem:event";
  });

  return (
    <main className={styles.container}>
      {filteredChildren.length > 0 && (
        <ul className={styles.ul}>
          {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            filteredChildren.map((child: any, i: number) => (
              <li key={i}>
                <div className={styles.subheader}>
                  <a href={getUrl(child._path, meta)}>
                    <Text className={styles.title}>{child.displayName}</Text>
                  </a>
                </div>
                <div className={styles.subHeaderContainer}>
                  <Text className={styles.month}>
                    {child.data?.startDateTime
                      ? format(new Date(child.data.startDateTime), "MMM")
                      : null}
                  </Text>
                  <Text className={styles.day}>
                    {child.data?.startDateTime
                      ? format(new Date(child.data.startDateTime), "dd")
                      : null}
                  </Text>
                  <Text className={styles.location}>
                    {child.data?.location}
                  </Text>
                </div>
              </li>
            ))
          }
        </ul>
      )}
    </main>
  );
};

export default EventList;
