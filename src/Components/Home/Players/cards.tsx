import React,{FC, useState} from 'react'
import { easePolyOut } from 'd3-ease';
import { Animate } from 'react-move';
import Otamendi from '../../../Resources/images/players/Otamendi.png';
import { ICardAttribute } from '../../../models/ICardAttribute';
import PlayerCard from '../../ui/playerCard';

export interface IHomeCardsProps {
    show:boolean;
}

export interface IHomeCardsState {
 show:boolean,
 cards:ICardAttribute[]
}
const HomeCards:FC<IHomeCardsProps> = (props) => {
    {/** loop through and populate later */}
    const initialState:IHomeCardsState = {
        show:props.show,
        cards:[
            {
                bottom:90,
                left:300
            },
            {
                 bottom:60,
                left:200
            },
            { bottom:30,
                left:100
            },
            { bottom:0,
                left:0
            }
        ]
    }
    const[homecardState,setHomeCardsState] =  useState<IHomeCardsState>(initialState);
    const {cards} = homecardState
    const {show} =props;
    const showAnimateCards = (cards:ICardAttribute[],show:boolean):JSX.Element[] =>(
        cards.map((card,i)=>(
            <Animate key={i}
             show = {show}
             start={{
                    left:0,
                    bottom:0
                 }}
              enter = {{
                left: [card.bottom],
                bottom: [card.bottom],
                timing: {duration:500,ease:easePolyOut}
              }}    
             >
                {({left,bottom})=>{
                    return (
                        <div style ={{
                            position:'absolute',
                            left,
                            bottom
                        }}>
                            <PlayerCard
                             playernumber="30"
                             name="Nicolas"
                             lastname="Otamendi"
                             background ={Otamendi}
                            />
                        </div>
                    )
                }}
            </Animate>
        ))
    )

    

    return (
        <div>
            {showAnimateCards(cards,show)}
        </div>
    )
}

export default HomeCards
