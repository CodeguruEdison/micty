import React, { FC } from 'react'
import Tag from '../../ui/misc';
import Blocks from './Blocks';

export const Matches:FC = () => {
    return (
        <div className="home_matches_wrapper">
            <div className="container">
               <Tag islink={true} linkto={''} 
                background='#0e1731' 
                fontSize={'50px'} color='#ffffff'>
                    Matches
                </Tag>
               <Blocks/>
               <Tag islink={true} linkto={'the_team'} 
                background='#ffffff' 
                fontSize={'22px'} color='#0e1731'>
                    See more matches
                </Tag>
            </div>
        </div>
    )
}
export default Matches;
