
export const useFormatTime = (timestamp: string | Date) => {
    const date = new Date(timestamp);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();

    if (isToday) {
        return date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
    } else {
        return date.toLocaleDateString([], {
            day: '2-digit',
            month: 'short',
        });
    }
};

export const useFormatDate = (timestamp: string | Date): string => {
  if (!timestamp) return '';

  const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;

  const formatter = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return formatter.format(date);
};
