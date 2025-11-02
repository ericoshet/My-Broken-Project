import { useCallback, useEffect, useState, type JSX } from "react";
import BookCard from "@/03-widgets/BookCard/ui/BookCard";
import { Button, Dropdown, Row } from "react-bootstrap";
import BookHookForm from "@/03-widgets/BookAddForm/ui/BookHookForm";
import { useAppDispatch, useAppSelector } from "@/06-shared/hooks/hooks";
import {
  deleteBookThunk,
  getAllBooksThunk,
} from "@/05-entities/book/redux/bookThunk";
import {
  sortedByCreatedDown,
  sortedByCreatedUp,
  sortedByTitle,
} from "@/05-entities/book/redux/bookSlice";

export function BooksPage(): JSX.Element {
  const [show, setShow] = useState<boolean>(false);
  const { status, user } = useAppSelector((state) => state.user);
  const booksArr = useAppSelector((state) => state.book.bookArr);
  const dispatch = useAppDispatch();

  const deleteHandler = async (id: number): Promise<void> => {
    const confirmed = window.confirm("Ты уверен, что хочешь этого?");
    if (confirmed) {
      dispatch(deleteBookThunk(id));
    }
  };

  const memoDeleteHandler = useCallback(deleteHandler, []);

  useEffect(() => {
    document.title = "Книги";
    dispatch(getAllBooksThunk());
  }, [dispatch]);

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle variant="outline-secondarys" id="dropdown-basic">
          Сортировка
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => dispatch(sortedByTitle())}>
            по алфавиту
          </Dropdown.Item>

          <Dropdown.Item onClick={() => dispatch(sortedByCreatedDown())}>
            недавно добавленные
          </Dropdown.Item>

          <Dropdown.Item onClick={() => dispatch(sortedByCreatedUp())}>
            давно добавленные
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <br />
      {status === "logged" && (
        <>
          <Button
            variant="outline-success"
            onClick={() => setShow((prev) => !prev)}
          >
            {show ? "Закрыть" : "Cоздать новую книгу"}
          </Button>
          <br />
          <br />
          <Row>
            {show && <BookHookForm />}
            <br />
          </Row>
        </>
      )}

      <Row>
        {booksArr.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            user={user}
            deleteHandler={memoDeleteHandler}
          />
        ))}
      </Row>
    </>
  );
}
