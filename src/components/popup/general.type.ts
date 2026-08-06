export type SizeValue =
    | number
    | `${number}px`
    | `${number}%`
    | `${number}vw`
    | `${number}vh`
    | `${number}dvw`
    | `${number}dvh`;

export type SizeType =
    | SizeValue
    | `${number}px ${number}px`
    | `${number}% ${number}%`
    | `${number}vw ${number}vh`
    | `${number}vw ${number}dvh`
    | {
          w: SizeValue;
          h: SizeValue;
      };
