import { useState, useEffect } from "react";

export const useTypingEffect = (text: string, speed: number = 30) => {
    const [displayText, setDisplayText] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        if (!text) return;

        // 비동기로 처리
        const startTyping = async () => {
            setDisplayText("");
            setIsTyping(true);

            let index = 0;
            const timer = setInterval(() => {
                if (index < text.length) {
                    setDisplayText(text.slice(0, index + 1));
                    index++;
                } else {
                    setIsTyping(false);
                    clearInterval(timer);
                }
            }, speed);

            return () => clearInterval(timer);
        };

        startTyping();
    }, [text, speed]);

    return { displayText, isTyping };
};
