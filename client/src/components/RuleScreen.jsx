import React from 'react'

export default function RuleScreen(props) {
    const {toggleShowRule} = props;

  return (
    <div className="relative items-center justify-center bg-gray-200 border-4 border-dashed p-2">
        <button onClick={toggleShowRule} className="absolute top-2 right-2"><i className="fa-regular fa-circle-xmark cursor-pointer text-2xl hover:text-gray-600"></i></button>
        <h2 className='text-center font-semibold'>How to Play?</h2>
        <h3>1. You have 5 guesses to guess the mystery player of the day</h3>
        <ul>
            2. For each element, you'll receive feedback on how each attribute of your guess compares to the mystery player:
            <li><i className="fa-solid fa-check text-green-800 ml-4"></i> means a match </li>
            <li><i className="fa-solid fa-xmark text-red-800 ml-4"></i> means it doesn’t match </li>
            <li><i className="fa-solid fa-arrow-up ml-4"></i> means the hidden player's corresponding value was higher</li>
            <li><i className="fa-solid fa-arrow-down ml-4"></i> means the hidden player's corresponding value was lower</li>
        </ul>
        <h3>3. A <span className='font-bold'>list of all possible players is provided</span>. After each guess, <span className="font-bold">invalid players will be removed</span> from the list based on the feedback, helping you narrow it down.</h3>
        <h3>4. Invalid Guesses <span className="font-bold">DO NOT</span> count toward your guess total</h3>
    </div>
  )
}
