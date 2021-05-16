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
              height: 80,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "1rem"
            }}
            imageStyle={{ width: "100%" }}
            description={<div style={{ paddingRight: '1rem', color: '#666'}}>Sem imagem</div>}
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
