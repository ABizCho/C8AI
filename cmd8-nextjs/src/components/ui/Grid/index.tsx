import tw from "tailwind-styled-components";

const GridBox = tw.div`
w-full grid grid-cols-2 grid-flow-row gap-4 place-items-center justify-start


sm:grid-cols-3
md:grid-cols-3
lg:grid-cols-4
xl:grid-cols-5
`;

const GridItemWrap = tw.div`
  max-w-full w-full h-225px flex-1 rounded-10 shadow-modal
`;

export { GridItemWrap, GridBox };
