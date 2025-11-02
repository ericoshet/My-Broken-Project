import { useEffect, type JSX } from "react";
import Router from "./Router/Router";
import { useAppDispatch } from "@/06-shared/hooks/hooks";
import { refreshAsyncThunk } from "@/05-entities/user/redux/userThunk";

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(refreshAsyncThunk());
  }, [dispatch]);

  return (
    <>
      <Router />
    </>
  );
}

export default App;
