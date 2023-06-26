import Link from "next/link";
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
    {`Copyright © Gjensidige ${new Date().getFullYear()}`}
    <Link href="https://www.gjensidige.no">Gjensidige Forsikring ASA</Link>
  </footer>
);

export default Footer;
