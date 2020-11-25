exports.captureHttpStatusCode = (status) => status.match(/(\d+)/);
exports.getMessage = (status) => 
  ({
    404: "Despesa não encontrado.",
    409: "Despesa já existe.",
    500: "Error Interno",
  }[status] || "");