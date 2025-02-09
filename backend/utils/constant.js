// Email normalization
export function normalizeEmail(email) {
    if (!email) return null;
    return email.trim().toLowerCase();
}

// Convert Mongoose date to "time ago" format
export function timeAgo(date) {
    if (!date) return "Invalid date";

    const now = new Date();
    const diff = now - new Date(date); // Difference in milliseconds
    const seconds = Math.floor(diff / 1000);

    if (seconds < 60) return `Posted ${seconds} seconds ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `Posted ${minutes} minutes ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `Posted ${hours} hours ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `Posted ${days} days ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `Posted ${months} months ago`;
    const years = Math.floor(months / 12);
    return `Posted ${years} years ago`;
}

export const processSearchString = (searchString) => {
    // Remove extra spaces, make lowercase, and create regex-safe string
    return searchString
      .trim()
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .split(' ')
      .map(word => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
      .join('.*');
};
  
