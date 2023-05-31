import { ENDPOINTS } from "@/constant";
import { API_URL } from "@/helpers";

export const getDiagnoseList = async () => {
  try {
    const response = await fetch(API_URL + ENDPOINTS.DIAGNOSE_LIST, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    });
    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      return error;
    } else {
      return new Error("Something went wrong");
    }
  }
};
