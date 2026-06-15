export const toArabicNumbers = (value) => {
  if (value === null || value === undefined) {
    return "-";
  }

  return value
    .toString()
    .replace(/\d/g, (digit) =>
      "٠١٢٣٤٥٦٧٨٩"[Number(digit)]
    );
};