import React from 'react'

export default function GuessCard(props) {
    const {guessResult, guessNumber} = props;
    if(!guessResult) {
        return (
            <div className="border-4 my-4 h-auto border-dashed border-slate-700 p-4 flex flex-row justify-between items-center">
                {guessNumber}
            </div>
        )
    }

    const {
        conference,
        division,
        height,
        match,
        name,
        number,
        position,
        team,
      } = guessResult;
    
      return (
        <div className="border-4 my-4 h-auto border-dashed border-slate-700 p-4 flex flex-row justify-between items-center">
          <div>
            <p>{name.value} {name.match ? <i className="fa-solid fa-check"></i> : <i className="fa-solid fa-xmark"></i>}</p>
          </div>
          <div>
            <p>{team.value} {team.match ? <i className="fa-solid fa-check"></i> : <i className="fa-solid fa-xmark"></i>} </p>
          </div>
          <div>
            <p>{conference.value} {conference.match ? <i className="fa-solid fa-check"></i> : <i className="fa-solid fa-xmark"></i>} </p>
          </div>
          <div>
            <p>{division.value} {division.match ? <i className="fa-solid fa-check"></i> : <i className="fa-solid fa-xmark"></i>} </p>
          </div>
          <div>
            <p>{position.value} {position.match ? <i className="fa-solid fa-check"></i> : <i className="fa-solid fa-xmark"></i>} </p>
          </div>
          <div>
            <p>{height.value} {height.direction === "higher" ? <i className="fa-solid fa-arrow-up"></i> : <i className="fa-solid fa-arrow-down"></i>}</p>
          </div>
          <div>
            <p>{number.value} {number.direction === "higher" ? <i className="fa-solid fa-arrow-up"></i> : <i className="fa-solid fa-arrow-down"></i>}</p>
          </div>
        </div>
      );
    }