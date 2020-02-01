import React, { FC } from "react";
import { Link } from "react-router-dom";

import mcitylogo from "../../Resources/images/logos/manchester_city_logo.png";
import ICityLogoProps from "../../models/ICityLogo";

export const CityLogo: FC<ICityLogoProps> = props => {
  const { islink, linkTo } = props;
  const template = (
    <div
      className="img_cover"
      style={{
        width: props.width,
        height: props.height,
        background:`url(${mcitylogo}) no-repeat`
      }}
    >
   
    </div>
  );
  if (islink) {
    return (
      <Link to={linkTo} className="link_logo">
        {template}
      </Link>
    );
  } else {
    return template;
  }
};
export default CityLogo;
