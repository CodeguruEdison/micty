import React, { FC } from 'react'

export interface PlayerCardProps {
    playernumber:string
    name:string
    lastname:string
    background :any;
}
const PlayerCard:FC<PlayerCardProps> = (props) => {
     const {background,playernumber,name,lastname} = props;
    return (
        <div className="player_card_wrapper">
            <div className="player_card_thmb"
             style ={{background:`#f2f9ff url(${background})`}}
            >
            </div>
            <div className="player_card_info">
                <div className="player_card_number">
                        {playernumber}
                </div>
                <div className="player_card_name">
                    <span>{name} </span>
                    <span>{lastname} </span>
                </div>
            </div>
        </div>
    )
}

export default PlayerCard
