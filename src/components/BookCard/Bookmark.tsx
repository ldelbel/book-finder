import { Tooltip, Button } from "antd";
import { BookFilled } from "@ant-design/icons";
import { IBookmark } from "../../utils/types";
import { geekblue } from "@ant-design/colors";

interface BookMarkProps {
  item: IBookmark;
  onClick: (item: IBookmark) => void;
  marked?: boolean;
}

export function BookMark({ item, onClick, marked = false }: BookMarkProps) {
  return (
    <div style={{ position: "absolute", top: 5, right: 5, zIndex: 1 }}>
      <Tooltip title={marked ? "Remover dos favoritos" : "Adicionar aos favoritos"}>
        <Button
          style={{
            border: "none",
            backgroundColor: "transparent",
            boxShadow: "none",
            padding: 0,
          }}
          onClick={() => onClick(item)}
        >
          <BookFilled
            style={{
              fontSize: "2rem",
              color: marked ? geekblue[4] : "#bbbbbb",
            }}
          />
        </Button>
      </Tooltip>
    </div>
  );
}
