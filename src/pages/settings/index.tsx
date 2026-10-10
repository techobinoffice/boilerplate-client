import { useForm } from "react-hook-form";
import { useChangePassword } from "../../services/mutations";
import { ChangePasswordField } from "../../types/user";

function Settings() {
  const { mutate, isPending } = useChangePassword();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ChangePasswordField>();

  const onSubmit = (form: ChangePasswordField) => {
    mutate(form, { onSuccess: () => reset() });
  };

  return (
    <div className="py-8 space-y-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto space-y-4 p-5 bg-white"
      >
        <div>
          <h2 className="text-lg font-medium text-gray-900">Change password</h2>
          <p className="mt-1 text-sm text-gray-600">
            Use at least 6 characters for the new password.
          </p>
        </div>

        <div>
          <label
            htmlFor="oldPassword"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Current password
          </label>
          <input
            type="password"
            id="oldPassword"
            {...register("oldPassword", {
              required: "Current password is required",
            })}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full max-w-xs p-2.5"
          />
          {errors.oldPassword && (
            <p className="text-red-500 text-xs mt-1">
              {errors.oldPassword.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="newPassword"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            New password
          </label>
          <input
            type="password"
            id="newPassword"
            {...register("newPassword", {
              required: "New password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full max-w-xs p-2.5"
          />
          {errors.newPassword && (
            <p className="text-red-500 text-xs mt-1">
              {errors.newPassword.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Confirm new password
          </label>
          <input
            type="password"
            id="confirmPassword"
            {...register("confirmPassword", {
              required: "Confirm your new password",
              validate: (value) =>
                value === watch("newPassword") || "Passwords do not match",
            })}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full max-w-xs p-2.5"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-60"
        >
          {isPending ? "Saving..." : "Change password"}
        </button>
      </form>
    </div>
  );
}

export default Settings;
