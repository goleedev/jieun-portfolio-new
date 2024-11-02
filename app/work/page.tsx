import Featured from './components/featured';
import Header from './components/header';

export default function WorkPage() {
  return (
    <section className="pt-10 pb-[120px] md:pt-16 md:pb-[160px]">
      <Header />
      <Featured />
    </section>
  );
}
