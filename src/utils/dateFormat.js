export const formatDate = (dateString) => {
  if (!dateString) {
    return '';
  }
  const date = new Date(dateString);
  if (isNaN(date)) {
    return '';
  }

  const KST_OFFSET = 9 * 60 * 60 * 1000;
  const kstDate = new Date(date.getTime() + KST_OFFSET);
  return `${kstDate.getUTCFullYear()}.${String(kstDate.getUTCMonth() + 1).padStart(2, '0')}.${String(kstDate.getUTCDate()).padStart(2, '0')}`;
};
