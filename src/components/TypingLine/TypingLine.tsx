import React from 'react';

interface TypingLineProps {
    text: string;
    inputValue: string;
    lineType: 'past' | 'present' | 'future';
}

const TypingLine: React.FC<TypingLineProps> = ({ text, inputValue, lineType }) => {
    const classNames = {
        past: "text-center m-2 text-gray-900",
        present: "text-center m-2 text-gray-500 text-5xl",
        future: "text-center m-2 text-gray-400",
    };

    const renderPresentText = () => {
        return [...inputValue].map((char, index) => {
            const isIncorrect = text[index] !== char;
            const isCurrent = lineType === "present" && index === inputValue.length-1;
            return isIncorrect ? (
                isCurrent ? (
                    <span key={index} className="text-gray-900">{char}</span>
                ) : (
                    <span key={index} className="text-red-500">{text[index]}</span>
                )
            ) : (
                <span key={index} className="text-gray-900">{char}</span>
            );
        });
    };
    return (
        <p className={classNames[lineType]}>
            {renderPresentText()}
            <span>{text.slice(inputValue.length)}</span>
        </p>
    );
};

export default TypingLine;
