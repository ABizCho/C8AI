import tw from "tailwind-styled-components";

const GridItemWrap = tw.div`
  max-w-full max-h-10% w-full h-225px flex-1 rounded-10 shadow-modal
`;

const GridBox = tw.div`
  w-full grid grid-cols-auto-fit grid-flow-row gap-4 place-items-center justify-start
`;
export { GridItemWrap, GridBox };
