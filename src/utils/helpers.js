export const formatPrice = (price) => {
  return '$' + price.toFixed(2);
};

export const truncateText = (text, maxLength) => {
  if (text.length <= (maxLength || 30)) return text;
  return text.substring(0, maxLength || 30) + '...';
};

export const getCategoryDisplayName = (category) => {
  if (category === 'all') return 'All Categories';
  return category.charAt(0).toUpperCase() + category.slice(1);
};