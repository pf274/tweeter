import { useContext } from "react";
import { UserInfoContext } from "../userInfo/UserInfoProvider";
import { AuthToken, FakeData, Status, User } from "tweeter-shared";
import { useState, useRef, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useToastListener from "../toaster/ToastListenerHook";
import StatusItem from "../statusItem/StatusItem";

export const PAGE_SIZE = 10;

const FeedScroller = () => {
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

  const { displayedUser, setDisplayedUser, currentUser, authToken } =
    useContext(UserInfoContext);

  // Load initial status items
  useEffect(() => {
    loadMoreStatusItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadMoreStatusItems() {
    try {
      if (hasMoreItems) {
        let [newItems, hasMore] = await loadMoreFeedItems(
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

  async function loadMoreFeedItems(authToken: AuthToken, user: User, pageSize: number, lastItem: Status | null): Promise<[Status[], boolean]> {
    // TODO: Replace with the result of calling server
    return FakeData.instance.getPageOfStatuses(lastItem, pageSize);
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
};

export default FeedScroller;
