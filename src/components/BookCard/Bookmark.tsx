import { Tooltip, Button } from "antd";
import { FaBookmark } from "react-icons/fa";
import { IBookmark } from "../../utils/types";
import styles from "./styles.module.scss";

interface BookMarkProps {
  item: IBookmark;
  onClick: (item: IBookmark) => void;
  marked?: boolean;
}

export function BookMark({ item, onClick, marked = false }: BookMarkProps) {
  return (
    <div className={styles.bookmark}>
      <Tooltip
        title={marked ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      >
        <Button
          className={
            marked
              ? styles.bookmark__button_marked
              : styles.bookmark__button_unmarked
          }
          onClick={() => onClick(item)}
        >
          <FaBookmark />
        </Button>
      </Tooltip>
    </div>
  );
}
