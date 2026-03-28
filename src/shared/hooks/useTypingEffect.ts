import { useState, useEffect } from 'react';

export function useTypingEffect(text: string, speedMs = 55) {
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    if (charCount >= text.length) return;

    const timeout = setTimeout(() => {
      setCharCount((c) => c + 1);
    }, speedMs);

    return () => clearTimeout(timeout);
  }, [charCount, text.length, speedMs]);

  return {
    displayed: text.slice(0, charCount),
    isDone: charCount >= text.length,
  };
}
