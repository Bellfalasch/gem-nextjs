import React, { useEffect, useState } from 'react';
import { PartProps } from '@enonic/nextjs-adapter/views/BasePart';
//import styles from './CountDown.module.css';

interface ImageProps extends PartProps {
  header: string;
}

const Image: React.FC<ImageProps> = ({ part }) => {
  const header = part?.config?.header || '';

  return <div>TODO: render picture</div>;
};

export default Image;
