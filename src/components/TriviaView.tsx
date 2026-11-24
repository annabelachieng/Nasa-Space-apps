import React, { useState } from 'react';
import { Award, CheckCircle2, HelpCircle, Orbit, RotateCcw, Star, XCircle } from 'lucide-react';
import { TRIVIA_LEVELS } from '../data/triviaData';
import { SPACECRAFT_CATEGORIES, SPACECRAFT_LIST } from '../data/spacecraftData';
import { SpacecraftData, TriviaLevel } from '../types/spacecraft';
import { SpacecraftImage } from './SpacecraftImage';
import { sfx } from '../utils/soundEffects';

interface TriviaViewProps {
  onInspectCraft: (craft: SpacecraftData) => void;
  onLevelCompleted?: (level: TriviaLevel, score: number) => void;
}

export const TriviaView: React.FC<TriviaViewProps> = ({
  onInspectCraft,
  onLevelCompleted,
}) => {
  const [activeLevelIdx, setActiveLevelIdx] = useState(0);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [levelScore, setLevelScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [levelFinished, setLevelFinished] = useState(false);
  const [completedLevels, setCompletedLevels] = useState<Record<number, number>>({});

  const level = TRIVIA_LEVELS[activeLevelIdx];
  const question = level.questions[questionIdx];
  const relatedCraft = SPACECRAFT_LIST.find((c) => c.id === question.craftId);
  const isAnswered = selectedOption !== null;
  const isCorrect = selectedOption === question.correctIndex;

  const selectLevel = (idx: number) => {
    setActiveLevelIdx(idx);
    setQuestionIdx(0);
    setSelectedOption(null);
    setShowHint(false);
    setLevelScore(0);
    setLevelFinished(false);
  };

  const handleChooseOption = (optIdx: number) => {
    if (isAnswered) return;
    setSelectedOption(optIdx);
    if (optIdx === question.correctIndex) {
      setLevelScore((s) => s + 1);
      setStreak((st) => st + 1);
      sfx.playTriviaCorrect();
    } else {
      setStreak(0);
      sfx.playTriviaWrong();
    }
  };

  const handleNextQuestion = () => {
    if (questionIdx + 1 < level.questions.length) {
      setQuestionIdx((q) => q + 1);
      setSelectedOption(null);
      setShowHint(false);
    } else {
      setLevelFinished(true);
      setCompletedLevels((prev) => ({
        ...prev,
        [level.id]: Math.max(prev[level.id] ?? 0, levelScore),
      }));
      onLevelCompleted?.(level, levelScore);
    }
  };

  const totalStars = Object.values(completedLevels).reduce((sum, val) => sum + val, 0);

  return (
    <div className="fixed inset-x-0 top-14 bottom-0 z-20 overflow-y-auto cosmic-scroll bg-transparent px-4 sm:px-8 py-6">
      <div className="max-w-4xl mx-auto space-y-6 pb-12">
        {/* Trivia Top Header & Level Selector */}
        <div className="bg-[#0b1020] border border-slate-800 rounded-2xl p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-white">
                Cosmic Frontlines Trivia Levels
              </h1>
              <p className="text-sm text-slate-300 mt-1">
                Test your space engineering skills across 5 mission levels and earn fleet ranks!
              </p>
            </div>
            <div className="flex items-center gap-5 text-sm">
              <div>
                <div className="text-xs text-slate-400">Streak</div>
                <div className="font-mono-tabular font-bold text-amber-300">
                  {streak} in a row
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-400">Total Stars</div>
                <div className="font-mono-tabular font-bold text-sky-300 flex items-center gap-1">
                  <Star className="w-4 h-4 fill-sky-300 text-sky-300" />
                  {totalStars}
                </div>
              </div>
            </div>
          </div>

          {/* 5 Level Tabs */}
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-5 gap-2">
            {TRIVIA_LEVELS.map((lvl, idx) => {
              const best = completedLevels[lvl.id];
              const active = idx === activeLevelIdx;
              return (
                <button
                  key={lvl.id}
                  type="button"
                  onClick={() => selectLevel(idx)}
                  className={`text-left p-3 rounded-xl border transition-colors cursor-pointer ${
                    active
                      ? 'bg-amber-500/15 border-amber-400 text-white'
                      : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  <div className="font-mono-tabular text-xs font-bold text-amber-300">
                    Level {lvl.id}
                  </div>
                  <div className="text-xs font-semibold truncate mt-0.5">
                    {lvl.title.replace(`Level ${lvl.id}: `, '')}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 font-mono-tabular">
                    {best !== undefined
                      ? `Best: ${best}/${lvl.questions.length}`
                      : `${lvl.questions.length} questions`}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Level Play Area */}
        {!levelFinished ? (
          <div className="bg-[#0b1020] border border-slate-800 rounded-2xl p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div className="text-xs font-medium text-slate-400">
                <span className="text-amber-300 font-semibold">{level.title}</span>
                <span aria-hidden="true"> · </span>
                <span>{question.categoryLabel}</span>
              </div>
              <div className="font-mono-tabular text-xs text-slate-400">
                Question {questionIdx + 1} of {level.questions.length}
              </div>
            </div>

            {/* Question Prompt + Mission Photo */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              {relatedCraft && (
                <SpacecraftImage
                  craftId={relatedCraft.id}
                  alt={`${relatedCraft.name} mission picture`}
                  title={relatedCraft.shortName}
                  accentHex={
                    SPACECRAFT_CATEGORIES.find((c) => c.id === relatedCraft.categoryId)?.accentHex
                  }
                  className="w-28 sm:w-32 aspect-[16/10] rounded-xl shrink-0"
                />
              )}
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white leading-snug">
                {question.question}
              </h2>
            </div>

            {/* Hint Toggle */}
            <div className="mt-3">
              {!showHint ? (
                <button
                  type="button"
                  onClick={() => setShowHint(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-sky-300 hover:text-sky-200 cursor-pointer"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  Need a Cosmic Hint?
                </button>
              ) : (
                <div className="p-3 rounded-lg bg-slate-900 border border-sky-500/30 text-xs text-sky-200">
                  <span className="font-semibold">Hint: </span>
                  {question.hint}
                </div>
              )}
            </div>

            {/* Options */}
            <div className="mt-5 space-y-3">
              {question.options.map((opt, idx) => {
                let styleClass =
                  'bg-slate-900/80 border-slate-800 text-slate-200 hover:border-slate-600 hover:bg-slate-900';
                if (isAnswered) {
                  if (idx === question.correctIndex) {
                    styleClass =
                      'bg-emerald-500/15 border-emerald-400 text-emerald-100';
                  } else if (idx === selectedOption) {
                    styleClass =
                      'bg-rose-500/15 border-rose-400 text-rose-100';
                  } else {
                    styleClass =
                      'bg-slate-900/40 border-slate-800/60 text-slate-500';
                  }
                }
                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={isAnswered}
                    onClick={() => handleChooseOption(idx)}
                    className={`w-full text-left p-4 rounded-xl border transition-colors flex items-center justify-between gap-3 ${
                      isAnswered ? 'cursor-default' : 'cursor-pointer'
                    } ${styleClass}`}
                  >
                    <span className="text-sm sm:text-base font-medium">
                      {opt}
                    </span>
                    {isAnswered && idx === question.correctIndex && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    )}
                    {isAnswered &&
                      idx === selectedOption &&
                      idx !== question.correctIndex && (
                        <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                      )}
                  </button>
                );
              })}
            </div>

            {/* Instant Feedback & Next */}
            {isAnswered && (
              <div className="mt-6 p-4 rounded-xl bg-slate-900 border border-slate-700/80 space-y-3">
                <div
                  className={`text-sm font-bold ${
                    isCorrect ? 'text-emerald-300' : 'text-amber-300'
                  }`}
                >
                  {isCorrect
                    ? 'Mission Success! Great cosmic thinking!'
                    : 'Not quite—here is how it really works:'}
                </div>
                <p className="text-sm text-slate-200 leading-relaxed">
                  {question.explanation}
                </p>
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  {relatedCraft && (
                    <button
                      type="button"
                      onClick={() => onInspectCraft(relatedCraft)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-300 hover:text-sky-200 cursor-pointer"
                    >
                      <Orbit className="w-3.5 h-3.5" />
                      Inspect {relatedCraft.shortName} in 3D
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    className="ml-auto px-5 py-2 rounded-lg bg-amber-500 text-slate-950 text-sm font-semibold hover:bg-amber-400 transition-colors cursor-pointer"
                  >
                    {questionIdx + 1 < level.questions.length
                      ? 'Next Question'
                      : 'Finish Level'}
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Level Complete Summary */
          <div className="bg-[#0b1020] border border-amber-400/50 rounded-2xl p-8 text-center space-y-4">
            <Award className="w-12 h-12 text-amber-400 mx-auto" />
            <div className="text-xs font-semibold text-amber-300">
              {level.title} Complete
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
              You scored {levelScore} out of {level.questions.length}!
            </h2>
            <p className="text-sm text-slate-300 max-w-md mx-auto">
              {levelScore >= level.questions.length - 1
                ? `Amazing work, Explorer! You unlocked the "${level.rankReward}" rank!`
                : `Great effort! Explore the spacecraft in 3D and try again to earn the "${level.rankReward}" rank!`}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
              <button
                type="button"
                onClick={() => selectLevel(activeLevelIdx)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm font-semibold text-slate-200 hover:bg-slate-800 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                Replay Level
              </button>
              {activeLevelIdx + 1 < TRIVIA_LEVELS.length && (
                <button
                  type="button"
                  onClick={() => selectLevel(activeLevelIdx + 1)}
                  className="px-5 py-2 rounded-lg bg-amber-500 text-slate-950 text-sm font-semibold hover:bg-amber-400 cursor-pointer"
                >
                  Start Level {activeLevelIdx + 2}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
