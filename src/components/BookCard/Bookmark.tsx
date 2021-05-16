import { Tooltip, Button } from "antd";
import { FaBookmark } from "react-icons/fa";
import { IBookmark } from "../../utils/types";
import { volcano } from "@ant-design/colors";

interface BookMarkProps {
  item: IBookmark;
  onClick: (item: IBookmark) => void;
  marked?: boolean;
}

export function BookMark({ item, onClick, marked = false }: BookMarkProps) {
  return (
    <div style={{ position: "absolute", top: 5, right: 5, zIndex: 1 }}>
      <Tooltip
        title={marked ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      >
        <Button
          style={{
            border: "none",
            backgroundColor: "transparent",
            boxShadow: "none",
            padding: 0,
            fontSize: "2rem",
            color: marked ? volcano[5] : "#bbbbbb",
          }}
          onClick={() => onClick(item)}
        >
          <FaBookmark />
        </Button>
      </Tooltip>
    </div>
  );
}
