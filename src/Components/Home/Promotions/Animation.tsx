import React, { FC } from "react";
import Zoom from "react-reveal/Zoom";
import jersey from "../../../Resources/images/jersey.jpg";
export const PromotionAnimation: FC = () => {
  return (
    <div className="promotion_animation">
      <div className="left">
        <Zoom>
          <span>Win a</span>
          <span> Jersey</span>
        </Zoom>
      </div>
      <div className="right">
        <Zoom>
            <div style={{background:`url(${jersey}) no-repeat`}}>

            </div>
        </Zoom>
      </div>
    </div>
  );
};
export default PromotionAnimation;
