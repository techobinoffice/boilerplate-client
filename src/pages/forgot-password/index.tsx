import { Link } from "react-router-dom";
import "../login/index.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import { useForgotPassword } from "../../services/mutations";

type ForgotPasswordField = {
  email: string;
};

const ForgotPasswordPage = () => {
  const { register, handleSubmit, reset } = useForm<ForgotPasswordField>();
  const { mutate, isPending } = useForgotPassword();
  const onSubmit: SubmitHandler<ForgotPasswordField> = async (data) => {
    mutate(data, { onSuccess: () => reset() });
  };

  return (
    <section className="login_page">
      <div className="container mx-auto login__wrapper">
        <div className="grid md:grid-cols-2 grid-cols-1">
          <div className="offer">
            <img
              src="/assets/images/auth.svg"
              alt="forgot password"
              decoding="async"
              loading="lazy"
            />
          </div>
          <div className="login">
            <h2>Forgot password</h2>
            <p>Enter your email and we will send you a reset link.</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                placeholder="Email address"
                {...register("email", { required: "Email is required" })}
                required
              />
              <button type="submit" disabled={isPending}>
                {isPending ? "Loading" : "SEND RESET LINK"}
              </button>
            </form>
            <div className="links">
              <Link to="/login">Back to login</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPasswordPage;
