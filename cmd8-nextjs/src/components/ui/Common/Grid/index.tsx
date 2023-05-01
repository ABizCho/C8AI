import tw from "tailwind-styled-components";

// const GridBox = tw.div`
// w-full grid grid-cols-2 grid-flow-row gap-4 place-items-center justify-start

// sm:grid-cols-3
// md:grid-cols-3
// lg:grid-cols-4
// xl:grid-cols-5
// `;

// const GridBox = tw.div`
// w-full

// grid grid-flow-col auto-cols-max gap-4
// place-items-center justify-start

// `;

const GridBox = tw.div`
w-full 
grid gap-6
place-items-center
justify-start
grid-flow-row
grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 
sm:max-w-2xl md:max-w-4xl xl:max-w-7xl

`;

const GridItemWrap = tw.div`
  max-w-full w-full h-225px flex-1 rounded-10 shadow-modal
  
`;

export { GridItemWrap, GridBox };
