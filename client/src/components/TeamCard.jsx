import React from 'react'
import { getFullTeamName, getTeamLogo } from '../helper/helper';
import PlayerHolder from './PlayerHolder';

export default function TeamCard(props) {
    const {teamName, players} = props;

    const fullName = getFullTeamName(teamName);
    const logosrc = getTeamLogo(teamName);
    
  return (
    <div className="border border-rounded rounded-lg border-black p-4 relative group bg-[#FEFFEC]">
            <h2 className="text-[#264864] text-center">{fullName}</h2>
            <img src={logosrc} className="w-40 h-40 mx-auto"></img>
            <div className="absolute inset-0 bg-white bg-opacity-90 p-5 overflow-y-scroll hidden group-hover:block">
                <PlayerHolder players={players} />
            </div>
        </div>
  )
}
