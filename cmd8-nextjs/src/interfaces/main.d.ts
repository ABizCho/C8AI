export interface IAiTool {
  [x: string]: any;
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
  score: {
    avg: number;
    cnt: number;
  };
}

export interface IAiCardParams {
  id: string | undefined;
  imgUrl: string;
  nameKo: string[] | string;
  categoryKo: string[] | string | undefined;
  score: {
    avg: number;
    cnt: number;
  };
}

export interface IGridAiToolParams {
  arrAi: IAiTool[];
  searchWord: string;
}
