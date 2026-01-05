import { formatDate } from "@arkyn/shared";

class FormatDateAdapter {
  static format(date: Date, utc: number): string {
    return formatDate(
      date.toISOString().split("T"),
      "isoDate",
      "MM/DD/YYYY at hh:mm:ss",
      utc
    );
  }

  static formatToCustomType(date: Date, format: string, utc: number): string {
    return formatDate(date.toISOString().split("T"), "isoDate", format, utc);
  }
}

export { FormatDateAdapter };
