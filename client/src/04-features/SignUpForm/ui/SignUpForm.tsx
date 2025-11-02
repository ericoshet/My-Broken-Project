import type { IUserSignUpData } from "@/05-entities/user/model";
import { AxiosError } from "axios";
import { type JSX } from "react";
import { UserValidate } from "@/05-entities/user/api/UserValidate";
import styles from "./SignUpForm.module.css";
import { useAppDispatch } from "@/06-shared/hooks/hooks";
import { signupAsyncThunk } from "@/05-entities/user/redux/userThunk";
import { useNavigate } from "react-router";

export default function SignUpForm(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const signUpHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);
      const dataForApi: IUserSignUpData = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      };
      const { isValid, error } = UserValidate.validateSignup(dataForApi);
      if (!isValid) return alert(error);


      dispatch(signupAsyncThunk(dataForApi));
      navigate("/");
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) alert(error?.response?.data.message);
    }
  };
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={signUpHandler}>
        <div className={styles.inputGroup}>
          <div className={styles.inputLabel}>Имя</div>
          <input className={styles.input} name="name" type="text" required />
        </div>
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
        <div className={styles.inputGroup}>
          <div className={styles.inputLabel}>Повтор пароля</div>
          <input
            className={styles.input}
            name="confirmPassword"
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
