// add trailing zeros in the start of the series number

export function generatedSeries(inputNumber: bigint, frontString: string) {
  return frontString + inputNumber.toString().padStart(6, '0');
}
