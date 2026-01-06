export function formatDate(dateString) {
  // Adding T00:00:00 ensures the date is parsed in the local time zone as intended,
  // rather than defaulting to UTC, which can cause off-by-one day errors.
  const date = new Date(dateString + 'T00:00:00');
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}