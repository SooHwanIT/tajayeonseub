import React from 'react';
import TypingLine from '../TypingLine/TypingLine'; // 올바른 경로로 변경해주세요.

interface TypingAreaProps {
    textQueue: string[];
    completedTexts: string[];
    inputValue: string;
    focusIndex: number;
}

const TypingArea: React.FC<TypingAreaProps> = ({ textQueue,completedTexts, inputValue, focusIndex }) => {
    return (
        <div className={"flex flex-col justify-around items-center w-3/4 h-1/2 font-GmarketMedium font-bold text-4xl transition-all duration-500 pb-12"}>
            <TypingLine text={textQueue[focusIndex - 1] || ''} inputValue={completedTexts[focusIndex-1] || ''} lineType={"past"} />
            <TypingLine text={textQueue[focusIndex] || ''} inputValue={inputValue} lineType={"present"} />
            <TypingLine text={textQueue[focusIndex + 1] || ''} inputValue={''} lineType={"future"} />
        </div>
    );
};

export default TypingArea;
