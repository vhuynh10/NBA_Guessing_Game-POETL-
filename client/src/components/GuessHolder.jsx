import React from 'react';
import GuessCard from './GuessCard';

export default function GuessHolder(props) {
  const { guessResult } = props;

  return (
    <div>
      <table className="border-collapse w-full my-4">
        <thead>
          <tr>
            <th className="border-b-4 border-dashed border-slate-700 px-4 py-2 text-left">Name</th>
            <th className="border-b-4 border-dashed border-slate-700 px-4 py-2 text-left">Team</th>
            <th className="border-b-4 border-dashed border-slate-700 px-4 py-2 text-left">Conference</th>
            <th className="border-b-4 border-dashed border-slate-700 px-4 py-2 text-left">Division</th>
            <th className="border-b-4 border-dashed border-slate-700 px-4 py-2 text-left">Position</th>
            <th className="border-b-4 border-dashed border-slate-700 px-4 py-2 text-left">Height</th>
            <th className="border-b-4 border-dashed border-slate-700 px-4 py-2 text-left">Age</th>
            <th className="border-b-4 border-dashed border-slate-700 px-4 py-2 text-left">Number</th>
          </tr>
        </thead>
        <tbody>
          {[1,2,3,4,5].map(i => (
            <tr key={i}>
              <td colSpan="8" className="border-b-4 border-dashed border-slate-700">
                <GuessCard guessResult={guessResult[i-1] || null} guessNumber={i} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}