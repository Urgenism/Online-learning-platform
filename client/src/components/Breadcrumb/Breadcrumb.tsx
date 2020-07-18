import React from "react";
import "./Breadcrumb.css";
import { Link } from "react-router-dom";

type TProps = {
  breadcrumbLinks: Array<any>;
};

const Breadcrumb: React.FC<TProps> = ({ breadcrumbLinks }) => {
  return (
    <div className='breadcrumb'>
      <ul className='breadcrumb__list'>
        {breadcrumbLinks.map((item: any) => {
          return (
            <li className='breadcrumb__item' key={item.path}>
              <Link to={item.path} className='breadcrumb__link'>
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Breadcrumb;
