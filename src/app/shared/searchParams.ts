type SortDirection = "asc" | "desc";

type SearchParamsConstructorProps<Filter> = {
  page?: number | null;
  pageLimit?: number | null;
  sort?: string | null;
  sortDirection?: SortDirection | null;
  filter?: Filter | null;
};

type ToPrismaOutputProps = {
  skip: number;
  take: number;
  where?: any;
  orderBy?: { [key: string]: SortDirection };
};

const PAGE_DEFAULT = 1;
const PAGE_LIMIT_DEFAULT = 20;
const SORT_DEFAULT = "createdAt";
const SORT_DIRECTION_DEFAULT: SortDirection = "desc";
const FILTER_DEFAULT = null;

class SearchParams<Filter> {
  private _page: number = PAGE_DEFAULT;
  private _pageLimit: number = PAGE_LIMIT_DEFAULT;
  private _sort: string | null = SORT_DEFAULT;
  private _sortDirection: SortDirection = SORT_DIRECTION_DEFAULT;
  private _filter: Filter | null = FILTER_DEFAULT;

  constructor(props?: SearchParamsConstructorProps<Filter>) {
    this.page = props?.page ?? PAGE_DEFAULT;
    this.pageLimit = props?.pageLimit ?? PAGE_LIMIT_DEFAULT;
    this.sort = props?.sort ?? SORT_DEFAULT;
    this.sortDirection = props?.sortDirection ?? SORT_DIRECTION_DEFAULT;
    this.filter = props?.filter ?? null;
  }

  toPrisma(): ToPrismaOutputProps {
    let filter: ToPrismaOutputProps = {
      skip: (this._page - 1) * this._pageLimit,
      take: this._pageLimit,
    };

    if (this._filter) filter = { ...filter, where: this._filter };
    if (this._sort)
      filter = { ...filter, orderBy: { [this._sort]: this._sortDirection } };

    return filter;
  }

  toPrismaCount(): ToPrismaOutputProps {
    let filter: ToPrismaOutputProps = {
      skip: 0,
      take: 0,
    };

    if (this._filter) filter = { ...filter, where: this._filter };
    return filter;
  }

  get page() {
    return this._page;
  }

  get pageLimit() {
    return this._pageLimit;
  }

  get sort() {
    return this._sort;
  }

  get sortDirection() {
    return this._sortDirection;
  }

  get filter() {
    return this._filter;
  }

  protected set page(value: number) {
    if (Number.isNaN(value)) return;
    if (value <= 0) return;
    if (parseInt(value as any) !== value) return;
    this._page = value;
  }

  protected set pageLimit(value: number) {
    if (Number.isNaN(value)) return;
    if (value <= 0) return;
    if (parseInt(value as any) !== value) return;
    this._pageLimit = value;
  }

  protected set sort(value: string | null) {
    if (value === null) return;
    if (value === undefined) return;
    if (value === "") return;
    if (typeof value !== "string") return;
    this._sort = value?.trim() ?? SORT_DEFAULT;
  }

  protected set sortDirection(rawValue: SortDirection) {
    const value = String(rawValue).toLowerCase();
    if (value !== "asc" && value !== "desc") return;
    this._sortDirection = value;
  }

  protected set filter(value: Filter | null) {
    if (value === null) return;
    if (value === undefined) return;
    if ((value as unknown) === "") return;
    this._filter = value ?? FILTER_DEFAULT;
  }
}

export { SearchParams, PAGE_DEFAULT, PAGE_LIMIT_DEFAULT };
