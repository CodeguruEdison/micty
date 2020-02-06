import React, { FC,useState, useEffect } from 'react'
import {firebaseMatches,getMatches} from '../../../firebase';
import { IMatch } from '../../../models/IMatch';
import {firebaselooper,reverseArray} from '../../ui/misc';
import MatchesBlock from '../../ui/matches_block';

export const Blocks:FC = () => {
    const [matches,setMatches]= useState<IMatch[]>([]);
    useEffect(()=>{
        getMatches(6).then((matches)=>{

            setMatches(reverseArray(matches));
            console.log(matches);
        })   
    },[])
    
    //console.log(matches);

    const showMatches =(matches:IMatch[])=> (
        matches ? 
             matches.map((match)=>(
                    <div className='item' key={match.id}>
                        <div className="wrapper">
                            <MatchesBlock  match={match}  >

                            </MatchesBlock>
                        </div>
                    </div>
             ))
        :null

    );
        
    return (
        
       <div className="home_matches">
            {showMatches(matches)}
       </div>
    )
}
export default Blocks;
