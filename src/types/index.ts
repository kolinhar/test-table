export type StrOrNum = string | number;
export interface TitleObject {
  name: StrOrNum;
  sortable?: boolean;
  fctSort?: Function;
}

export type HeaderTitle = StrOrNum | TitleObject;
