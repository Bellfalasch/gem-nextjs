import React from "react";
import { PartProps } from "@enonic/nextjs-adapter/views/BasePart";
import { getUrl } from "@enonic/nextjs-adapter";

interface ImageProps extends PartProps {
  image: string;
}

const Image = ({part, meta}: ImageProps) => {
  console.log(JSON.stringify(part, null, 4))
  const headerImgUrl = part?.config?.image?.imageUrl;
  console.log(headerImgUrl)

  if (headerImgUrl) {
    return (
      <div style={{ backgroundColor: "red" }}>
        <img src={getUrl(headerImgUrl, meta)} alt="" />
      </div>
    );
  }
};

export default Image;
