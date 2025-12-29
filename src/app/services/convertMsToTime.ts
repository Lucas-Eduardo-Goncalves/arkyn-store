function convertMsToTime(ms: number) {
  const hours = Math.floor(ms / (1000 * 60 * 60));
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const seconds = Math.floor((ms / 1000) % 60);
  const milliseconds = ms % 1000;

  if (hours > 0) {
    const msFormatted =
      milliseconds > 0 ? milliseconds.toString().replace(/0+$/, "") : "0";

    return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${msFormatted}`;
  }

  if (minutes > 0) {
    const msFormatted =
      milliseconds > 0 ? milliseconds.toString().replace(/0+$/, "") : "0";

    return `${minutes}:${String(seconds).padStart(2, "0")}.${msFormatted}`;
  }

  const msFormatted =
    milliseconds > 0
      ? (milliseconds / 1000).toFixed(3).slice(2).replace(/0+$/, "")
      : "0";

  return `${seconds}.${msFormatted}s`;
}

export { convertMsToTime };
