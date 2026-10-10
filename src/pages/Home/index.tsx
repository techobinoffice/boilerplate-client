import { Helmet } from "react-helmet-async";
import LinkButton from "../../components/button";
import { getStoredUser } from "../../utils/auth";
import "./page.scss";

const features = [
  {
    title: "Authentication",
    description:
      "Login, register, forgot and reset password with automatic access token refresh.",
  },
  {
    title: "Admin shell",
    description:
      "Protected layout with a config driven sidebar, page search and role based menus.",
  },
  {
    title: "Typed data layer",
    description:
      "One Axios client, one endpoint file and React Query hooks for every request.",
  },
];

const HomePage = () => {
  const user = getStoredUser();

  return (
    <section className="home_page">
      <Helmet>
        <title>Client Boilerplate</title>
      </Helmet>
      <div className="container mx-auto">
        <div className="home__hero">
          <h1>Start your next project here</h1>
          <p>
            React, TypeScript, Vite, Tailwind and React Query wired to the API
            boilerplate.
          </p>
          <LinkButton to={user ? "/dashboard" : "/login"}>
            {user ? "Go to dashboard" : "Get started"}
          </LinkButton>
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
          {features.map((feature) => (
            <div key={feature.title} className="home__card">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomePage;
