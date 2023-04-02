import { API_URL, ENDPOINTS } from "@/constant";
import { ICommonResponse, ISymptoms } from "@/types";
import React from "react";
import DiagnoseClient from "./DiagnoseClient";

async function getData() {
  const res = await fetch(`${API_URL}${ENDPOINTS.SYMPTOMS}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });
  // check if response is ok or not
  if (!res.ok) {
    throw new Error("An error occurred while fetching the data.");
  }
  const data = await res.json();
  return data;
}

const Diagnose = async () => {
  const { data }: ICommonResponse<ISymptoms[]> = await getData();

  return <DiagnoseClient data={data} />;
};

export default Diagnose;
