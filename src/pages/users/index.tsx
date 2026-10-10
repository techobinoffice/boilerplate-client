import { useState } from "react";
import { useGetUsers } from "../../services/queries";
import { useDeleteUser } from "../../services/mutations";
import Pagination from "../../components/pagination";
import DeleteAction from "../../components/deleteAction";
import { UpdateUser } from "../../components/modal/updateUser";
import { roles } from "../../config/roles";
import { getStoredUser } from "../../utils/auth";
import { formatDate } from "../../utils/formateDate";

const LIMIT = 10;

const UsersPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [role, setRole] = useState("");
  const currentUserId = getStoredUser()?.user?._id;

  const { data, isLoading } = useGetUsers({
    role: role,
    page: currentPage,
    limit: LIMIT,
    searchTerm,
  });
  const { mutate: deleteUser } = useDeleteUser();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleSearchTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };
  const handleRole = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil((data?.meta?.total ?? 0) / LIMIT) || 1;

  return (
    <div>
      <div className="flex justify-end items-center gap-2 mb-2">
        <select
          value={role}
          onChange={handleRole}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 capitalize"
        >
          <option value="">All roles</option>
          {roles.map((item) => (
            <option key={item} value={item}>
              {item.replace("_", " ")}
            </option>
          ))}
        </select>
        <input
          type="text"
          id="simple-search"
          value={searchTerm}
          onChange={handleSearchTerm}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
          placeholder="Search here..."
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Joined
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.data.map((user) => (
              <tr
                key={user._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 capitalize">
                    {user.role.replace("_", " ")}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {user.createdAt ? formatDate(user.createdAt) : "-"}
                </td>
                <td className="px-6 py-4">
                  {/* nobody edits or deletes their own account from this list */}
                  {user._id !== currentUserId && (
                    <>
                      <UpdateUser user={user} />
                      <DeleteAction deleteFun={() => deleteUser(user._id)} />
                    </>
                  )}
                </td>
              </tr>
            ))}
            {!isLoading && !data?.data.length && (
              <tr className="bg-white">
                <td colSpan={5} className="px-6 py-8 text-center">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {data?.data.length ? (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      ) : null}
    </div>
  );
};

export default UsersPage;
