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
          <tr>
            <td colSpan="8" className="border-b-4 border-dashed border-slate-700">
              <GuessCard className="w-full" guessResult={guessResult} guessNumber={1} />
            </td>
          </tr>
          <tr>
            <td colSpan="8" className="border-b-4 border-dashed border-slate-700">
              <GuessCard guessResult={guessResult} guessNumber={2} />
            </td>
          </tr>
          <tr>
            <td colSpan="8" className="border-b-4 border-dashed border-slate-700">
              <GuessCard guessResult={guessResult} guessNumber={3} />
            </td>
          </tr>
          <tr>
            <td colSpan="8" className="border-b-4 border-dashed border-slate-700">
              <GuessCard guessResult={guessResult} guessNumber={4} />
            </td>
          </tr>
          <tr>
            <td colSpan="8" className="border-b-4 border-dashed border-slate-700">
              <GuessCard guessResult={guessResult} guessNumber={5} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}