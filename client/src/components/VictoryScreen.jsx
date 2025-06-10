import React from 'react'
import { formatTime } from '../helper/helper';

export default function VictoryScreen({ onClose, onRestart, seconds }) {
  return (
    <div className=' fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-500 p-4 rounded h-[90vh] w-[50vw] flex flex-col items-center gap-y-4 border-8 border-double font-bold z-10'>
      <h1 className="text-3xl py-10">Congrats You Guessed the Hidden Player!</h1>
      <h2 className=" text-3xl py-10"> It took you {formatTime(seconds)}</h2>
      <button className="fixed top-2 right-2" onClick={onClose}><i className="fa-regular fa-circle-xmark cursor-pointer text-2xl hover:text-gray-600"></i></button>
      <button onClick={onRestart} className='fixed bottom-4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-rounded rounded-lg max-w-fit px-2 text-3xl hover:opacity-50'> RESTART </button>
    </div>
  );
}