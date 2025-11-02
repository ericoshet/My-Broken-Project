import { useState, type JSX } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { BookApi } from "../../../05-entities/book/api/BookApi";
import type { IBook, IRawBook } from "../../../05-entities/book/model";

type Props = {
  setBookArr: React.Dispatch<React.SetStateAction<IBook[]>>;
};
export default function BookAddForm({ setBookArr }: Props): JSX.Element {
  const [input, setInput] = useState<IRawBook>({
    title: "",
    desc: "",
    pages: "",
    hasBeenRead: false,
    author: "",
    picture: "",
  });
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    BookApi.create(input)
      .then((res) => {
        if (res.data) {
          setBookArr((prev) => [res.data, ...prev]);
          setInput({
            title: "",
            desc: "",
            pages: "",
            hasBeenRead: false,
            author: "",
            picture: "",
          });
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <Form onSubmit={submitHandler}>
      <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-sm">Заголовок</InputGroup.Text>
        <Form.Control
          name="title"
          value={input.title}
          onChange={changeHandler}
        />
      </InputGroup>
      <br />
      <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">
          Описание
        </InputGroup.Text>
        <Form.Control name="desc" value={input.desc} onChange={changeHandler} />
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">Автор</InputGroup.Text>
        <Form.Control
          name="author"
          value={input.author}
          onChange={changeHandler}
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">
          Количество страниц
        </InputGroup.Text>
        <Form.Control
          name="pages"
          value={input.pages}
          onChange={changeHandler}
        />
      </InputGroup>

      <Button variant="success" type="submit">
        Добавить совет
      </Button>
    </Form>
  );
}
