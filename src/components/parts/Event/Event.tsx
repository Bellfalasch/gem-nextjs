import React from "react";
import { FetchContentResult, getUrl } from "@enonic/nextjs-adapter";

const Event = (props: FetchContentResult) => {
  const { displayName, data, parent } = props.data?.get as any;
  const { startDate, endDate, description, startTime, endTime, location } =
    data;
  const meta = props.meta;
  const { _path } = parent;

  return (
    <>
      <div>
        <h1>{displayName}</h1>
        <p>{description}</p>
        <p>Sted: {location}</p>
        {startDate && <p>Begins: {startDate}</p>}
        {startTime && <p>Starts at: {startTime}</p>}
        {endDate && <p>Ends: {endDate}</p>}
        {endTime && <p>Ends at: {endTime}</p>}
      </div>
      <p>
        <a href={getUrl(_path, meta)}>Back to Events ...</a>
      </p>
    </>
  );
};

export default Event;


