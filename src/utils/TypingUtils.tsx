// 한글 타자 수 세는 함수
export const countKoreanTyping = (str: string): number => {
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        let charCode = str.charCodeAt(i);
        // 한글이 아닌 경우 1타로 계산
        if (charCode < 0xAC00 || charCode > 0xD7A3) {
            count += 1;
        } else {
            // 한글일 경우 연산
            let unicode = charCode - 0xAC00;
            let jong = unicode % 28; // 종성
            let jung = ((unicode - jong) / 28) % 21; // 중성
            let cho = (((unicode - jong) / 28) - jung) / 21; // 초성
            count += jong > 0 ? 3 : 2; // 종성이 있을 경우 3타, 없을 경우 2타로 계산
        }
    }
    return count;
};
