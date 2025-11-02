import { type JSX } from "react";
import { NavLink } from "react-router";
import UserCard from "@/05-entities/user/ui/UserCard";
import { CLIENT_ROUTES } from "@/06-shared/enums/client_routes";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useAppDispatch, useAppSelector } from "@/06-shared/hooks/hooks";
import { logoutAsyncThunk } from "@/05-entities/user/redux/userThunk";

export default function Navigation(): JSX.Element {
  const { user, status } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();
  const logoutHandler = async (): Promise<void> => {
    try {
      dispatch(logoutAsyncThunk());
    } catch (error) {
      console.log(error);
    }
  };

  console.log(user);

  return (
    <Navbar bg="light" data-bs-theme="light">
      <Container>
        <Navbar.Brand>
          {user.status === "logged" ? `Привет, ${user?.name}` : `Привет, Гость`}
        </Navbar.Brand>
        <Nav className="me-auto">
          <NavLink to={CLIENT_ROUTES.MAIN_PAGE} className="nav-link">
            Главная
          </NavLink>

          <NavLink to={CLIENT_ROUTES.BOOKS} className="nav-link">
            Книги
          </NavLink>

          {/* {user.status === "logged" && (<>
          <NavLink to={CLIENT_ROUTES.ACCOUNT} className="nav-link">
            Личный кабинет
          </NavLink>
          </>
          )} */}
        </Nav>
        {status !== "logged" && (
          <>
            <NavLink
              to={CLIENT_ROUTES.LOGIN}
              className="nav-link"
              style={{ marginRight: "15px" }}
            >
              Вход
            </NavLink>
            <NavLink
              to={CLIENT_ROUTES.SIGN_UP}
              className="nav-link"
              style={{ marginRight: "5px" }}
            >
              Регистрация
            </NavLink>
          </>
        )}

        {status === "logged" && (
          <>
            <UserCard />
            <Button variant="dark" onClick={logoutHandler}>
              Выход
            </Button>
          </>
        )}
      </Container>
    </Navbar>
  );
}
