import { useState } from "react";

import { IAiTool, IGridAiToolParams, IAiCardParams } from "@/interfaces/main";
import { EnAutoComplete, KoAutoComplete } from "@/lib/util/Main";
import { GridBox, GridItemWrap } from "@/components/ui/Grid";

const CoreSec = ({ aiTools }: { aiTools: any }) => {
  const [searchWord, setSearchWord] = useState<string>("");

  console.log("aiTools", aiTools);

  return (
    <section className=" content-section">
      <SearchBar searchWord={searchWord} setSearchWord={setSearchWord} />
      <div className="coreSec-itemBox">
        <CategorySelectBar />
        <GridAiTools arrAi={aiTools} searchWord={searchWord} />
      </div>
    </section>
  );
};

export default CoreSec;

const GridAiTools = ({ arrAi, searchWord }: IGridAiToolParams) => {
  const enPattern = /[a-zA-Z]/;
  const koPattern = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
  let filteredData: IAiTool[];

  if (enPattern.test(searchWord)) {
    filteredData = EnAutoComplete(searchWord, arrAi);
  } else if (koPattern.test(searchWord)) {
    filteredData = KoAutoComplete(searchWord, arrAi);
  } else {
    filteredData = arrAi || [];
  }

  console.log("filteredData:", filteredData);
  console.log("filteredData:", typeof filteredData);

  return (
    <div className="container">
      <GridBox>
        {filteredData.map((v, idx) => (
          <GridItemWrap key={idx} style={{ width: "270px" }}>
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
    <div style={{ textAlign: "center" }}>
      <img src={imgUrl} />
      <div>{id}</div>
      <div>{nameKo}</div>
      <div>{categoryKo}</div>
    </div>
  );
};

const SearchBar = ({ searchWord, setSearchWord }: any): JSX.Element => {
  const onChangeSearchWord = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(event.target.value);
  };

  return (
    <input
      id="searchWord"
      name="searchWord"
      type="text"
      className="coreSec-search"
      placeholder="이름, 용도, or 분야를 입력해주세요"
      value={searchWord}
      onChange={onChangeSearchWord}
    />
  );
};

const CategorySelectBar = (): JSX.Element => {
  return (
    <div className="coreSec-categoryBox">
      <div>All</div>
      <div>그림</div>
      <div>영상</div>
      <div>3D렌더링</div>
      <div>글쓰기</div>
      <div></div>
    </div>
  );
};
