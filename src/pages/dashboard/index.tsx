import { Link } from "react-router-dom";
import { useGetMe, useGetUsers } from "../../services/queries";
import { ADMIN_ROLES, hasRole } from "../../config/roles";
import { getStoredUser } from "../../utils/auth";
import { formatDate } from "../../utils/formateDate";

const Dashboard = () => {
  const storedUser = getStoredUser()?.user;
  const isAdmin = hasRole(storedUser?.role, ADMIN_ROLES);
  const { data, isLoading } = useGetMe();
  // only the total is needed here, the api rejects this request for non admins
  const { data: usersData } = useGetUsers({ limit: 1 }, isAdmin);
  const user = data?.data ?? storedUser;

  return (
    <>
      <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome, {user?.name || "User"}
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          This is the protected area. Add your own pages in the route table and
          the sidebar menu config.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
            My Profile
          </h2>
          {isLoading ? (
            <div className="space-y-3">
              <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-48 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
            </div>
          ) : (
            <dl className="space-y-2 text-sm text-gray-700">
              <div className="flex justify-between gap-4">
                <dt className="text-gray-500">Name</dt>
                <dd className="font-medium">{user?.name}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-gray-500">Email</dt>
                <dd className="font-medium break-all">{user?.email}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-gray-500">Role</dt>
                <dd className="font-medium capitalize">
                  {user?.role?.replace("_", " ")}
                </dd>
              </div>
              {user?.createdAt && (
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-500">Joined</dt>
                  <dd className="font-medium">{formatDate(user.createdAt)}</dd>
                </div>
              )}
            </dl>
          )}
        </div>

        {isAdmin && (
          <Link
            to="/users"
            className="rounded-xl bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Total Users
            </h2>
            <p className="text-4xl font-bold text-primary">
              {usersData?.meta?.total ?? "-"}
            </p>
            <p className="mt-2 text-sm text-gray-600">Manage users</p>
          </Link>
        )}
      </div>
    </>
  );
};

export default Dashboard;
