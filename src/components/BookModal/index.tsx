import { Modal, Empty, Button, Rate } from "antd";
import { IBookInfo } from "../../utils/types";
import { Listing } from "./Listing";
import styles from "./styles.module.scss";

interface BookModalProps {
  book: IBookInfo;
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
}

export function BookModal({ book, visible, onOk, onCancel }: BookModalProps) {
  const {
    title,
    authors,
    imageLinks,
    description,
    infoLink,
    categories,
    averageRating,
    publisher,
    subtitle,
    publishedDate,
    language,
    pageCount,
    ratingsCount,
  } = book;

  return (
    <Modal
      title={title}
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      bodyStyle={{ paddingTop: 5 }}
      zIndex={10}
    >
      <div className={styles.container}>
        <div>
          <span className={styles.container__ratings}>
            {ratingsCount && `(${ratingsCount})`}
          </span>
          <Rate disabled defaultValue={0} value={averageRating} allowHalf />
        </div>
      </div>
      <div className={styles.content}>
        {imageLinks ? (
          <img alt={title} src={imageLinks.thumbnail} height={150} />
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            className={styles.empty}
            imageStyle={{ width: "100%" }}
            description={
              <div style={{ color: "#666", textAlign: "center" }}>
                Sem imagem
              </div>
            }
          />
        )}
        <div style={{ padding: "0.3rem" }}>
          <span>
            <Listing
              subjects={subtitle}
              singular="Subtítulo"
              plural="Autores"
            />
            <Listing subjects={authors} singular="Autor(a)" plural="Autores" />
            <Listing subjects={publisher} singular="Editora" />
            <Listing subjects={publishedDate} singular="Data de Publicação" />
            <Listing subjects={language} singular="Linguagem" />
            <Listing subjects={pageCount} singular="Páginas" />
          </span>
        </div>
      </div>
      <p>
        <strong>Descrição: </strong>
        {description}
      </p>
      <span>
        <Listing
          subjects={categories}
          singular="Categoria"
          plural="Categorias"
        />
      </span>
      <div style={{ marginTop: 20 }}>
        {" "}
        <Button type="primary" href={infoLink} target="_blank">
          Ver na Google Store
        </Button>
      </div>
    </Modal>
  );
}
