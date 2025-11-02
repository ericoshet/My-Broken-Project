import { type JSX } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "../Layout/Layout";
import { LoginPage, OneBookPage, SignUpPage } from "@/02-pages";
import { CLIENT_ROUTES } from "@/06-shared/enums/client_routes";
import { BooksPage } from "@/02-pages/BooksPage/ui/BooksPage";
import ProtectedRouter from "@/06-shared/HOCs/ProtectedRouter/ui/ProtectedRouter";
import { useAppSelector } from "@/06-shared/hooks/hooks";
import { MainPage } from "@/02-pages/MainPage/ui/MainPage";
import { EditBookPage } from "@/02-pages/EditBookPage/ui/EditBookPage";

export default function Router(): JSX.Element {
  const status = useAppSelector((state) => state.user.status);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path={CLIENT_ROUTES.MAIN_PAGE} element={<MainPage />} />
          <Route path={CLIENT_ROUTES.BOOKS} element={<BooksPage />} />

          <Route
            element={
              <ProtectedRouter
                isAllowed={status !== "logged"}
                redirectTo={CLIENT_ROUTES.MAIN_PAGE}
              />
            }
          ></Route>

          <Route path={CLIENT_ROUTES.SIGN_UP} element={<SignUpPage />} />
          <Route path={CLIENT_ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={CLIENT_ROUTES.ONEBOOK} element={<OneBookPage />} />
          <Route path={CLIENT_ROUTES.EDIT_BOOK_PAGE} element={<EditBookPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
