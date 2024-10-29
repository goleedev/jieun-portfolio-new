import { ImageComponent, TextLine } from '@/components/home-content';

function HomeContent(): JSX.Element {
  return (
    <section className="w-full min-h-[calc(100vh-128px)] flex flex-col items-center justify-center text-center font-mono font-black tracking-tighter leading-none overflow-auto cursor-default">
      <div className="flex flex-col items-center">
        <TextLine>
          <span>L</span>
          <ImageComponent src="/gifs/E.gif" alt="E gif" />
          <span>AVE</span>
          <span className="sm:pl-6 md:pl-12 pl-3">A</span>
        </TextLine>
        <TextLine>
          <span>MES</span>
          <ImageComponent src="/gifs/S-green.gif" alt="S gif" />
          <span>AG</span>
          <ImageComponent src="/gifs/E.gif" alt="E gif" />
        </TextLine>
      </div>
    </section>
  );
}

export default HomeContent;
