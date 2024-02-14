import { AuthToken, Status, User } from "tweeter-shared";
import { useState, useRef, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useToastListener from "../toaster/ToastListenerHook";
import StatusItem from "../statusItem/StatusItem";
import useUserInfoHook from "../userInfo/UserInfoHook";
import { FEED_PAGE_SIZE } from "../../presenter/status/FeedPresenter";
import {
  StatusItemPresenter,
  StatusItemView,
} from "../../presenter/status/StatusPresenter";

interface Props {
  presenterGenerator: (view: StatusItemView) => StatusItemPresenter;
}

function StatusItemScroller(props: Props) {
  const { displayErrorMessage } = useToastListener();
  const [statusItems, setStatusItems] = useState<Status[]>([]);
  const listener: StatusItemView = {
    addItems(newItems: Status[]) {
      setStatusItems([...statusItems, ...newItems]);
    },
    displayErrorMessage: displayErrorMessage,
  };
  const [presenter] = useState<StatusItemPresenter>(
    props.presenterGenerator(listener)
  );

  // Required to allow the addItems method to see the current value of 'items'
  // instead of the value from when the closure was created.
  const statusItemsReference = useRef(statusItems);
  statusItemsReference.current = statusItems;

  const { displayedUser, authToken } = useUserInfoHook();

  // Load initial status items
  useEffect(() => {
    loadMoreStatusItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadMoreStatusItems() {
    presenter.loadMoreItems(authToken!, displayedUser!);
  }

  return (
    <div className="container px-0 overflow-visible vh-100">
      <InfiniteScroll
        className="pr-0 mr-0"
        dataLength={statusItems.length}
        next={loadMoreStatusItems}
        hasMore={presenter.hasMoreItems}
        loader={<h4>Loading...</h4>}
      >
        {statusItems.map((item, index) => (
          <StatusItem status={item} key={index} />
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default StatusItemScroller;
