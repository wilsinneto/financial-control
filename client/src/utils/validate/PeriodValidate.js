let error = "";

function isFieldsEmpty(payload) {
  if (payload.startDate === Date || payload.endDate === Date)
    error = "O(s) campo(s) Data deve(m) ser preenchido(s).";
}

function validateFields(payload) {
  isFieldsEmpty(payload);
  return { error };
}

exports.validateInputFormPeriod = (payload) => {
  error = "";
  return validateFields(payload);
};
