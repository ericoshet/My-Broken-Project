import {
  deleteBookThunk,
  getOneBookThunk,
} from "@/05-entities/book/redux/bookThunk";
import { useAppDispatch, useAppSelector } from "@/06-shared/hooks/hooks";
import { useEffect, type JSX } from "react";
import { Button, ButtonGroup, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";

export function OneBookPage(): JSX.Element {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const currentBook = useAppSelector((state) => state.book.currentBook);
  const currentUser = useAppSelector((state) => state.user.user);

  useEffect(() => {
    if (id) {
      dispatch(getOneBookThunk(Number(id)));
    }
  }, [id, dispatch]);

  const deleteHandler = async () => {
    if (id) {
      dispatch(deleteBookThunk(Number(id)));
      navigate(-1);
    }
  };

  if (!currentBook) {
    return <div>Загрузка...</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        margin: 0,
        padding: 0,
      }}
    >
      <>
        <Card
          style={{ width: "50%", padding: "20px", boxSizing: "border-box" }}
        >
          <br />
          <Card.Text>
            {" "}
            Книгу предоставил пользователь:{" "}
            {currentBook?.User?.name
              ? currentBook?.User?.name
              : "Неизвестно"}{" "}
          </Card.Text>
          <Card.Title> {currentBook?.title}</Card.Title>
          <Card.Text>{currentBook?.author}</Card.Text>
          <Card.Img variant="top" src={currentBook?.picture} />
          <Card.Body>
            <Card.Text>{currentBook?.pages} страниц</Card.Text>
            <Card.Text>{currentBook?.desc}</Card.Text>

            <>
              <ButtonGroup aria-label="Basic example">
                <Button
                  variant="outline-primary"
                  onClick={() => navigate("/books")}
                >
                  Назад
                </Button>

                {currentUser?.id === currentBook.userId && (
                  <>
                    <Button
                      variant="outline-success"
                      onClick={() => navigate(`/book/${currentBook.id}/edit`)}
                    >
                      Изменить
                    </Button>
                    <Button variant="outline-danger" onClick={deleteHandler}>
                      Удалить
                    </Button>
                  </>
                )}
              </ButtonGroup>
            </>
          </Card.Body>
        </Card>
      </>
    </div>
  );
}
