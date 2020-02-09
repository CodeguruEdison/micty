import React from 'react'
import Enroll from './Enroll';
import PromotionAnimation from './Animation';

export const Promotion = () => {
    return (
        <div className="promotion_wrapper" style={{background:'#ffffff'}}>
             <div className="container">
             <PromotionAnimation>
                 
             </PromotionAnimation>
             <Enroll></Enroll>
                 
             </div>
        </div>
    )
}
export default Promotion;
