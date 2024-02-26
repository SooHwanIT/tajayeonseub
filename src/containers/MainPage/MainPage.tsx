import TypingArea from "../../components/TypingArea/TypingArea";
import ScoreBoard from "../../components/ScoreBoard/ScoreBoard";
import {useEffect, useRef, useState} from "react";
import { countKoreanTyping } from "../../utils/TypingUtils"; // 유틸리티 함수를 import합니다.

const MainPage = () =>{
    const textQueue = [
        '가가가',
        '나나나',
        '다다다',
        '네 번째 텍스트 네 번째 텍스트',
        '다섯 번째 텍스트 다섯 번째 텍스트',
        '여섯 번째 텍스트 여섯 번째 텍스트',
    ];

    const [inputValue, setInputValue] = useState<string>('');
    const [completedTexts, setCompletedTexts] = useState<string[]>([]);
    const [focusIndex, setFocusIndex] = useState<number>(0); // 포커스 인덱스 추가
    const [typingSpeed, setTypingSpeed] = useState<number>(0);
    const [errorRate, setErrorRate] = useState<number>(0);
    const [timer, setTimer] = useState<number>(0);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const currentInput = e.target.value;
        setInputValue(currentInput);

        setTypingSpeed(countKoreanTyping(currentInput) / (timer / 60));
        setErrorRate([...currentInput].filter((char, index) => char !== textQueue[focusIndex][index]).length);

        // 입력값이 현재 텍스트와 일치하거나, 입력값의 길이가 현재 텍스트의 길이보다 길 경우
        if (currentInput === textQueue[focusIndex] || currentInput.length >= textQueue[focusIndex].length) {
            setCompletedTexts(prevCompletedTexts => [...prevCompletedTexts, currentInput]);
            setInputValue(''); // 입력값을 초기화합니다.
            setFocusIndex(focusIndex + 1); // 다음 텍스트로 넘어갑니다.
        }
    };

    // 타이머 설정
    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(prevTimer => prevTimer + 1);
        }, 1000); // 1초마다 업데이트

        return () => clearInterval(interval); // 컴포넌트 unmount 시, 타이머 해제
    }, []);

    return(
        <div className={"w-screen h-screen flex flex-col justify-center items-center"}>
            <input
                type="text"
                className="w-full h-screen bg-transparent outline-none"
                value={inputValue}
                onChange={handleInputChange}
                // style={{ caretColor: 'transparent', opacity: 0, position: 'absolute',cursor: 'default' }}
            />
            <TypingArea textQueue={textQueue} inputValue={inputValue} focusIndex={focusIndex}/>
            <ScoreBoard typingSpeed={typingSpeed} errorRate={errorRate} timer={timer}/>
        </div>
    )
}

export default MainPage;
