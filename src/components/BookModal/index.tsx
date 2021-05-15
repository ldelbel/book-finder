import { Modal, Empty, Button, Rate } from "antd";
import { Listing } from "./Listing";

export function BookModal({ book, visible, onOk, onCancel }) {
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
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "0.5rem",
        }}
      >
        <div>
          <span style={{ marginRight: '1rem', color: '#bebebe'}}>{ratingsCount && `(${ratingsCount})`}</span>
          <Rate disabled defaultValue={0} value={averageRating} allowHalf />
        </div>
      </div>
      <div
        style={{
          backgroundColor: "#f0f0f0",
          marginBottom: "2rem",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {imageLinks ? (
          <img alt={title} src={imageLinks.thumbnail} height={150} />
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            style={{
              height: 150,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            imageStyle={{ width: "80%" }}
          />
        )}
        <div style={{ padding: "0.3rem" }}>
          <span>
            <Listing
              subjects={subtitle}
              singular="Subtítulo"
              plural="Autores"
            />
            <Listing subjects={authors} singular="Autor" plural="Autores" />
            <Listing subjects={publisher} singular="Editor" />
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
