import React from 'react'
import GuessHolder from '../components/GuessHolder'

export default function MainGame() {
  return (
    <div className="generic-cream-bg flex flex-row space-y-4 mt-4">
       <h2 className="text-slate-500">Enter your Guess...</h2>
       <div className="flex flex-row space-x-4">
        <input type="string" className=" border border-black rounded rounded-lg border-[2px] bg-white w-100% text-[28px]"></input>
        <button className="border border-4px border-[#C8102E] p-2 rounded rounded-lg text-[24px] text-white bg-[#FF474C] text-semibold hover:bg-[#A8DCAB] hover:border-[#2E6F40] cursor-pointer">GUESS?</button>
       </div>
       <div>
          <GuessHolder/>
       </div>
    </div>
  )
}
