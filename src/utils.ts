// Colors to alternate between
const colors = [
  "#FFCC80", // light orange
  "#FFAB91", // light red
  "#E6EE9B", // light yellow-green
  "#80DEEA", // light blue
  "#F48FB1", // light pink
  "#80CBC4", // teal
  "#7634d8", // purple
];

// Return a color that is different from lastColor (to avoid repeats)
export function getAlternatingColor(lastColor?: string): string {
  // Filter out lastColor
  const filteredColors = colors.filter((c) => c !== lastColor);
  // Pick random color from filtered list
  return filteredColors[Math.floor(Math.random() * filteredColors.length)];
}

// Format Firestore Timestamp or ISO string to MM-DD-YYYY hh:mm AM/PM Central Time
export function formatTimestampToCentral(timestamp: any): string {
  if (!timestamp) return "Unknown";

  let date: Date;

  if (typeof timestamp === "string") {
    date = new Date(timestamp);
  } else if (timestamp.toDate && typeof timestamp.toDate === "function") {
    date = timestamp.toDate();
  } else {
    date = new Date();
  }

  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}
