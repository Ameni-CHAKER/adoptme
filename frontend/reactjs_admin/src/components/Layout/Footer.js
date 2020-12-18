import React from 'react';

import { Navbar, Nav, NavItem } from 'reactstrap';

import SourceLink from '../SourceLink';

const Footer = () => {
  return (
    <Navbar>
      <Nav navbar>
        <NavItem>
        {/*   2020 theme, source on <SourceLink>Github</SourceLink> */}
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default Footer;
