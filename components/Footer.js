import React, { useState } from 'react';
import {
  Navbar,
  Button,
  NavLink,
} from 'reactstrap';
import { BsHouse } from 'react-icons/bs';

function Footer(args) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className='footer nav justify-content-end'>
      <Navbar {...args}>
            {/* Home Button */}   
            <NavLink href='/'>
                <Button className='homeButton'>
                    <BsHouse size={30} />
                </Button>
            </NavLink>
      </Navbar>
    </div>
  );
}

export default Footer;