import React from 'react'
import {FetchContentResult, getUrl} from '@enonic/nextjs-adapter';

const Person = (props: FetchContentResult) => {
    const {displayName, data, parent} = props.data?.get as any;
    const {header, startDate, endDate, description} = data;
    const meta = props.meta;
    const {_path} = parent;

    return (
        <>
            <div>

                <h1>{displayName}</h1>
                <p>{description}</p>
                { startDate && <p>Begins: {startDate}</p> }
                { endDate && <p>Ends: {endDate}</p> }
            </div>
            <p><a href={getUrl(_path, meta)}>Back to Events ...</a></p>
        </>
    )
}

export default Person;

function getTitle(photo: any, displayName: string) {
    return (photo.attachments || [])[0].name || displayName;
}