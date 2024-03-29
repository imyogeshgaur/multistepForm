
const TextInput = (props: any) => {
  return (
    <>
      {props.component ? (
        <div style={{ display: "flex" }}>
          <input
            type={props.type}
            name={props.name}
            placeholder={props.placeholder}
            style={props.style}
            value={props.value}
            onChange={props.onChange}
            {...props}
          />
          {props.component}
        </div>
      ) : (
        <input
          type={props.type}
          name={props.name}
          placeholder={props.placeholder}
          style={props.style}
          value={props.value}
          onChange={props.onChange}
        />
      )}
    </>
  );
};

export default TextInput;
