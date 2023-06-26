import { getUrl } from "@enonic/nextjs-adapter";
import { PartProps } from "@enonic/nextjs-adapter/views/BasePart";
import React from "react";

import styles from "./ChildList.module.css";

const ChildList = (props: PartProps) => {
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
                </a>
              </li>
            ))
          }
        </ul>
      )}
    </main>
  );
};

export default ChildList;

export const getChildList = `
  query ($path:ID!, $order:String) {
    guillotine {
      getSite {
        displayName
      }
      get(key:$path) {
        displayName
        children(sort: $order) {
            _path(type: siteRelative)
            _id
            displayName
        }
      }
    }
  }
`;
