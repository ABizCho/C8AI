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
}

export interface IAiCardParams {
  id: string | undefined;
  imgUrl: string;
  nameKo: string[] | string | undefined;
  categoryKo: string[] | string | undefined;
}

export interface IGridAiToolParams {
  arrAi: IAiTool[];
  searchWord: string;
}
