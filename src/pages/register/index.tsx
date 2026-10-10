import { Link } from "react-router-dom";
import "./index.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRegister } from "../../services/mutations";
import { UserField } from "../../types/user";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserField>();
  const { mutate, isPending } = useRegister();
  const onSubmit: SubmitHandler<UserField> = async (data) => {
    mutate(data);
  };

  return (
    <section className="register_page">
      <div className="container mx-auto register__wrapper">
        <div className="grid md:grid-cols-2 grid-cols-1">
          <div className="offer">
            <img
              src="/assets/images/auth.svg"
              alt="register"
              decoding="async"
              loading="lazy"
            />
          </div>
          <div className="login">
            <h2>Register</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Name"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="error">{errors.name.message}</p>
              )}
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                placeholder="Email address"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="error">{errors.email.message}</p>
              )}
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="error">
                  {errors.password.message}
                </p>
              )}
              <label htmlFor="confirm_password">Confirm Password</label>
              <input
                id="confirm_password"
                type="password"
                placeholder="Password"
                {...register("confirmPassword", {
                  required: "Confirm your password",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <p className="error">
                  {errors.confirmPassword.message}
                </p>
              )}
              <button type="submit" disabled={isPending}>
                {isPending ? "Loading" : "REGISTER"}
              </button>
            </form>
            <div className="links">
              <Link to="/login">Already have an account? Login</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
