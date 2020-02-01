import React from 'react';
import { FC } from 'react';
import CityLogo from '../ui/icons';

const Footer:FC =() => {
 return (
        <footer className="bck_blue">
            <div className="footer_log">
                <CityLogo islink={true} width={'70px'} height={'70px'} linkTo="/">

                </CityLogo>
                <div className="footer_discl">
                    Manchester city 2018. All right reserved.
                </div>
            </div>
            
        </footer>
 );
}
export default Footer;