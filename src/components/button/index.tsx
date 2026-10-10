import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
import "./index.scss";

type Props = {
  to: string;
  children: ReactNode;
};

const LinkButton: FC<Props> = ({ to, children }) => {
  return (
    <Link to={to} className="link__button">
      {children}
    </Link>
  );
};

export default LinkButton;
