import dayjs from "dayjs";
import calendarFormat from "dayjs/plugin/calendar";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";

import parser from "./parser";

dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);
dayjs.extend(calendarFormat);

const uppercase = () => (str) => {
  return str.toUpperCase();
};

const date = (format) => (dateStr) => {
  return dayjs(dateStr).format(format);
};

const fromNow = (format) => (dateStr) => {
  return dayjs(dateStr).fromNow(format);
};

const calendar = () => (dateStr) => {
  return dayjs().calendar(dayjs(dateStr));
};

const sw = (truthy, falsy) => (value) => {
  return value ? truthy : falsy;
};

const currency =
  (currencyType = "USD", locale) =>
  (value) => {
    return (+value).toLocaleString(locale, {
      style: "currency",
      currency: currencyType,
    });
  };

const builtIns = {
  uppercase,
  date,
  fromNow,
  calendar,
  sw,
  currency,
};

const PipesEngine = (settings) => {
  const userImports = settings.imports || {};
  const imports = { ...builtIns, ...userImports };
  return (dataObj, inputString: string) => {
    return parser({ imports }, dataObj, inputString);
  };
};

export default PipesEngine;
