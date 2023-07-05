import { Link } from "@gjensidige/nci-core-typography/lib/link";
import { Text } from "@gjensidige/nci-core-typography/lib/text";
import React from "react";

import styles from "./Footer.module.css";

const Footer = () => (
  <footer className={styles.footer}>
    <Text>{`Copyright © Gjensidige ${new Date().getFullYear()}`} </Text>
    <Link href="https://www.gjensidige.no">Gjensidige Forsikring ASA</Link>
  </footer>
);

export default Footer;
