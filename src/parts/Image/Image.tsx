import React, { useEffect, useState } from "react";
import { PartProps } from "@enonic/nextjs-adapter/views/BasePart";
//import styles from './CountDown.module.css';

interface HeaderProps extends PartProps {
  header: string;
}

const Header: React.FC<HeaderProps> = ({ part }) => {
  const header = part?.config?.header || "";

  return (
    <>
      <div>//render picture</div>
    </>
  );
};

export default Header;
