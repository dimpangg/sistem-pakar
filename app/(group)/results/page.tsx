"use client";

import { decryptValue } from "@/helpers";
import { IDiagnostics, LocalStorageKey } from "@/types";
import { getLocalStorage } from "@/utils";
import React, { useEffect, useState } from "react";
import { ClipboardCheck, ChevronLeft } from "lucide-react";
import { Button } from "@/components";
import Link from "next/link";
import Loading from "./loading";

const ResultsPage = () => {
  const [data, setData] = useState<IDiagnostics>({
    pest_disease: {
      label: "",
      description: "",
      treatment: [],
    },
    percentage: 0,
  });

  useEffect(() => {
    if (!getLocalStorage(LocalStorageKey.Diagnosis)) {
      window.location.href = "/";
    }
    const data: IDiagnostics = JSON.parse(
      decryptValue(getLocalStorage(LocalStorageKey.Diagnosis))
    );
    setData(data);
  }, []);

  if (!data.pest_disease.label) return <Loading />;

  return (
    <div className="mt-5 mb-16 px-4">
      <section className="mb-6 flex gap-2">
        <div>
          <ClipboardCheck size={36} className="text-slate-900" />
        </div>
        <div>
          <div className="text-h4 text-slate-900">Hasil Diagnosis</div>
          <div className="text-detail text-slate-500">
            Hasil diagnosis dan cara penanganan pada jamur tiram
          </div>
        </div>
      </section>
      <section className="mx-4 mb-10 flex flex-col gap-4">
        <div className="rounded-2xl bg-slate-50 py-6 px-5">
          <div className="mb-[6px] text-p-ui font-bold text-slate-900">
            {data.pest_disease.label}
          </div>
          <div className="text-[10px] font-medium leading-4 text-slate-500">
            {data.pest_disease.description}
          </div>
        </div>
        <div className="rounded-2xl bg-slate-50 py-6 px-5">
          <div className="mb-[6px] text-p-ui font-bold text-slate-900">
            Cara Penanganan
          </div>
          <ul className="list-inside list-disc">
            {data.pest_disease.treatment.map((treatment, i) => (
              <li className="text-detail text-slate-900" key={i}>
                {treatment}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="flex items-center justify-center">
        <Link href="/diagnose">
          <Button className="flex items-center justify-center gap-2">
            <>
              <ChevronLeft size={16} className="text-white" />
              Kembali ke Halaman Diagnosis
            </>
          </Button>
        </Link>
      </section>
    </div>
  );
};

export default ResultsPage;
