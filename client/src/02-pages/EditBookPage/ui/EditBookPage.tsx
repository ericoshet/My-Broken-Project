import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Button, Card, Form } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "@/06-shared/hooks/hooks";
import {
  getOneBookThunk,
  updateBookThunk,
} from "@/05-entities/book/redux/bookThunk";
import type { IUpdateBookPayload } from "@/05-entities/book/model";

export function EditBookPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const currentBook = useAppSelector((state) => state.book.currentBook);
  const loading = useAppSelector((state) => state.book.loading);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    desc: "",
    pages: "",
    picture: "",
    hasBeenRead: false,
  });

  useEffect(() => {
    if (id) {
      dispatch(getOneBookThunk(Number(id)));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (currentBook) {
      setFormData({
        title: currentBook.title || "",
        author: currentBook.author || "",
        desc: currentBook.desc || "",
        pages: currentBook.pages?.toString() || "",
        picture: currentBook.picture || "",
        hasBeenRead: currentBook.hasBeenRead || false,
      });
    }
  }, [currentBook]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !currentBook) return;

    const payload: IUpdateBookPayload = {
      id: currentBook.id,
      title: formData.title || undefined,
      author: formData.author || undefined,
      desc: formData.desc || undefined,
      pages: formData.pages || undefined,
      picture: formData.picture || undefined,
      hasBeenRead: formData.hasBeenRead,
    };

    dispatch(updateBookThunk(payload)).then((action) => {
      if (updateBookThunk.fulfilled.match(action)) {
        navigate(`/books/${currentBook.id}`);
      }
    });
  };

  if (loading && !currentBook) {
    return <div className="text-center mt-5">Загрузка...</div>;
  }

  if (!currentBook) {
    return <div className="text-center mt-5">Книга не найдена</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        minHeight: "100vh",
        paddingTop: "40px",
        paddingBottom: "40px",
      }}
    >
      <Card
        style={{ width: "600px", padding: "20px", boxSizing: "border-box" }}
      >
        <Card.Title>Редактирование книги</Card.Title>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Название</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Автор</Form.Label>
            <Form.Control
              type="text"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Описание</Form.Label>
            <Form.Control
              as="textarea"
              name="desc"
              rows={4}
              value={formData.desc}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Количество страниц</Form.Label>
            <Form.Control
              type="number"
              name="pages"
              value={formData.pages}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>URL-картинки</Form.Label>
            <Form.Control
              type="text"
              name="picture"
              value={formData.picture}
              onChange={handleInputChange}
            />
          </Form.Group>

          {/* <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              name="hasBeenRead"
              label="Прочитана"
              checked={formData.hasBeenRead}
              onChange={handleInputChange}
            />
          </Form.Group> */}

          <div className="d-flex gap-2">
            <Button variant="success" type="submit" disabled={loading}>
              {loading ? "Сохранение..." : "Сохранить"}
            </Button>
            <Button variant="secondary" onClick={() => navigate(-1)}>
              Отмена
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}
