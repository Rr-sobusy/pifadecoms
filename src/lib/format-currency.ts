

export function formatToCurrency(amount:number, locale = 'Fil-ph', currency = 'Php') {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency
    }).format(amount);
  }