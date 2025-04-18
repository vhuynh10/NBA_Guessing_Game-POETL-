import React from 'react'
import getFullTeamName from '../helper/helper';
import PlayerHolder from './PlayerHolder';

export default function TeamCard(props) {
    const {teamName, players} = props;

    const fullName = getFullTeamName(teamName);
   
    
  return (
    <div className="border border-black p-5 border-rounded rounded-sm h-48 overflow-hidden relative group">
            <h2 className="text-[#264864]">{fullName}</h2>
            {/* PlayerHolder will appear on hover */}
            <div className="absolute inset-0 bg-white bg-opacity-90 p-5 overflow-y-scroll hidden group-hover:block">
                <PlayerHolder players={players} />
            </div>
        </div>
  )
}
