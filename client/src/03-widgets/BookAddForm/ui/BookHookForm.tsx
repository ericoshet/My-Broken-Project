import type { IRawBook } from "@/05-entities/book/model";
import type { JSX } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { createBookThunk } from "@/05-entities/book/redux/bookThunk";
import { useAppDispatch } from "@/06-shared/hooks/hooks";

export default function BookHookForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IRawBook>({
    defaultValues: {
      title: "",
      desc: "",
      pages: "",
      hasBeenRead: false,
      author: "",
      picture: "",
    },
    mode: "onTouched",
  });

  const onSubmit = async (data: IRawBook): Promise<void> => {
    try {
      dispatch(createBookThunk(data));
      reset({
        title: "",
        desc: "",
        pages: "",
        hasBeenRead: false,
        author: "",
        picture: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-sm">
          Название книги
        </InputGroup.Text>
        <Form.Control
          {...register("title", {
            required: "Укажите название книги",
            minLength: { value: 2, message: "Минимум 2 символа" },
          })}
          isInvalid={!!errors.title}
        />
        <Form.Control.Feedback type="invalid">
          {errors.title?.message}
        </Form.Control.Feedback>
      </InputGroup>
      <br />

      <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-sm">Автор книги</InputGroup.Text>
        <Form.Control
          {...register("author", {
            required: "Укажите автора книги",
            minLength: { value: 2, message: "Минимум 2 символа" },
          })}
          isInvalid={!!errors.author}
        />
        <Form.Control.Feedback type="invalid">
          {errors.author?.message}
        </Form.Control.Feedback>
      </InputGroup>
      <br />

      <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-sm">
          Количество страниц
        </InputGroup.Text>
        <Form.Control
          {...register("pages", {
            required: "Укажите количество страниц",
            // minLength: { value: 2, message: "Минимум 2 символа" },
          })}
          isInvalid={!!errors.pages}
        />
        <Form.Control.Feedback type="invalid">
          {errors.pages?.message}
        </Form.Control.Feedback>
      </InputGroup>
      <br />

      <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-sm">
          URL-изображения
        </InputGroup.Text>
        <Form.Control
          {...register("picture", {
            required: "URL-изображения",
            // minLength: { value: 2, message: "Минимум 2 символа" },
          })}
          isInvalid={!!errors.picture}
        />
        <Form.Control.Feedback type="invalid">
          {errors.picture?.message}
        </Form.Control.Feedback>
      </InputGroup>
      <br />

      <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">
          Описание книги
        </InputGroup.Text>
        <Form.Control
          as="textarea"
          rows={3}
          {...register("desc", {
            required: "Добавьте описание",
            minLength: { value: 5, message: "Минимум 5 символов" },
          })}
          isInvalid={!!errors.desc}
        />
        <Form.Control.Feedback type="invalid">
          {errors.desc?.message}
        </Form.Control.Feedback>
      </InputGroup>

      <Button variant="outline-success" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Сохраняю..." : "Добавить книгу"}
      </Button>
      <br />
      <br />
    </Form>
  );
}
