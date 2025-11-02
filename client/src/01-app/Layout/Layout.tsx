import Navigation from "../../03-widgets/Navigation/ui/Navigation";
import { type JSX } from "react";
import Container from "react-bootstrap/Container";
import { Outlet } from "react-router";
import Loader from "@/06-shared/HOCs/Loader/ui/Loader";
import { useAppSelector } from "@/06-shared/hooks/hooks";

export default function Layout(): JSX.Element {
  const status = useAppSelector((state) => state.user.status);
  return (
    <Loader isLoading={status === "logging"}>
      <Container>
        <Navigation />
        <br />
        <Outlet />
      </Container>
    </Loader>
  );
}
