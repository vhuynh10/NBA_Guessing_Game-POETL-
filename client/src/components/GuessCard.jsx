import React from 'react'
import { getFullTeamName } from '../helper/helper';

export default function GuessCard(props) {
    const {guessResult, guessNumber} = props;
    if(!guessResult) {
        return (
            <>
                <td className="border-4 border-dashed border-slate-700 text-center h-16" colSpan={7}>
                    {guessNumber}
                </td>
            </>
        )
    }

    const {
        conference,
        division,
        height,
        name,
        number,
        position,
        team,
      } = guessResult;
    
      return (
        <>
          <td className="border-l-4 border-t-4 border-b-4 border-dashed border-slate-700 text-center h-16">{name.value} {name.match ? <i className="fa-solid fa-check text-green-800 text-xl"></i> : <i className="fa-solid fa-xmark text-red-800 text-xl"></i>}</td>
          <td className="border-b-4 border-t-4 border-dashed border-slate-700 text-center h-16">{getFullTeamName(team.value)} {team.match ? <i className="fa-solid fa-check text-green-800 text-xl"></i> : <i className="fa-solid fa-xmark text-red-800 text-xl"></i>}</td>
          <td className="border-b-4 border-t-4 border-dashed border-slate-700 text-center h-16 ">{conference.value} {conference.match ? <i className="fa-solid fa-check text-green-800 text-xl"></i> : <i className="fa-solid fa-xmark text-red-800 text-xl"></i>}</td>
          <td className="border-b-4 border-t-4 border-dashed border-slate-700 text-center h-16">{division.value} {division.match ? <i className="fa-solid fa-check text-green-800 text-xl"></i> : <i className="fa-solid fa-xmark text-red-800 text-xl"></i>}</td>
          <td className="border-b-4 border-t-4 border-dashed border-slate-700 text-center h-16">{position.value} {position.match ? <i className="fa-solid fa-check text-green-800 text-xl"></i> : <i className="fa-solid fa-xmark text-red-800 text-xl"></i>}</td>

          <td className="border-b-4 border-t-4 border-dashed border-slate-700 text-center h-16">
            {height.value}
            {height.direction === "match" ? (
            <i className="fa-solid fa-check fa-solid fa-check text-green-800 text-xl ml-2"></i>
            ) : height.direction === "higher" ? (
            <i className="fa-solid fa-arrow-up text-xl ml-2"></i>
            ) : (
            <i className="fa-solid fa-arrow-down text-xl ml-2"></i>
            )}
            
          </td>
          <td className="border-r-4 border-t-4 border-b-4 border-dashed border-slate-700 text-center h-16">
            {number.value}
            {number.direction === "match" ? (
              <i className="fa-solid fa-check fa-solid fa-check text-green-800 text-xl ml-2"></i>
            ) : number.direction === "higher" ? (
              <i className="fa-solid fa-arrow-up text-xl ml-2"></i>
            ) : (
              <i className="fa-solid fa-arrow-down text-xl ml-2"></i>
            )}
          </td>
        </>
      );
}