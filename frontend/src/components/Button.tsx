const Button = (props: any) => {
  return (
    <button
      style={props.style}
      onClick={props.onClick}
      disabled={props.disabled}
      className={props.className}
    >
      {props.title}
    </button>
  );
};

export default Button;
