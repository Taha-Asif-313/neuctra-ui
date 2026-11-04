export default function SectionHeading({ eyebrow, title, text, id, center = true }) {
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className="mt-3 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl"
      >
        {title}
      </h2>
      {text && (
        <p className="mt-4 text-base leading-7 text-secondary sm:text-lg">{text}</p>
      )}
    </div>
  );
}
