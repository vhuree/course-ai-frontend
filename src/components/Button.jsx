import loader from "../assets/loader.svg";

const Button = ({
  type = "submit",
  id,
  text,
  loading,
  disabled,
  css = "submit-button",
  onClick,
}) => {
  return (
    <button
      type={type}
      className={css}
      disabled={disabled}
      id={id}
      onClick={onClick}
    >
      {!loading ? (
        text
      ) : (
        <span>
          {text} <img src={loader} className="spinner" alt="Submit" />
        </span>
      )}
    </button>
  );
};

export default Button;
