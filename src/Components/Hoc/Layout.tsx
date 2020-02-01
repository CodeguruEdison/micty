import React, { FC } from 'react'
import ILayout from '../../models/ILayout';
import Header from '../Header_Footer/Header';
import Footer from '../Header_Footer/Footer';

export const Layout:FC<ILayout> = (props) => {
    return (
        <div>
            <Header></Header>
            {props.children}
            <Footer></Footer>
        </div>
    )
}
