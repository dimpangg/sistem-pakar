"use client";
import { LoadingPage } from "@/components";
import Calendar from "@/components/organisms/Calendar";
import { ENDPOINTS } from "@/constant";
import { API_URL } from "@/helpers";
import { toast } from "@/hooks";
import { IDiagnoseDetail } from "@/types";
import { ClipboardCheck } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ResultDetail = () => {
  const { id } = useParams();
  const router = useRouter();

  const [data, setData] = useState<IDiagnoseDetail>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDetailDiagnose(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function getDetailDiagnose(id: string) {
    const res = await fetch(API_URL + ENDPOINTS.DIAGNOSE_DETAIL + "/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    });

    if (!res.ok) {
      switch (res.status) {
        case 404:
          toast({
            title: "Error",
            description: "Data tidak ditemukan",
            variant: "destructive",
            duration: 2000,
          });
          router.push("/system/results");
          break;
        default:
          setLoading(false);
          throw new Error(res.statusText);
      }
    }

    const data = await res.json();
    setData(data.data);
    setLoading(false);
  }

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <section className="mb-16">
      <section className="mb-6 mt-4 flex gap-2 px-4">
        <div>
          <ClipboardCheck size={36} className="text-emerald-400" />
        </div>
        <div>
          <div className="text-h4 text-slate-900">Hasil Diagnosis</div>
          <div className="text-detail text-slate-500">
            Hasil diagnosis dan cara penanganan pada jamur tiram
          </div>
        </div>
      </section>
      <section className="mx-4 mb-10 flex flex-col gap-4">
        <div className="rounded-2xl bg-slate-50 px-5 py-6">
          <div className="mb-[6px] text-h4 font-bold text-slate-900">
            {data?.pest_disease.label}
          </div>
          <div className="text-xs font-medium text-slate-500">
            {data?.pest_disease.description}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white px-5 py-6">
          <div className="mb-[6px] text-sm font-bold text-slate-900">
            Gejala yang dipilih
          </div>
          <ul className="list-inside list-decimal">
            {data?.history.symptoms.map((value, i) => (
              <li className="text-detail text-slate-900" key={i}>
                {value.label}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Calendar data={data} refetch={() => getDetailDiagnose(id)} />
    </section>
  );
};

export default ResultDetail;
