export * from "./encryptions";
export * from "./environments";

export function conditionStatus(status: string) {
  switch (status) {
    case "WORSENED":
      return "Memburuk";
    case "IMPROVED":
      return "Membaik";
    case "DIED":
      return "Mati";
    case "HEALED":
      return "Sembuh";
    default:
      return "";
  }
}
