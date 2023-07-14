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

  // Filter out image files
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filteredChildren = children.filter((child: any) => {
    const fileExtension = child._path.split(".").pop()?.toLowerCase();
    const imageExtensions = ["jpg", "jpeg", "png", "gif"];
    return !imageExtensions.includes(fileExtension);
  });

  return (
    <main className={styles.container}>
      {filteredChildren.length > 0 && (
        <ul className={styles.ul}>
          {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            filteredChildren.map((child: any, i: number) => (
              <li key={i} className={styles.li}>
                <a className={styles.a} href={getUrl(child._path, meta)}>
                  {child.displayName}
                  <Text>{child.data.location}</Text>
                  <Text>{child.data.attendees}</Text>
                  <Text>
                    {format(new Date(child.data.startDateTime), "dd.MM.yyyy")}
                  </Text>
                  <Text>
                    {format(new Date(child.data.startDateTime), "HH:mm")}
                  </Text>
                </a>
              </li>
            ))
          }
        </ul>
      )}
    </main>
  );
};

export default EventList;
