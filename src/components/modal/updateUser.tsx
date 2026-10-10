import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FiEdit } from "react-icons/fi";
import { useUpdateUser } from "../../services/mutations";
import { User } from "../../types/user";
import { roles } from "../../config/roles";

type Props = {
  user: User;
};

type UpdateUserField = Pick<User, "name" | "role">;

export const UpdateUser = ({ user }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const { mutate, isPending } = useUpdateUser();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateUserField>();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const openModal = () => {
    reset({ name: user.name, role: user.role });
    setIsOpen(true);
  };

  const onSubmit = (data: UpdateUserField) => {
    mutate(
      { id: user._id, payload: data },
      { onSuccess: () => setIsOpen(false) },
    );
  };

  return (
    <>
      <FiEdit
        size={18}
        className="inline cursor-pointer m-1"
        onClick={openModal}
      />

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-screen bg-gray-800 bg-opacity-50">
          <div className="relative p-4 w-full max-w-md">
            <div
              ref={popupRef}
              className="relative bg-white rounded-lg shadow p-5"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Update User</h3>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-900"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block mb-1 text-sm font-medium">Name</label>
                  <input
                    {...register("name", { required: "Name is required" })}
                    className="w-full px-3 py-2 border rounded"
                    type="text"
                    placeholder="Enter name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium">Role</label>
                  <select
                    {...register("role", { required: "Role is required" })}
                    className="w-full px-3 py-2 border rounded capitalize"
                  >
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {role.replace("_", " ")}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-60"
                >
                  {isPending ? "Saving..." : "Save"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
