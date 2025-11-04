import { getFormatter } from "next-intl/server";

export const localizeDate = async (date: Date) => {
  const format = await getFormatter();
  const dateTime = new Date("2020-11-20T10:36:01.516Z");

  return format.dateTime(dateTime, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
