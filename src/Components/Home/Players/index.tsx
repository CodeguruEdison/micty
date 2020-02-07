import React, { FC, useState } from 'react';
import Stripes from '../../../Resources/images/stripes.png';
import Tag from '../../ui/misc';
import Reveal from 'react-reveal/Reveal';
import HomeCards from './cards';
export interface IMeetPlayerProps //extends  IMeetPlayerState
{
  
}
export interface IMeetPlayerState {
    show:boolean
}
const MeetPlayers:FC<IMeetPlayerProps> =(props)=>{
    //const {show} = players;
    const[players,setPlayers]= useState<IMeetPlayerState>({show:false});


 
    return (
        <Reveal fraction={0.7}
         onReveal={()=>{
            console.log('reveal');
            setPlayers({
                show:true
            })
        }}>

       
        <div className="home_meetplayers" style={{background:`#ffffff url(${Stripes})`}} >
           <div className="container">
               <div className="home_meetplayers_wrapper">
                    <div className="home_card_wrapper">
                        <HomeCards show={players.show}></HomeCards>
                    </div>
                    <div className="home_text_wrapper">
                       {/** need to conver to loop or create a list */}  
                        <div>
                            <Tag islink={false} linkto={''}
                                background='#0e1731'
                                fontSize= '100px'
                                color='#ffffff'
                                add={{
                                    display:'inline-block',
                                    marginBottom:'20px'
                                }}
                                >
                                Meet
                            </Tag>
                        </div>
                         <div>
                            <Tag islink={false} linkto={''}
                                background='#0e1731'
                                fontSize = '100px'
                                color='#ffffff'
                                add={{
                                    display:'inline-block',
                                    marginBottom:'20px'
                                }}
                                >
                                The
                            </Tag>
                        </div>
                        <div>
                            <Tag islink={false} linkto={''}
                                background='#0e1731'
                                fontSize= '100px'
                                color='#ffffff'
                                add={{
                                    display:'inline-block',
                                    marginBottom:'20px'
                                }}
                                >
                                Players
                            </Tag>
                        </div>
                        <div>
                                    <Tag
                                        background="#ffffff"
                                        fontSize="27px"
                                        color="#0e1731"
                                        islink={true}
                                        linkto="/the_team"
                                        add={{
                                            display: 'inline-block',
                                            marginBottom: '27px',
                                            border: '1px solid #0e1731'
                                        }}
                                    >
                                        Meet them here
                                </Tag>
                                </div>
                    </div>
               </div>
            </div>
        </div>
        </Reveal>
    );
}
export default MeetPlayers;