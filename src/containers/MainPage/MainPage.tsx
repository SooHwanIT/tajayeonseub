import React, {useMemo} from 'react';
import TypingArea from "../../components/TypingArea/TypingArea";
import ScoreBoard from "../../components/ScoreBoard/ScoreBoard";
import {useEffect, useState} from "react";
import { countKoreanTyping } from "../../utils/TypingUtils";

const MainPage = () =>{
    const textQueue = useMemo(() => [
        '가가가',
        '나나나',
        '다다다',
        '네 번째 텍스트 네 번째 텍스트',
        '다섯 번째 텍스트 다섯 번째 텍스트',
        '여섯 번째 텍스트 여섯 번째 텍스트',
    ], []);

    const [inputValue, setInputValue] = useState<string>('');
    const [completedTexts, setCompletedTexts] = useState<string[]>([]);
    const [focusIndex, setFocusIndex] = useState<number>(0);
    const [typingSpeed, setTypingSpeed] = useState<number>(0);
    const [errorRate, setErrorRate] = useState<number>(0);
    const [timer, setTimer] = useState<number>(0);
    const [timerStarted, setTimerStarted] = useState<boolean>(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(inputValue.length < textQueue[focusIndex].length){
            const currentInput = e.target.value;
            setInputValue(currentInput);
            calculateTypingSpeed();
            calculateErrorRate();

            if (!timerStarted) {
                setTimerStarted(true);
            }
        }
    };
    const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if(inputValue.length >= textQueue[focusIndex].length){
                setCompletedTexts(prevCompletedTexts => [...prevCompletedTexts, inputValue]);
                setInputValue('');
                setFocusIndex(focusIndex + 1);
            }
            e.preventDefault();
        }
        if (e.key === 'Backspace' &&  inputValue.length < textQueue[focusIndex].length) {
            setInputValue(prevValue => prevValue.slice(0, -1));
        }
    };
    const calculateTypingSpeed = React.useCallback(() => {
        if(timer === 0 ) return
        let totalTypedCharacters = 0;
        console.log(completedTexts)
        // 완료된 텍스트들의 문자 수를 합산
        completedTexts.forEach(text => {
            totalTypedCharacters += countKoreanTyping(text);
        });

        // 현재 입력 중인 텍스트의 문자 수를 합산
        totalTypedCharacters += countKoreanTyping(inputValue);
        // 분 단위로 계산
        const speed = totalTypedCharacters / (timer / 60);

        setTypingSpeed(speed);
    }, [completedTexts, inputValue, timer]);

    // 오타 수 계산
    const calculateErrorRate = React.useCallback(() => {
        let totalErrors = 0;

        // 완료된 텍스트들의 오타 수를 합산
        completedTexts.forEach((text, index) => {
            totalErrors += [...text].filter((char, idx) => char !== textQueue[index][idx]).length;
        });

        // // 현재 입력 중인 텍스트의 오타 수를 합산
        // totalErrors += [...inputValue].filter((char, index) => char !== textQueue[focusIndex][index]).length;

        setErrorRate(totalErrors);
    }, [completedTexts, inputValue, textQueue, focusIndex]);

// 타이머를 관리하는 useEffect
    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (timerStarted) {
            interval = setInterval(() => {
                setTimer(prevTimer => prevTimer + 1);
            }, 1000);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [timerStarted]);

// 타이핑 속도를 계산하는 useEffect
    useEffect(() => {
        calculateTypingSpeed();
    }, [timer, calculateTypingSpeed]);

    return(
        <div className={"w-screen h-screen flex flex-col justify-center items-center"}>
            <input
                type="text"
                className="w-full h-screen bg-transparent outline-none"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleSubmit} // 수정된 부분
                // style={{ caretColor: 'transparent', opacity: 0, position: 'absolute',cursor: 'default' }}
            />
            <TypingArea textQueue={textQueue} completedTexts={completedTexts} inputValue={inputValue} focusIndex={focusIndex}/>
            <ScoreBoard typingSpeed={typingSpeed} errorRate={errorRate} timer={timer}/>
        </div>
    )
}

export default MainPage;
