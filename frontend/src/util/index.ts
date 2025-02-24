export const formatDate = (date: any) => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  return new Date(date).toLocaleDateString("en-GB", options).replace(",", "");
};
