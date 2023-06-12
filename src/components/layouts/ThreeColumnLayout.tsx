import React from 'react'
import {LayoutProps} from '@enonic/nextjs-adapter/views/BaseLayout';
import {RegionView} from '@enonic/nextjs-adapter/views/Region';
import styles from './ColumnLayout.module.css';

const ThreeColumnLayout = (props: LayoutProps) => {
    const regions = props.layout.regions;
    const {common, meta} = props;

    return (
        <>
            <div className={styles.row}>
                <RegionView name="left" components={regions['left']?.components} common={common} meta={meta}/>
                <RegionView name="center" components={regions['center']?.components} common={common} meta={meta}/>
                <RegionView name="right" components={regions['right']?.components} common={common} meta={meta}/>
            </div>
        </>
    );
};

export default ThreeColumnLayout;