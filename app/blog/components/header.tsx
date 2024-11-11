export default function Header() {
  return (
    <section className="flex flex-col gap-7 md:gap-0 md:flex-row">
      <div className="md:w-2/3">
        <h1
          style={{
            fontSize: 'clamp(2.75rem, 4vw + 1rem, 5rem)',
            lineHeight: 'clamp(2.5rem, 4vw + 1rem, 4.5rem)',
          }}
          className="font-mono font-semibold"
        >
          ALL <br /> POSTS
        </h1>
      </div>
      <div className="md:w-1/3">
        <p
          style={{
            fontSize: 'clamp(0.875rem, 1vw + 0.5rem, 1.125rem)',
            lineHeight: 'clamp(1.25rem, 1.5vw + 0.5rem, 1.75rem)',
          }}
        >
          As a UI/UX designer, I dive deep into the details of the project, but
          don&apos;t miss the big picture and look at the project from different
          angles. In order to improve the user experience, I work closely with
          both design team and the planning and developer team, being
          responsible for the final result.
        </p>
      </div>
    </section>
  );
}
