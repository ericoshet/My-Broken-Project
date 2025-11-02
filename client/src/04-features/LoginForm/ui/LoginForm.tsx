import React, { type JSX } from "react";
import styles from "./LoginForm.module.css";
import { UserValidate } from "@/05-entities/user/api/UserValidate";
import type { IUserLoginData } from "@/05-entities/user/model";
import { AxiosError } from "axios";
import { loginAsyncThunk } from "@/05-entities/user/redux/userThunk";
import { useAppDispatch } from "@/06-shared/hooks/hooks";
import { useNavigate } from "react-router";

export default function LoginForm(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);

      const dataForApi: IUserLoginData = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      };

      const { isValid, error } = UserValidate.validateLogin(dataForApi);
      if (!isValid) return alert(error);

      dispatch(loginAsyncThunk(dataForApi));
      navigate("/");
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) alert(error?.response?.data.message);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={loginHandler}>
        <div className={styles.inputGroup}>
          <div className={styles.inputLabel}>Email</div>
          <input className={styles.input} name="email" type="email" required />
        </div>
        <div className={styles.inputGroup}>
          <div className={styles.inputLabel}>Пароль</div>
          <input
            className={styles.input}
            name="password"
            type="password"
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Подтвердить
        </button>
      </form>
    </div>
  );
}
