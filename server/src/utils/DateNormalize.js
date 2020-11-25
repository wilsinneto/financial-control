exports.oneLessDate = (date) => {
  var oneLessStartDate = new Date(date);
  return oneLessStartDate.setDate( oneLessStartDate.getDate() -1 );
}