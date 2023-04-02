import { GridItemWrap, GridContainer } from "../../../components/Grid";
import AIINFO from "../../../assets/data/aiInfo.json";

const CoreSec = () => {
  return (
    <section className=" content-section">
      <input className="coreSec-search" />
      <div className="coreSec-itemBox">
        <div className="coreSec-categoryBox">
          <div>All</div>
          <div>그림</div>
          <div>영상</div>
          <div>3D렌더링</div>
          <div>글쓰기</div>
          <div></div>
        </div>
        <div className="container core-container">
          <GridContainer>
            {AIINFO.map((v) => (
              <GridItemWrap>
                <GridItemInner
                  id={v.id}
                  nameKo={v.ko?.name}
                  categoryKo={v.ko?.category}
                />
              </GridItemWrap>
            ))}
          </GridContainer>
        </div>
      </div>
    </section>
  );
};

// type Bilingual =
//   | {
//       ko: string;
//       en: string;
//     }
//   | { ko: string[]; en: string[] };

export interface AiCardProps {
  id: string | undefined;
  nameKo: string[] | string | undefined;
  categoryKo: string[] | string | undefined;
}

const GridItemInner = ({ id, nameKo, categoryKo }: AiCardProps) => {
  return <div>{id}</div>;
};

export default CoreSec;
