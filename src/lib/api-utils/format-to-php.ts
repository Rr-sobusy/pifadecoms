export function formatToPHP(value: number): string {
    return `Php ${value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
  }