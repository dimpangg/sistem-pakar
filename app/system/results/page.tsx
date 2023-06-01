"use client";

import { getDiagnoseList } from "@/services";
import { ICommonResponse, IDiagnoseList } from "@/types";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { id } from "date-fns/locale";
import { Badge, Button, LoadingPage } from "@/components";
import { ExternalLink, History } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks";
import Image from "next/image";
import clsx from "clsx";

const ResultsPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IDiagnoseList[]>([]);
  useEffect(() => {
    getDiagnoseList()
      .then((res: ICommonResponse<IDiagnoseList[]>) => {
        setData(res.data);
      })
      .catch((err: Error) => {
        setData([]);
        toast({
          title: "Error",
          description: err.message,
          variant: "destructive",
          duration: 2000,
        });
        throw new Error(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="mb-16 flex flex-col gap-4 px-4">
      <section className="mb-2 mt-4 flex gap-2">
        <div>
          <History className="h-9 w-9 text-emerald-400" />
        </div>
        <div>
          <div className="text-h4 text-slate-900">Riwayat Diagnosis</div>
          <div className="text-detail text-slate-500">
            Daftar riwayat diagnosis yang telah dilakukan
          </div>
        </div>
      </section>
      {data.length === 0 ? (
        <div
          className={clsx(
            "flex flex-col items-center justify-center gap-5",
            "h-[calc(100vh-72px-48px-120px-8px-16px-16px-20px)]"
          )}
        >
          <Image
            priority
            src="/undraw_no_data.svg"
            alt="empty"
            width={200}
            height={195.224}
          />
          <div className="text-center text-lg font-bold">
            Belum ada riwayat diagnosis.
          </div>
          <Button onClick={() => router.push("/system/diagnose")}>
            Mulai Diagnosis
          </Button>
        </div>
      ) : (
        data.map((item, i) => {
          return (
            <div
              key={item.id}
              className="flex cursor-pointer items-center gap-4 rounded-md border p-4"
              onClick={() => {
                router.push(`/system/results/${item.id}`);
              }}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded bg-slate-900 text-white">
                <span>{i + 1 < 10 ? "0" + (i + 1) : i + 1}</span>
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {format(new Date(item.created_at), "dd MMM yyyy, HH:mm", {
                    locale: id,
                  })}
                </p>
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold">Hasil: </span>
                  {item.pest_disease.label}
                </p>
                <Badge
                  variant={
                    item.badge === "Butuh Konfirmasi" ? "warning" : "success"
                  }
                >
                  {item.badge}
                </Badge>
              </div>
              <ExternalLink className="text-slate-900" size={24} />
            </div>
          );
        })
      )}
    </div>
  );
};

export default ResultsPage;
