
import React, { FC } from 'react'
import { IMatch } from '../../models/IMatch'

export interface IMatchBlockProps {
    match:IMatch;
}
const MatchesBlock:FC<IMatchBlockProps> = (props) => {
    const {match}=props;
    return (
        <div className="match_block">
            <div className="match_date">
                {match.final==='Yes' ? match.date:` Match not played yet ${match.date}`}
            </div>
            <div className="match_wrapper">
                <div className="match_top">
                    <div className="left">
                        <div className="icon" style={{background:`url(/images/team_icons/${match.localThmb}.png)`}} ></div>
                            <div className="team_name">
                                {match.local}
                            </div>
                        
                    </div>
                    <div className="right">
                        {match.final==='Yes' ?match.resultLocal:'-'}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MatchesBlock
