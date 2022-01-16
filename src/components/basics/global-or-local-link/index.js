import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

const GlobalOrLocalLink = ({ href, ...otherProps }) =>
  href?.charAt(0) === "/" ? (
    <Link to={href} {...otherProps} />
  ) : (
    <a href={href} target="_blank" rel="noreferrer" {...otherProps} />
  );

GlobalOrLocalLink.propTypes = {
  href: PropTypes.string.isRequired,
};

export default GlobalOrLocalLink;
