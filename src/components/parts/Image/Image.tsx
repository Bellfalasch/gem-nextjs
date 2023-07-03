import { getUrl } from "@enonic/nextjs-adapter";
import { PartProps } from "@enonic/nextjs-adapter/views/BasePart";
import React from "react";

interface ImageProps extends PartProps {
  image: string;
}

const Image: React.FC<ImageProps> = ({ part, meta }) => {
  const headerImgUrl = part?.config?.image?.imageUrl;

  return (
    <div>{headerImgUrl && <img src={getUrl(headerImgUrl, meta)} alt="" />}</div>
  );
};

export default Image;
