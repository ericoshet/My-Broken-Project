// import BookAddForm from "@/03-widgets/BookAddForm/ui/BookAddForm";
// import BookCard from "@/03-widgets/BookCard/ui/BookCard";
// import { BookApi } from "@/05-entities/book/api/BookApi";
// import type { IBook } from "@/05-entities/book/model";
// import { useEffect, useState, type JSX } from "react";
// import { Row } from "react-bootstrap";
// import { useParams } from "react-router";

// export function AccountPage(): JSX.Element {
//   const { id } = useParams();
//   const [bookArr, setBookArr] = useState<IBook[]>([]);

//   useEffect(() => {
//     if (!id) return;
//     BookApi.getAllBooksByUserId(+id)
//       .then((res) => {
//         if (res.data) setBookArr(res.data);
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   return (
//     <div>
//       <Row>
//         <BookAddForm setBookArr={setBookArr} />
//       </Row>
//       <br />
//       <Row>
//         {bookArr.map((book) => {
//           return <BookCard key={book.id} book={book} />;
//         })}
//       </Row>
//     </div>
//   );
// }
