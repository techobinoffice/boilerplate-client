import { Link } from "react-router-dom";
import "./index.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import { useLogin } from "../../services/mutations";
import { LoginType } from "../../types/user";

const LoginPage = () => {
  const { register, handleSubmit } = useForm<LoginType>();
  const { mutate, isPending } = useLogin();
  const onSubmit: SubmitHandler<LoginType> = async (data) => {
    mutate(data);
  };

  return (
    <section className="login_page">
      <div className="container mx-auto login__wrapper">
        <div className="grid md:grid-cols-2 grid-cols-1">
          <div className="offer">
            <img
              src="/assets/images/auth.svg"
              alt="login"
              decoding="async"
              loading="lazy"
            />
          </div>
          <div className="login">
            <h2>Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                placeholder="Email address"
                {...register("email", {
                  required: "Email is required",
                })}
                required
              />
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                required
                {...register("password", {
                  required: "Password is required",
                })}
              />
              <button type="submit" disabled={isPending}>
                {isPending ? "Loading" : "LOGIN"}
              </button>
            </form>
            <div className="links">
              <Link to="/register">Don't have an account? Register now</Link>
              <Link to="/forgot-password">Forgot your password?</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
