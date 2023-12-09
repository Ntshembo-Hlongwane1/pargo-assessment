import React from 'react';
import Logo from '@assets/images/logo.png';
import { Text } from '@src/Components/Text/Text.component';
import { ReactSVG } from 'react-svg';
import './TopNav.styles.scss';
import { useNavigate } from 'react-router-dom';

export const TopNav = () => {
  const navigation = useNavigate();

  const returnHome = () => {
    navigation('/');
  };
  return (
    <div className='navcontainer'>
      <div onClick={returnHome} className='navcontainer_left'>
        <img src={Logo} className='navcontainer_left-logo' />
      </div>
    </div>
  );
};
