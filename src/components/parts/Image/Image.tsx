import { PartProps } from "@enonic/nextjs-adapter/views/BasePart";
import React from "react";
//import styles from './CountDown.module.css';

interface ImageProps extends PartProps {
  header: string;
}

const Image: React.FC<ImageProps> = ({ part }) => {
  const header = part?.config?.header || "";
  console.log(header);
  return <div>TODO: render picture</div>;
};

export default Image;
