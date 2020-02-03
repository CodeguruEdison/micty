import React from 'react'
import { FC } from 'react';
import Stripes from './Stripes';
import Text from './Text';
 const Featured:FC = () => {
    return (
        <div className="featured_wrapper">
            Some Text
            <Stripes></Stripes>
            <Text></Text>
        </div>
    )
}
export default Featured;
