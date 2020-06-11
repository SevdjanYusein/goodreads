export const truncateText = (name, maxLength = 15) => {
  return (name && name.length > maxLength) ? `${name.slice(0, maxLength)}...` : name;
};

export const checkValidity = (value, rules) => {
  let isValid = true;
  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
  }

  if (rules.regexPattern) {
    isValid = rules.regexPattern.test(value) && isValid;
  }

  return isValid;
};
