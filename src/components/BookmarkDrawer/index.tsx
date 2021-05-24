import { Drawer, Empty } from "antd";
import { IBookmark } from "../../utils/types";
import { DrawerCard } from "./DrawerCard";

export function BookmarkDrawer({
  onClose,
  visible,
  bookmarks,
  showModal,
  removeBookmark,
}) {
  if (bookmarks.length === 0) {
    return (
      <Drawer
        title="Favoritados"
        placement="right"
        onClose={onClose}
        visible={visible}
        zIndex={9}
      >
        <Empty
          description={
            <span style={{ color: "#666" }}>Ué!?</span>
          }
        />
      </Drawer>
    );
  }

  return (
    <Drawer
      title="Favoritados"
      placement="right"
      onClose={onClose}
      visible={visible}
      zIndex={9}
    >
      {bookmarks.map((book: IBookmark) => (
        <DrawerCard
          bookmark={book}
          showModal={showModal}
          key={book.id}
          removeBookmark={removeBookmark}
        />
      ))}
    </Drawer>
  );
}
