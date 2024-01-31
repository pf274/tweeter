import { AuthToken, Status, User } from "tweeter-shared";
import { useState, useRef, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useToastListener from "../toaster/ToastListenerHook";
import StatusItem from "../statusItem/StatusItem";
import useUserInfoHook from "../userInfo/UserInfoHook";

export const PAGE_SIZE = 10;

interface Props {
  loadItems: (
    authToken: AuthToken,
    user: User,
    pageSize: number,
    lastItem: Status | null
  ) => Promise<[Status[], boolean]>;
}

function StatusItemScroller(props: Props) {
  const { displayErrorMessage } = useToastListener();
  const [statusItems, setStatusItems] = useState<Status[]>([]);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [lastItem, setLastItem] = useState<Status | null>(null);

  // Required to allow the addItems method to see the current value of 'items'
  // instead of the value from when the closure was created.
  const statusItemsReference = useRef(statusItems);
  statusItemsReference.current = statusItems;

  const addItems = (newStatusItems: Status[]) =>
    setStatusItems([...statusItemsReference.current, ...newStatusItems]);

  const { displayedUser, authToken } = useUserInfoHook();

  // Load initial status items
  useEffect(() => {
    loadMoreStatusItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadMoreStatusItems() {
    try {
      if (hasMoreItems) {
        let [newItems, hasMore] = await props.loadItems(
          authToken!,
          displayedUser!,
          PAGE_SIZE,
          lastItem
        );

        setHasMoreItems(hasMore);
        setLastItem(newItems[newItems.length - 1]);
        addItems(newItems);
      }
    } catch (error) {
      displayErrorMessage(`Failed to load feed items because of exception: ${error}`);
    }
  }

  return (
    <div className="container px-0 overflow-visible vh-100">
      <InfiniteScroll
        className="pr-0 mr-0"
        dataLength={statusItems.length}
        next={loadMoreStatusItems}
        hasMore={hasMoreItems}
        loader={<h4>Loading...</h4>}
      >
        {statusItems.map((item, index) => <StatusItem status={item} key={index} />)}
      </InfiniteScroll>
    </div>
  );
}


export default StatusItemScroller;