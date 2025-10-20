import dayjs from "dayjs";

export function formatDateRFC3339(date) {
  return dayjs(date).toISOString();
}

export function safeLog(title, data) {
  console.log(`\n=== ${title} ===`);
  console.dir(data, { depth: null });
}
