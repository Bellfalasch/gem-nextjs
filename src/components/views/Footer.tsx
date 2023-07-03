import { Link } from "@gjensidige/nci-core-typography/lib/link";
import React from "react";

const Footer = () => (
  <footer
    style={{
      margin: `0 auto`,
      maxWidth: 960,
      padding: `0 1.0875rem 1.45rem`,
    }}
  >
    <br />
    <hr />
    <br />
    <a>{`Copyright © Gjensidige ${new Date().getFullYear()}`} </a>
    <Link href="https://www.gjensidige.no">Gjensidige Forsikring ASA</Link>
  </footer>
);

export default Footer;
