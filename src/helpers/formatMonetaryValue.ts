function formatMonetaryValue(valueStr: string): string {
  // Convert the string value to a number representing cents
  const centsValue = parseInt(valueStr, 10);

  // Check if the value is NaN (not a number) or null/undefined
  if (isNaN(centsValue) || centsValue == null) {
    return ""; // Return empty string for invalid input
  }

  // Calculate the dollar amount and cents
  const dollars = Math.floor(Math.abs(centsValue) / 100); // Get the whole dollar part
  const cents = Math.abs(centsValue) % 100; // Get the remaining cents

  // Format the dollar amount with a dollar sign and cents
  const formattedValue =
    (centsValue < 0 ? "-" : "") +
    "$" +
    dollars +
    "." +
    (cents < 10 ? "0" : "") +
    cents;

  return formattedValue;
}

export default formatMonetaryValue;
