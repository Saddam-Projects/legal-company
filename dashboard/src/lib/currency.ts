export const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value);
