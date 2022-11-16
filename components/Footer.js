import React, { useState } from 'react';
import {
  Navbar,
} from 'reactstrap';
import HomeButton from './HomeButton';


function Footer(args) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className='footer nav justify-content-end'>
      <Navbar {...args}>
            {/* Home Button */}   
            <HomeButton size="small" />
      </Navbar>
    </div>
  );
}

export default Footer;