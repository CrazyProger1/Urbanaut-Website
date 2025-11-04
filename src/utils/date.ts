import { getFormatter } from "next-intl/server";

export const localizeDate = async (date: Date) => {
  const format = await getFormatter();

  return format.dateTime(date, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
