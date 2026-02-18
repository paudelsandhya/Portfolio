import { useState, useEffect } from "react";

const TypeWriter = ({
  texts = ["Student", "Sightseer", "Bio-tech aficionado", "Design enthusiast"],
  speed = 50,
  deleteSpeed = 40,
  pauseDuration = 1000,
}) => {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const currentText = texts[textIndex];

  useEffect(() => {
    let delay;

    if (!isDeleting) {
      if (charIndex < currentText.length) {
        delay = setTimeout(() => {
          setCharIndex((i) => i + 1);
        }, speed);
      } else if (charIndex === currentText.length) {
        delay = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      }
    } else {
      if (charIndex > 0) {
        delay = setTimeout(() => {
          setCharIndex((i) => i - 1);
        }, deleteSpeed);
      } else {
        setTextIndex((i) => (i + 1) % texts.length);
        setIsDeleting(false);
      }
    }

    return () => clearTimeout(delay);
  }, [charIndex, currentText.length, isDeleting, speed, deleteSpeed, pauseDuration, texts.length]);

  return <span>{currentText.slice(0, charIndex)}</span>;
};

export default TypeWriter;