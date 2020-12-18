exports.capitalizeFirstLetter = (description) => {
  const descriptionCapitalize = (description.charAt(0).toUpperCase() + description.slice(1));
  return descriptionCapitalize;
}