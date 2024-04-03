import { useEffect, useRef, useState } from "react";
import { PagedItemPresenter, PagedItemView } from "../../presenter/generics/PagedItemPresenter";
import useToastListener from "../toaster/ToastListenerHook";
import useUserInfoHook from "../userInfo/UserInfoHook";
import InfiniteScroll from "react-infinite-scroll-component";
import { Status, User } from "tweeter-shared";
import { FollowService } from "../../model/service/FollowService";
import { StatusService } from "../../model/service/StatusService";

export interface ItemScrollerProps<
  ItemType extends Status | User,
  ServiceType extends FollowService | StatusService
> {
  presenterGenerator: (view: PagedItemView<ItemType>) => PagedItemPresenter<ItemType, ServiceType>;
  ItemComponent: (props: { value: ItemType }) => JSX.Element;
}

export function ItemScroller<
  ItemType extends Status | User,
  ServiceType extends FollowService | StatusService
>(props: ItemScrollerProps<ItemType, ServiceType>) {
  const { displayErrorMessage } = useToastListener();
  const [items, setItems] = useState<ItemType[]>([]);

  // Required to allow the addItems method to see the current value of 'items'
  // instead of the value from when the closure was created.
  const itemsReference = useRef(items);
  itemsReference.current = items;

  const listener: PagedItemView<ItemType> = {
    addItems(newItems: ItemType[]) {
      setItems([...itemsReference.current, ...newItems]);
    },
    displayErrorMessage: displayErrorMessage,
  };
  const [presenter] = useState<PagedItemPresenter<ItemType, ServiceType>>(
    props.presenterGenerator(listener)
  );

  const { displayedUser, authToken } = useUserInfoHook();

  // Load initial status items
  useEffect(() => {
    loadMoreItems();
  }, [loadMoreItems]);

  async function loadMoreItems() {
    presenter.loadMoreItems(authToken!, displayedUser!);
  }

  return (
    <div className="container px-0 overflow-visible vh-100">
      <InfiniteScroll
        className="pr-0 mr-0"
        dataLength={items.length}
        next={loadMoreItems}
        hasMore={presenter.hasMoreItems}
        loader={<h4>Loading...</h4>}
      >
        {items.map((item, index) => (
          <props.ItemComponent value={item} key={index} />
        ))}
      </InfiniteScroll>
    </div>
  );
}
