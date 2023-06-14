import React from 'react';
import { Context, getUrl, VariablesGetterResult } from '@enonic/nextjs-adapter';
import { PartProps } from '@enonic/nextjs-adapter/views/BasePart';
import styles from './ChildList.module.css';

const ChildList = (props: PartProps) => {
  const { data, meta } = props;
  const children = data.get.children;
  if (!children || children.length === 0) {
    return null;
  }

  // Filter out image files
  const filteredChildren = children.filter((child: any) => {
    const fileExtension = child._path.split('.').pop()?.toLowerCase();
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    return !imageExtensions.includes(fileExtension);
  });

  return (
    <main className={styles.container}>
      {filteredChildren.length > 0 && (
        <ul className={styles.ul}>
          {filteredChildren.map((child: any, i: number) => (
            <li key={i} className={styles.li}>
              <a className={styles.a} href={getUrl(child._path, meta)}>
                {child.displayName}
              </a>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default ChildList;

export const getChildList = {
  query: function (path: string, context?: Context, config?: any): string {
    return `query($path:ID!, $order:String){
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
            }`;
  },
  variables: function (
    path: string,
    context?: Context,
    config?: any
  ): VariablesGetterResult {
    return {
      path,
      order: config?.sorting,
    };
  },
};

export async function childListProcessor(
  common: any,
  context?: Context,
  config?: any
): Promise<any> {
  common.modifiedBy = 'childListProcessor';
  return common;
}
