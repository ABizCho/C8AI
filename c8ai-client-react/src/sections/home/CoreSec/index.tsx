import { GridItemWrap, GridBox } from "../../../components/Grid";
import AIINFO from "../../../assets/data/aiInfo.json";

import { useEffect, useState } from "react";

interface AiDataType {
  id: string;
  imgUrl: string;
  ko: {
    name: string[];
    category: string[];
  };
  en: {
    name: string[];
    category: string[];
  };
}

interface AiCardProps {
  id: string | undefined;
  imgUrl: string;
  nameKo: string[] | string | undefined;
  categoryKo: string[] | string | undefined;
}

interface GridContainerProps {
  arrAi: AiDataType[];
  searchWord: String;
}

const CoreSec = () => {
  const [arrAi, setArrAi] = useState<AiDataType[]>([]);
  const [searchWord, setSearchWord] = useState<String>("");

  useEffect(() => {
    setArrAi(AIINFO as AiDataType[]);
    console.log(arrAi);
  }, []);

  return (
    <section className=" content-section">
      <SearchBar searchWord={searchWord} setSearchWord={setSearchWord} />
      <div className="coreSec-itemBox">
        <CategorySelectBar />
        <GridContainer arrAi={arrAi} searchWord={searchWord} />
      </div>
    </section>
  );
};

const GridContainer = ({ arrAi, searchWord }: GridContainerProps) => {
  const filteredAis = arrAi.filter((anAi) => {
    return anAi.id
      .replace(" ", "")
      .toLocaleLowerCase()
      .includes(searchWord.toLocaleLowerCase().replace(" ", ""));
  });
  return (
    <div className="container">
      <GridBox>
        {filteredAis.map((v, idx) => (
          <GridItemWrap key={idx}>
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
const AiGridItemInner = ({ id, imgUrl, nameKo, categoryKo }: AiCardProps) => {
  return (
    <>
      {/* <img src={imgUrl} /> */}
      <div>{id}</div>
      <div>{nameKo}</div>
      <div>{categoryKo}</div>
    </>
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

export default CoreSec;
