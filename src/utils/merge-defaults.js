export const mergeClassName = (...args) => args.join(" ");

const mergeStyle = (defaultStyle, propsStyle) => {
  if (defaultStyle && propsStyle) {
    return { ...defaultStyle, ...propsStyle };
  } else if (propsStyle) {
    return propsStyle;
  }
  return defaultStyle;
};

const mergeDefaults = (
  { className: defaultClassName, style: defaultStyle, ...otherDefaults },
  { className: propsClassName, style: propsStyle, ...otherProps }
) => ({
  className: mergeClassName(defaultClassName, propsClassName),
  style: mergeStyle(defaultStyle, propsStyle),
  ...otherDefaults,
  ...otherProps,
});

export default mergeDefaults;
