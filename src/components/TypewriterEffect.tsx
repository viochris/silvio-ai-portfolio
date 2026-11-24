"use client"

import React, { useState, useEffect } from 'react';

const words = [
  "analyze Tabular & NLP data.",
  "build autonomous AI Agents.",
  "develop ML & DL models.",
  "ship production GenAI APIs.",
  "architect Vector, Graph & Hybrid RAG.",
  "engineer Text-to-SQL & RAG pipelines.",
  "automate workflows with Prefect & Bots.",
  "design explainable ML pipelines.",
  "craft interactive AI web apps.",
  "turn raw data into meaningful stories.",
];

export const TypewriterEffect: React.FC = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState(words[0]);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setCurrentText(words[0]);
      return;
    }

    const fullText = words[currentWordIndex];
    let delay = isDeleting ? 45 : 95;

    if (!isDeleting && currentText === fullText) {
      delay = 1800;
    } else if (isDeleting && currentText === "") {
      delay = 250;
    }

    const timer = window.setTimeout(() => {
      if (!isDeleting && currentText === fullText) {
        setIsDeleting(true);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      } else if (isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length - 1));
      } else {
        setCurrentText(fullText.substring(0, currentText.length + 1));
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex]);

  return (
    <span className="text-primary font-code inline-block">
      {currentText}
      <span className="animate-typing border-r-2 border-primary ml-1" aria-hidden="true" />
    </span>
  );
};
