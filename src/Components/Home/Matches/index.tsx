import React, { FC } from 'react'
import Tag from '../../ui/misc';

export const Matches:FC = () => {
    return (
        <div className="home_matches_wrapper">
            <div className="container">
               <Tag islink={true} linkto={''} 
                background='#0e1731' 
                fontSize={'50px'} color='#ffffff'>
                    Matches
                </Tag>
               Block
               TAG
            </div>
        </div>
    )
}
export default Matches;
