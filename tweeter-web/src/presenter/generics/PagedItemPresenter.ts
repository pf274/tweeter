import { AuthToken, User } from "tweeter-shared";
import { Presenter, View } from "./Presenter";

export interface PagedItemView<ItemType> extends View {
  addItems: (newItems: ItemType[]) => void;
}

export abstract class PagedItemPresenter<
  ItemType,
  ServiceType
> extends Presenter {
  protected service: ServiceType;
  private _hasMoreItems: boolean = true;
  private _lastItem: ItemType | null = null;

  protected constructor(view: PagedItemView<ItemType>) {
    super(view);
    this.service = this.createService();
  }

  public set hasMoreItems(value: boolean) {
    this._hasMoreItems = value;
  }

  public get hasMoreItems(): boolean {
    return this._hasMoreItems;
  }

  protected set lastItem(value: ItemType | null) {
    this._lastItem = value;
  }

  protected get lastItem(): ItemType | null {
    return this._lastItem;
  }

  protected abstract createService(): ServiceType;

  public addItems(newItems: ItemType[]): void {
    this.view.addItems(newItems);
  }

  protected get view(): PagedItemView<ItemType> {
    return super.view as PagedItemView<ItemType>;
  }

  /**
   * Loads more items from the service and adds them to the view.
   * @param authToken
   * @param displayedUser
   * @param pageSize
   * @param intent
   * @param getMoreItems
   */
  public async itemLoad(
    authToken: AuthToken,
    displayedUser: User,
    pageSize: number,
    intent: string,
    getMoreItems: (
      authToken: AuthToken,
      displayedUser: User,
      pageSize: number,
      lastItem: ItemType | null
    ) => Promise<[newItems: ItemType[], hasMore: boolean]>
  ): Promise<void> {
    this.doFailureReportingOperation(async () => {
      if (!this.hasMoreItems) {
        return;
      }
      let [newItems, hasMore] = await getMoreItems(
        authToken,
        displayedUser,
        pageSize,
        this.lastItem
      );

      this.hasMoreItems = hasMore;
      this.lastItem = newItems[newItems.length - 1];
      this.view.addItems(newItems);
    }, intent);
  }

  /**
   * Abstract method to Load more items from the service and add them to the view.
   * @param authToken
   * @param displayedUser
   */
  public abstract loadMoreItems(
    authToken: AuthToken,
    displayedUser: User
  ): Promise<void>;
}
