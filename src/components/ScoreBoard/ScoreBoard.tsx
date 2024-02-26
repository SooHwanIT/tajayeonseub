import React from 'react';

interface ScoreBoardProps {
    typingSpeed: number;
    errorRate: number;
    timer: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({typingSpeed, errorRate, timer}) =>{
    return(
        <div className={"w-1/2 h-1/6 flex flex-row justify-around items-center font-GmarketBold font-bold text-5xl"}>
            <div className="flex flex-col items-center">
                <div>{typingSpeed}</div>
                <div className="text-sm"><span className="text-black">T</span><span className="text-gray-400">yping </span><span className="text-black">S</span><span className="text-gray-400">peed</span></div>
            </div>
            <div className="flex flex-col items-center">
                <div>{errorRate}</div>
                <div className="text-sm"><span className="text-black">E</span><span className="text-gray-400">rror </span><span className="text-black">R</span><span className="text-gray-400">ate</span></div>
            </div>
            <div className="flex flex-col items-center">
                <div>{timer}</div>
                <div className="text-sm"><span className="text-black">T</span><span className="text-gray-400">ime</span></div>
            </div>
        </div>
    )
}

export default ScoreBoard;
