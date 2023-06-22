import React from 'react';
import Link from 'next/link';

const Footer = () => (
  <footer
    style={{
      margin: `0 auto`,
      maxWidth: 960,
      padding: `0 1.0875rem 1.45rem`
    }}
  >
    <br />
    <hr />
    <br />
    {`Copyright © Gjensidige ${new Date().getFullYear()}`}
  </footer>
);

export default Footer;
