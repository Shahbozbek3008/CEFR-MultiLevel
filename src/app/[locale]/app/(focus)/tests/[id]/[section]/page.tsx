import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronLeft } from 'lucide-react';
import { ROUTES, type Skill } from '@/lib/constants';
import { READING } from '@/lib/mock/test-content';
import { initLocale, metadataTitle } from '@/lib/i18n';
import { assertSkill, type TestSectionParams } from '@/lib/test-route';
import { cn } from '@/lib/cn';
import { Icon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { TestFooter, FlagButton, NextButton, PrevButton } from '@/components/test/test-footer';
import { AudioBar, NoteCompletion, PartList, QuestionNavigator } from '@/components/test/listening';
import { ReadingPassage, StatementsPanel } from '@/components/test/reading';
import { WritingEditor, WritingTask } from '@/components/test/writing';
import { Recorder, SpeakingPrompt, SpeakingSteps } from '@/components/test/speaking';

export const generateMetadata = metadataTitle('test.metaTitle');

type ViewProps = { id: string };

/** W7 */
function ListeningView({ id }: ViewProps) {
  const t = useTranslations('test');
  return (
    <>
      <div className="grid min-h-0 flex-1 gap-5 p-6 xl:grid-cols-[1fr_340px]">
        <div className="flex min-h-0 flex-col gap-4">
          <AudioBar />
          <NoteCompletion />
        </div>
        <div className="flex flex-col gap-4">
          <QuestionNavigator />
          <PartList />
        </div>
      </div>
      <TestFooter
        start={<FlagButton />}
        center={<span className="text-[13px] text-ink-2">{t('autoAdvance')}</span>}
        end={<><PrevButton /><NextButton href={ROUTES.testSection(id, 'reading')} label={t('nextQuestion')} /></>}
      />
    </>
  );
}

/** W8 */
function ReadingView({ id }: ViewProps) {
  const t = useTranslations('test');
  return (
    <>
      <div className="grid min-h-0 flex-1 lg:grid-cols-[1.15fr_1fr]">
        <ReadingPassage />
        <StatementsPanel />
      </div>
      <TestFooter
        start={<FlagButton />}
        center={READING.parts.map((p) => (
          <button
            key={p.n}
            type="button"
            aria-current={'current' in p || undefined}
            className={cn('flex h-9 items-center gap-2 rounded-[11px] px-3 text-[13px]', 'current' in p ? 'bg-surface-sunken font-medium' : 'text-ink-2 hover:bg-hover')}
          >
            Part {p.n}
            <span className={cn('font-mono text-[11px]', p.answered === p.total ? 'text-green-text' : 'text-ink-3')}>{p.answered}/{p.total}</span>
          </button>
        ))}
        end={<><PrevButton /><NextButton href={ROUTES.testSection(id, 'writing')} label={t('next')} /></>}
      />
    </>
  );
}

/** W9 */
function WritingView({ id }: ViewProps) {
  const t = useTranslations('test');
  return (
    <>
      <div className="grid min-h-0 flex-1 gap-5 p-6 lg:grid-cols-[440px_1fr]">
        <WritingTask />
        <WritingEditor />
      </div>
      <TestFooter
        start={<Button variant="secondary" size="md" className="px-4" icon={<Icon as={ChevronLeft} size={16} />}>Task 1</Button>}
        end={<NextButton href={ROUTES.testSection(id, 'speaking')} label={t('writing.submit')} />}
      />
    </>
  );
}

/** W10 */
function SpeakingView() {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-5 px-30 pt-8 pb-10 max-xl:px-6">
      <SpeakingSteps />
      <SpeakingPrompt />
      <Recorder />
    </div>
  );
}

const VIEWS: Record<Skill, (props: ViewProps) => ReactNode> = {
  listening: ListeningView,
  reading: ReadingView,
  writing: WritingView,
  speaking: SpeakingView,
};

export default async function TestSectionPage({ params }: { params: TestSectionParams }) {
  await initLocale(params);
  const { id, section } = await params;
  const View = VIEWS[assertSkill(section)];
  return <View id={id} />;
}
