export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/); // Split by whitespace
  if (parts.length === 1) {
    // If only one word, take first and last letter
    const word = parts[0];
    return (word[0] + word[word.length - 1]).toUpperCase();
  } else {
    // If multiple words, take first letter of first two words
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
}