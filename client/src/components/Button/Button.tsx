import React from "react";
import "./Button.css";

type TProps = {
  buttonText: String;
  buttonBg?: string;
  clickHandler: () => void;
};

const Button: React.FC<TProps> = ({ buttonBg, buttonText, clickHandler }) => {
  return (
    <button className={`btn ${buttonBg}`} onClick={clickHandler}>
      {buttonText}
    </button>
  );
};

export default Button;
