import { useState, useEffect } from "react";
import Image from "next/image";
import tw from "tailwind-styled-components";

import { IAiTool, IGridAiToolParams, IAiCardParams } from "@/interfaces/main";
import { EnAutoComplete, KoAutoComplete } from "@/lib/util/Main";
import { GridBox, GridItemWrap } from "@/components/ui/Grid";

// import styled from "styled-components";

const CoreSec = ({ aiTools }: { aiTools: IAiTool[] }) => {
  const [searchWord, setSearchWord] = useState<string>("");
  aiTools = [];

  return (
    <section className=" content-section">
      <SearchBar searchWord={searchWord} setSearchWord={setSearchWord} />
      <ToolsContainer>
        <CategorySelectBar />
        <GridAiTools arrAi={aiTools} searchWord={searchWord} />
      </ToolsContainer>
    </section>
  );
};

export default CoreSec;

const SearchBar = ({ searchWord, setSearchWord }: any): JSX.Element => {
  const onChangeSearchWord = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(event.target.value);
  };

  return (
    <input
      id="searchWord"
      name="searchWord"
      type="text"
      className="coreSec-search rounded-full my-16 mx-12% py-auto  text-center text-base border h-14 w-3/4 lg:w-2/3 max-w-3xl"
      placeholder="이름, 용도, or 분야를 입력해주세요"
      value={searchWord}
      onChange={onChangeSearchWord}
    />
  );
};

const GridAiTools = ({ arrAi, searchWord }: IGridAiToolParams) => {
  const enPattern = /[a-zA-Z]/;
  const koPattern = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
  let filteredData: IAiTool[] = [];

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
    <div className="container">
      <GridBox>
        {filteredData.map((v, idx) => (
          <GridItemWrap
            key={idx}
            style={{ width: "270px" }}
            className={`${
              v.isFilteredOut ? "fade-out" : "fade-in"
            } transition-opacity duration-300 grid-item`}
            onAnimationEnd={(e) => onAnimationEnd(e, v.isFilteredOut)}
          >
            <AiGridItemInner
              key={v.id}
              imgUrl={v.imgUrl}
              id={v.id}
              nameKo={v.ko?.name}
              categoryKo={v.ko?.category}
            />
          </GridItemWrap>
        ))}
      </GridBox>
    </div>
  );
};

const AiGridItemInner = ({ id, imgUrl, nameKo, categoryKo }: IAiCardParams) => {
  return (
    <div className={`${id} text-center border rounded-3xl py-4 shadow-aiBox`}>
      <Image
        className="m-auto h-44"
        alt={`ai-logo-${id}`}
        src={imgUrl}
        width={200}
        height={170}
      />
      <div>{id}</div>
      <div>{nameKo}</div>
      <div>{categoryKo}</div>
    </div>
  );
};

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

// 반응형으로 Layout을 변경할 경우, 이처럼 tailwind-styld-components를 사용하는 원칙 수립
const ToolsContainer = tw.div`
  flex flex-col gap-4 
  sm:flex-row
`;

const CategoryBox = tw.div`
	flex flex-row mx-10 gap-4
	sm:flex-col
`;
