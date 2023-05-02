import { useState, useEffect } from "react";
import tw from "tailwind-styled-components";

import { IAiTool, IGridAiToolParams, IAiCardParams } from "@/interfaces/main";
import { EnAutoComplete, KoAutoComplete } from "@/lib/util/Main";

import { GridBox, GridItemWrap } from "@/components/ui/Common/Grid";
import { SearchBar } from "@/components/ui/Main/Core/SearchBar";
import { AIGridCard } from "@/components/ui/Main/Core/AIGridCard";

const CoreSec = ({ aiTools }: { aiTools: IAiTool[] }) => {
  const [searchWord, setSearchWord] = useState<string>("");

  return (
    <section className="content-section">
      <SearchBar searchWord={searchWord} setSearchWord={setSearchWord} />
      <ToolsContainer>
        <GridAiTools arrAi={aiTools} searchWord={searchWord} />
        <CategorySelectBar />
      </ToolsContainer>
    </section>
  );
};

export default CoreSec;

const CategorySelectBar = (): JSX.Element => {
  return (
    <CategoryBox>
      <div>All</div>
      <div>그림</div>
      <div>영상</div>
      <div>3D렌더링</div>
      <div>글쓰기</div>
      <div></div>
    </CategoryBox>
  );
};

const GridAiTools = ({ arrAi = [], searchWord }: IGridAiToolParams) => {
  const enPattern = /[a-zA-Z]/;
  const koPattern = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
  let filteredData: IAiTool[];

  console.log("#################arrAI:", arrAi);

  if (searchWord === "") {
    filteredData = arrAi;
  } else if (enPattern.test(searchWord)) {
    filteredData = EnAutoComplete(searchWord, arrAi);
  } else if (koPattern.test(searchWord)) {
    filteredData = KoAutoComplete(searchWord, arrAi);
  } else {
    filteredData = arrAi || [];
  }

  const onAnimationEnd = (
    e: React.AnimationEvent<HTMLDivElement>,
    isFilteredOut: boolean
  ) => {
    if (isFilteredOut) {
      e.currentTarget.style.display = "none";
    } else {
      e.currentTarget.style.display = "";
    }
  };

  useEffect(() => {
    const enPattern = /[a-zA-Z]/;
    const koPattern = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    let filteredData: IAiTool[];

    if (searchWord === "") {
      filteredData = arrAi;
    } else if (enPattern.test(searchWord)) {
      filteredData = EnAutoComplete(searchWord, arrAi);
    } else if (koPattern.test(searchWord)) {
      filteredData = KoAutoComplete(searchWord, arrAi);
    } else {
      filteredData = arrAi || [];
    }

    console.log("searchWord: ", searchWord);

    const gridItems = document.querySelectorAll(".grid-item");
    gridItems.forEach((item, index) => {
      const targetItem = filteredData[index];
      if (targetItem && !targetItem.isFilteredOut) {
        (item as HTMLElement).style.animation = "fadeIn 0.3s";
        (item as HTMLElement).style.display = "";
      } else {
        (item as HTMLElement).style.animation = "fadeOut 0.3s forwards";
      }
    });
  }, [searchWord]);

  return (
    <div
      className="w-full 
      max-w-[1325px]
    md:w-3/4 md:my-auto
    lg:3/4 h-[450px] md:h-[800px] overflow-auto overflow-x-hidden overflow-y-scroll"
    >
      <GridBox className="my-10 mx-3 place-content-center">
        {filteredData.map((v, idx) => (
          <GridItemWrap
            key={idx}
            style={{ width: "300px" }}
            className={`${
              v.isFilteredOut ? "fade-out" : "fade-in"
            } transition-opacity duration-300 grid-item`}
            onAnimationEnd={(e) => onAnimationEnd(e, v.isFilteredOut)}
          >
            <AIGridCard
              key={v.id}
              imgUrl={v.imgUrl}
              id={v.id}
              nameKo={v.ko?.name}
              summary={v.summary}
              categoryKey={v.en?.category[0]}
              redirectUrl={v.redirectUrl}
              derived={v.derived}
            />
          </GridItemWrap>
        ))}
      </GridBox>
    </div>
  );
};

// 반응형으로 Layout을 변경할 경우, 이처럼 tailwind-styld-components를 사용하는 원칙 수립
const ToolsContainer = tw.div`
  px-4
  justify-center
  flex flex-col flex-col-reverse
  gap-4 md:flex-row
`;

const CategoryBox = tw.div`
	flex flex-row
  mx-10 gap-4
  md:flex-col
`;
