module.exports = {
  format_date: (date) =>
    // Format date as MM/DD/YYYY
    date.toLocaleDateString(),
  format_amount: (amount) =>
    // format large numbers with commas
    parseInt(amount).toLocaleString(),
  get_emoji: () => {
    const randomNum = Math.random();

    // Return a random emoji
    if (randomNum > 0.7) {
      return `<span for="img" aria-label="lightbulb">💡</span>`;
    }
    if (randomNum > 0.4) {
      return `<span for="img" aria-label="laptop">💻</span>`;
    }
    return `<span for="img" aria-label="gear">⚙️</span>`;
  },
};
