import { Link, useSearchParams } from "react-router-dom";
import "../login/index.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import { useResetPassword } from "../../services/mutations";
import { ResetPasswordField } from "../../types/user";

const ResetPasswordPage = () => {
  // the api mails a link like /reset-password?token=...
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordField>();
  const { mutate, isPending } = useResetPassword();
  const onSubmit: SubmitHandler<ResetPasswordField> = async (data) => {
    mutate({ token, newPassword: data.newPassword });
  };

  return (
    <section className="login_page">
      <div className="container mx-auto login__wrapper">
        <div className="grid md:grid-cols-2 grid-cols-1">
          <div className="offer">
            <img
              src="/assets/images/auth.svg"
              alt="reset password"
              decoding="async"
              loading="lazy"
            />
          </div>
          <div className="login">
            <h2>Reset password</h2>
            {token ? (
              <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="new_password">New password</label>
                <input
                  id="new_password"
                  type="password"
                  placeholder="New password"
                  {...register("newPassword", {
                    required: "New password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                {errors.newPassword && (
                  <p className="error">
                    {errors.newPassword.message}
                  </p>
                )}
                <label htmlFor="confirm_password">Confirm password</label>
                <input
                  id="confirm_password"
                  type="password"
                  placeholder="Confirm password"
                  {...register("confirmPassword", {
                    required: "Confirm your password",
                    validate: (value) =>
                      value === watch("newPassword") ||
                      "Passwords do not match",
                  })}
                />
                {errors.confirmPassword && (
                  <p className="error">
                    {errors.confirmPassword.message}
                  </p>
                )}
                <button type="submit" disabled={isPending}>
                  {isPending ? "Loading" : "RESET PASSWORD"}
                </button>
              </form>
            ) : (
              <p>This reset link is not valid. Request a new one.</p>
            )}
            <div className="links">
              <Link to="/login">Back to login</Link>
              <Link to="/forgot-password">Send a new link</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPasswordPage;
