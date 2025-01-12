export default function DateTimeFormatting(dateTime: string) {
  // convert string to formatted date MM/DD/YYYY HH:MM
  // if the date is today, return HH:MM

  const date = new Date(dateTime);
  const today = new Date();

  const dateOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };
  const timeOptions = {
    hour: '2-digit' as '2-digit',
    minute: '2-digit' as '2-digit',
  };

  if (date.toLocaleDateString() === today.toLocaleDateString()) {
    return date.toLocaleTimeString('en-US', timeOptions);
  } else {
    return `${date.toLocaleDateString('en-US', dateOptions)} ${date.toLocaleTimeString('en-US', timeOptions)}`;
  }
}
