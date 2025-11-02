import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import React, { type JSX } from "react";
import type { IBook } from "@/05-entities/book/model";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { CLIENT_ROUTES } from "@/06-shared/enums/client_routes";
import type { IUserDB } from "@/05-entities/user/model";

type Props = {
  book: IBook;
  user: IUserDB | null;
  deleteHandler: (id: number) => Promise<void>;
};

function BookCard({ book, user, deleteHandler }: Props): JSX.Element {
  const navigate = useNavigate();

  return (
    <Col xs={12} md={4}>
      <Card>
        <Card.Body>
          <Card.Title>{book.title}</Card.Title>
          <Card.Text>{book.author}</Card.Text>
          <Card.Img
            src={book.picture}
            alt="Book cover"
            style={{
              height: "550px",
              // width: '100%',
              objectFit: "cover",
              objectPosition: "center",
              marginBottom: "20px",
            }}
          />

          <Card.Text>{`${book.pages} страниц`}</Card.Text>
          <Card.Text>{book.desc}</Card.Text>

          {user?.id !== book.userId && (
            <>
              <Button
                variant="outline-primary"
                onClick={() => navigate(CLIENT_ROUTES.BOOKS + "/" + book.id)}
              >
                Узнать больше
              </Button>
            </>
          )}

          {user?.id === book.userId && (
            <>
              <Button
                variant="outline-success"
                onClick={() => navigate(CLIENT_ROUTES.BOOKS + "/" + book.id)}
              >
                Изменить данные
              </Button>
              <Button
                variant="outline-danger"
                onClick={() => deleteHandler(Number(book.id))}
              >
                Удалить книгу
              </Button>
            </>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
}

export default React.memo(BookCard);
