import type { Skill } from '@/lib/constants';

/** Header/footer state per section of the running mock (W7–W10). */
export const SESSION: Record<Skill, { timer: string; warning?: boolean; current: number; total: number }> = {
  listening: { timer: '24:18', current: 2, total: 6 },
  reading: { timer: '41:05', current: 3, total: 5 },
  writing: { timer: '38:20', current: 2, total: 2 },
  speaking: { timer: '00:24', warning: true, current: 3, total: 8 },
};

/** Test content is English by design (README: interface uz/ru/en, test content en). */
export const LISTENING = {
  audio: { position: '02:14', duration: '06:10', progress: 36 },
  range: '9–14',
  title: 'City Sports Centre — membership',
  instruction: ['Complete the notes. Write ', 'NO MORE THAN TWO WORDS', ' for each answer.'],
  notes: [
    { n: 9, label: 'Opening hours', before: '6 am –', answer: '10 pm' },
    { n: 10, label: 'Student fee per year', before: '£', answer: '35', current: true },
    { n: 11, label: 'Swimming lessons on' },
    { n: 12, label: 'Free parking for', after: 'hours' },
    { n: 13, label: 'Bring your', after: 'to register' },
    { n: 14, label: 'Contact' },
  ],
  totalQuestions: 35,
  answeredUpTo: 9,
  currentQuestion: 10,
  flagged: [4],
  parts: [
    { n: 1, range: '1–8', state: 'done' },
    { n: 2, range: '9–14', state: 'current' },
    { n: 3, range: '15–20', state: 'locked' },
    { n: 4, range: '21–27', state: 'locked' },
    { n: 5, range: '28–31', state: 'locked' },
    { n: 6, range: '32–35', state: 'locked' },
  ],
} as const;

export const READING = {
  passage: {
    n: 3,
    title: 'The rise of urban farming',
    paragraphs: [
      { id: 'A', segments: ['Urban gardens have grown rapidly over the past decade, ', { text: 'transforming unused rooftops and vacant lots', mark: 'highlight' }, ' into productive spaces. In many cities, these gardens now supply local markets with fresh vegetables throughout the year.'] },
      { id: 'B', toolbar: true, segments: ['Supporters argue that urban farming reduces the distance food travels, lowering emissions. Critics, however, point out that ', { text: 'yields remain modest', mark: 'note' }, ' compared with rural farms, and that land in city centres is expensive.'] },
      { id: 'C', segments: ['A 2024 survey found that residents living near community gardens reported stronger social ties and greater interest in healthy eating, suggesting benefits that extend beyond food production.'] },
    ],
  },
  range: '22–27',
  instruction: 'Do the following statements agree with the information in the passage?',
  options: ['True', 'False', 'Not Given'],
  statements: [
    { n: 22, text: 'Urban gardens are now able to supply markets all year round.', answer: 'True' },
    { n: 23, text: 'Urban farms produce more food per hectare than rural farms.', answer: 'False' },
    { n: 24, text: 'City land is more affordable than rural land.', current: true },
    { n: 25, text: 'Community gardens can improve relationships between neighbours.' },
  ],
  parts: [
    { n: 1, answered: 7, total: 7 },
    { n: 2, answered: 7, total: 7 },
    { n: 3, answered: 2, total: 6, current: true },
    { n: 4, answered: 0, total: 8 },
    { n: 5, answered: 0, total: 7 },
  ],
} as const;

export const WRITING = {
  task1Words: 168,
  prompt: 'Some people think cities should invest more in public transport than in roads. Discuss both views and give your own opinion.',
  minWords: 250,
  minutes: 40,
  draft: [
    'Many people believe that public transport is the key to a sustainable city. Buses and trains move more people with less space and fewer emissions than private cars, which is why many governments are investing heavily in metro systems.',
    'On the other hand, some argue that roads remain essential for deliveries and emergency services, especially in growing suburbs where',
  ],
  words: 184,
  paragraphs: 4,
  savedSecondsAgo: 12,
} as const;

export const SPEAKING_TASK = {
  part: '1.2',
  question: 'Describe what you can see in the picture. Why do you think people go to places like this?',
  prepSeconds: 30,
  answerSeconds: 60,
  elapsed: '00:36',
  limit: '01:00',
  steps: 8,
  done: 2,
} as const;

export const FINISH_SUMMARY = {
  answered: 66,
  flagged: 2,
  unanswered: 2,
  unansweredChips: [
    { skill: 'reading', n: 24 },
    { skill: 'reading', n: 27 },
  ],
  flaggedChip: { skill: 'listening', items: '4, 12' },
} as const;
