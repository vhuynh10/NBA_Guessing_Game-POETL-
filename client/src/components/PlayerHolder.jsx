import React from 'react'

export default function PlayerHolder(props) {
    const {players} = props;
  return (
    <div>
        <ul className="list-disc pl-5">
                {players.map((player, index) => (
                    <li key={index} className="text-sm">
                        {player.name}
                    </li>
                ))}
            </ul>
    </div>
  )
}
