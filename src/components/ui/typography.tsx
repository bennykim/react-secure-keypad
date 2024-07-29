type TypogreaphyProps = {
  text: string;
};

export function TypographyH1({ text }: TypogreaphyProps) {
  return (
    <h1
      role="heading-1"
      className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-zinc-50"
    >
      {text}
    </h1>
  );
}

export function TypographyH2({ text }: TypogreaphyProps) {
  return (
    <h2
      role="heading-2"
      className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-zinc-50 mt-6"
    >
      {text}
    </h2>
  );
}

export function TypographyH3({ text }: TypogreaphyProps) {
  return (
    <h3
      role="heading-3"
      className="scroll-m-20 text-2xl font-semibold tracking-tight text-zinc-50"
    >
      {text}
    </h3>
  );
}
