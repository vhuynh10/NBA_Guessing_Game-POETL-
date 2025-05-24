import React from 'react';
import GuessCard from './GuessCard';

export default function GuessHolder(props) {
  const { guessResult } = props;

  return (
    <div>
      <table className="border-separate w-full my-4 border-spacing-y-4">
        <thead>
          <tr>
            <th className="border-b-4 border-dashed border-slate-700 px-4 py-2 text-center w-1/7">Name</th>
            <th className="border-b-4 border-dashed border-slate-700 px-4 py-2 text-center w-1/7">Team</th>
            <th className="border-b-4 border-dashed border-slate-700 px-4 py-2 text-center w-1/7">Conference</th>
            <th className="border-b-4 border-dashed border-slate-700 px-4 py-2 text-center w-1/7">Division</th>
            <th className="border-b-4 border-dashed border-slate-700 px-4 py-2 text-center w-1/7">Position</th>
            <th className="border-b-4 border-dashed border-slate-700 px-4 py-2 text-center w-1/7">Height</th>
            <th className="border-b-4 border-dashed border-slate-700 px-4 py-2 text-center w-1/7">Number</th>
          </tr>
        </thead>
        <tbody>
          {[1,2,3,4,5].map(i => (
            <tr key={i} className="h-16 my-4">
              <GuessCard guessResult={guessResult[i-1] || null} guessNumber={i}/>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}