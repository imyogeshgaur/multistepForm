import { Link } from "react-router-dom";

const TextLink = ({
  textStyle,
  text,
  linkStyle,
  linkText,
  navigateTo,
}: any) => (
  <p style={textStyle}>
    {text}
    <Link style={linkStyle} to={navigateTo}>
      {linkText}
    </Link>
  </p>
);

export default TextLink;
