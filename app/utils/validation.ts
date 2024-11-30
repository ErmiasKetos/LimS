export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateSample(sample: any): ValidationResult {
  const errors: string[] = [];

  if (!sample.clientName) {
    errors.push("Client name is required");
  }

  if (!sample.sampleType) {
    errors.push("Sample type is required");
  }

  if (!sample.dateReceived) {
    errors.push("Date received is required");
  } else if (new Date(sample.dateReceived) > new Date()) {
    errors.push("Date received cannot be in the future");
  }

  if (!sample.parameters || sample.parameters.length === 0) {
    errors.push("At least one parameter is required");
  }

  if (!sample.analyst) {
    errors.push("Analyst is required");
  }

  if (!sample.holdTime) {
    errors.push("Hold time is required");
  } else if (new Date(sample.holdTime) <= new Date(sample.dateReceived)) {
    errors.push("Hold time must be after the date received");
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validateQCData(qcData: any): ValidationResult {
  const errors: string[] = [];

  if (!qcData.sampleId) {
    errors.push("Sample ID is required");
  }

  if (!qcData.parameter) {
    errors.push("Parameter is required");
  }

  if (qcData.value === undefined || qcData.value === null) {
    errors.push("Value is required");
  } else if (isNaN(qcData.value)) {
    errors.push("Value must be a number");
  }

  if (!qcData.unit) {
    errors.push("Unit is required");
  }

  if (!qcData.dateAnalyzed) {
    errors.push("Date analyzed is required");
  } else if (new Date(qcData.dateAnalyzed) > new Date()) {
    errors.push("Date analyzed cannot be in the future");
  }

  if (!qcData.qcType) {
    errors.push("QC type is required");
  }

  if (!qcData.acceptanceCriteria) {
    errors.push("Acceptance criteria is required");
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

