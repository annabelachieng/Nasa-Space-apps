import React, { useEffect, useState } from 'react';
import { ArrowLeft, Award, BookOpen, ChevronLeft, ChevronRight, Orbit, Volume2, VolumeX } from 'lucide-react';
import { SPACECRAFT_CATEGORIES } from '../data/spacecraftData';
import { SpacecraftData } from '../types/spacecraft';
import { SpacecraftImage } from './SpacecraftImage';

interface StoryViewProps {
  craft: SpacecraftData;
  onWatchInSpace: () => void;
  onStoryCompleted?: (craftId: string) => void;
  onBackToCraft?: () => void;
}

export const StoryView: React.FC<StoryViewProps> = ({
  craft,
  onWatchInSpace,
  onStoryCompleted,
  onBackToCraft,
}) => {
  const [chapterIdx, setChapterIdx] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const category = SPACECRAFT_CATEGORIES.find((c) => c.id === craft.categoryId)!;
  const chapters = craft.story.chapters;
  const activeChapter = chapters[chapterIdx] ?? chapters[0];
  const speechSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  useEffect(() => {
    setChapterIdx(0);
    if (speechSupported) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [craft.id, speechSupported]);

  useEffect(() => {
    if (chapters.length > 0 && chapterIdx === chapters.length - 1) {
      onStoryCompleted?.(craft.id);
    }
  }, [chapterIdx, chapters.length, craft.id, onStoryCompleted]);

  useEffect(() => {
    return () => {
      if (speechSupported) {
        window.speechSynthesis.cancel();
      }
    };
  }, [speechSupported]);

  const toggleReadAloud = () => {
    if (!speechSupported) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(
      `${activeChapter.chapterTitle}. ${activeChapter.text} Science Secret: ${activeChapter.kidTakeaway}`
    );
    utterance.rate = 0.96;
    utterance.pitch = 1.04;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const goChapter = (nextIdx: number) => {
    if (speechSupported) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    setChapterIdx(nextIdx);
  };

  return (
    <div className="fixed inset-x-0 top-14 bottom-0 z-20 overflow-y-auto cosmic-scroll bg-transparent px-4 sm:px-8 py-6">
      <div className="max-w-3xl mx-auto space-y-4 pb-12">
        {onBackToCraft && (
          <button
            type="button"
            onClick={onBackToCraft}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-amber-300 hover:text-amber-200 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to {craft.shortName}
          </button>
        )}
        {/* Story Book Container */}
        <article className="bg-[#0b1020] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
          {/* Top Story Meta + Mission Picture */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
            <div className="flex items-center gap-4 min-w-0">
              <SpacecraftImage
                craftId={craft.id}
                alt={`${craft.name} space photograph`}
                title={craft.shortName}
                accentHex={category.accentHex}
                className="w-24 sm:w-28 aspect-[16/10] rounded-xl shrink-0"
              />
              <div className="min-w-0">
                <div className="text-xs font-medium text-slate-400">
                  <span style={{ color: category.accentHex }}>Cosmic Frontlines Chronicles</span>
                  <span aria-hidden="true"> · </span>
                  <span>{craft.story.frontlineCallsign}</span>
                </div>
                <h1 className="font-display text-xl sm:text-2xl font-bold text-white mt-1 leading-tight">
                  {craft.story.title}
                </h1>
              </div>
            </div>

            {speechSupported && (
              <button
                type="button"
                onClick={toggleReadAloud}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isSpeaking
                    ? 'bg-amber-500 text-slate-950 border-amber-400'
                    : 'bg-slate-900 text-slate-200 border-slate-700 hover:border-slate-500'
                }`}
              >
                {isSpeaking ? (
                  <>
                    <VolumeX className="w-4 h-4" />
                    Stop Reading
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-amber-400" />
                    Read Aloud
                  </>
                )}
              </button>
            )}
          </div>

          {/* Chapter Stepper */}
          <div className="flex items-center gap-2 mt-5">
            {chapters.map((ch, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => goChapter(idx)}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold border transition-colors cursor-pointer truncate ${
                  idx === chapterIdx
                    ? 'bg-slate-800 border-amber-400 text-amber-300'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                Page {idx + 1}
              </button>
            ))}
          </div>

          {/* Active Chapter Body */}
          <div className="mt-6">
            <div className="flex items-center gap-2 text-xs text-sky-300 font-medium mb-1">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{activeChapter.setting}</span>
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
              {activeChapter.chapterTitle}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed">
              {activeChapter.text}
            </p>
          </div>

          {/* Kid Takeaway Box (subtle all-around hairline border, no thick left stripe) */}
          <div className="mt-6 p-4 rounded-xl bg-slate-900/80 border border-slate-700/80">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
              <span className="text-xs font-semibold text-amber-300">
                Cosmic Science Secret
              </span>
              {chapterIdx === chapters.length - 1 && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-300">
                  <Award className="w-3.5 h-3.5" />
                  Story Log Complete
                </span>
              )}
            </div>
            <p className="text-sm text-slate-200 leading-relaxed">
              {activeChapter.kidTakeaway}
            </p>
          </div>

          {/* Footer Navigation */}
          <div className="mt-8 pt-5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={chapterIdx === 0}
                onClick={() => goChapter(chapterIdx - 1)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-200 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous Page
              </button>
              <button
                type="button"
                disabled={chapterIdx === chapters.length - 1}
                onClick={() => goChapter(chapterIdx + 1)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-200 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                Next Page
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={onWatchInSpace}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-500 text-slate-950 text-xs sm:text-sm font-semibold hover:bg-sky-400 transition-colors cursor-pointer"
            >
              <Orbit className="w-4 h-4" />
              Watch {craft.shortName} in Motion
            </button>
          </div>
        </article>
      </div>
    </div>
  );
};
