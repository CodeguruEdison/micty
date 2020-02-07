import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { IMiscProps } from '../../models/IMiscProp';
import { IMatch } from '../../models/IMatch';

export const Tag:FC<IMiscProps> =(props) => {
    const { islink,
        linkto,
        background,
        fontSize,
        color,children,add}= props;
    const style= {
        background,
        fontSize:fontSize,
        color,
        padding:'5px 10px',
        display:'inline-block',
        fontFamily:'Righteous',
        ...add


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

export const firebaselooper =(snapshot:firebase.database.DataSnapshot):IMatch[]=>{

    const data:IMatch[]=[];
    snapshot.forEach((childSnapshot)=>{
        data.push({
            ...childSnapshot.val(),
            id:childSnapshot.key
            }
        )
    })
  return data;
}
export const reverseArray =(actualArray:Array<any>) =>{
     let reversedArray = [];
     for(let i=actualArray.length-1;i>0;i--){
        reversedArray.push(actualArray[i]);
     }
     return reversedArray;
}