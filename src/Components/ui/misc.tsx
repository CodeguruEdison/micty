import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { IMiscProps } from '../../models/IMiscProp';

export const Tag:FC<IMiscProps> =(props) => {
    const { islink,
        linkto,
        background,
        fontSize,
        color,children}= props;
    const style= {
        background,
        fontSize,
        color,
        padding:'5px 10px',
        display:'inline-block',
        fontFamily:'Righteous'


    }    
const template =   <div style={style}>{children}</div>;
  if(islink){
      return (
      <Link to={linkto}>
          {template}
      </Link>
    )
  }else{
      return template;
  }
}
export default Tag;