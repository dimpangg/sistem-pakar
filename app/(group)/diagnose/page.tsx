"use client";

import { Button, Doctor } from "@/components";
import {
  ICommonResponse,
  IDiagnostics,
  ISymptoms,
  LocalStorageKey,
} from "@/types";
import React, { useEffect, useState } from "react";
import { Loader2, Plus, X } from "lucide-react";
import classNames from "classnames";
import { setLocalStorage } from "@/utils";
import { ENDPOINTS } from "@/constant";
import { API_URL, encryptValue } from "@/helpers";
import { useRouter } from "next/navigation";

const Diagnose = () => {
  const router = useRouter();

  const [selected, setSelected] = useState<string[]>([]);
  const [shake, setShake] = useState(false);
  const [loading, setLoading] = useState(false);

  const [loadingGet, setLoadingGet] = useState(true);
  const [data, setData] = useState<ISymptoms[]>([]);

  const Title = ({ children }: { children: string }) => (
    <div className="mb-2 text-large text-slate-900">{children}</div>
  );

  const Checkbox = ({ item }: { item: ISymptoms }) => {
    return (
      <div
        className={classNames(
          "flex cursor-pointer select-none items-center justify-between gap-1 rounded-md border-[1px] border-solid px-4 py-4",
          selected.includes(item.code)
            ? "border-emerald-200 bg-emerald-50"
            : "border-slate-200 bg-white"
        )}
        onClick={() => {
          if (selected.includes(item.code)) {
            setSelected(selected.filter((code) => code !== item.code));
          } else {
            setSelected([...selected, item.code]);
          }
        }}
      >
        <div className="text-body-medium text-slate-900">{item.label}</div>
        <div>
          {selected.includes(item.code) ? (
            <X className="text-slate-500" height={16} width={16} />
          ) : (
            <Plus className="text-emerald-400" height={16} width={16} />
          )}
        </div>
      </div>
    );
  };

  async function handleSubmit() {
    if (selected.length === 1 || selected.length > 5) {
      setShake(true);
      setTimeout(() => {
        setShake(false);
      }, 500);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(API_URL + ENDPOINTS.DIAGNOSE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ symptoms: selected }),
      });

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      const { data }: ICommonResponse<IDiagnostics> = await res.json();
      setLocalStorage(
        LocalStorageKey.Diagnosis,
        encryptValue(JSON.stringify(data))
      );

      router.replace("/results");
    } catch (err) {
      setLoading(false);
      throw new Error(JSON.stringify(err));
    }
  }

  async function getData() {
    try {
      const res = await fetch(API_URL + ENDPOINTS.SYMPTOMS, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        credentials: "include",
      });

      if (res.status === 401) {
        setLoadingGet(false);
        router.replace("/login");
        throw new Error("Unauthenticated");
      }
      if (!res.ok) {
        setLoadingGet(false);
        router.replace("/login");
        throw new Error("An error occurred while fetching the data.");
      }
      const data: ICommonResponse<ISymptoms[]> = await res.json();
      setData(data.data);
      setLoadingGet(false);
    } catch (err) {
      setLoadingGet(false);
      window.location.pathname = "/login";
      throw new Error(JSON.stringify(err));
    }
  }

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loadingGet) {
    return (
      <div
        style={{
          height: "calc(100vh - 64.8px - 120px )",
        }}
        className="flex items-center justify-center"
      >
        <div>
          <Loader2
            className="animate-spin text-primary"
            height={64}
            width={64}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="mb-16 px-4">
      <section className="mb-7 mt-5 flex gap-2">
        <Doctor className="text-emerald-400" />
        <div>
          <div className="text-h4 text-slate-900">Pilih Gejala</div>
          <div className="text-detail text-slate-500">
            Pilih gejala yang terjangkit pada jamur tiram
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-5">
        <div>
          <Title>Gejala pada Jamur Tiram</Title>
          <div className="flex flex-col gap-[6px]">
            {data
              .filter(
                (item) =>
                  !item.label.toLowerCase().includes("miselium") &&
                  !item.label.toLowerCase().includes("baglog") &&
                  !item.label.toLowerCase().includes("bag log")
              )
              .map((item) => (
                <Checkbox key={item.code} item={item} />
              ))}
          </div>
        </div>
        <div>
          <Title>Gejala pada Baglog</Title>
          <div className="flex flex-col gap-[6px]">
            {data
              .filter(
                (item) =>
                  item.label.toLowerCase().includes("baglog") ||
                  item.label.toLowerCase().includes("bag log")
              )
              .map((item) => (
                <Checkbox key={item.code} item={item} />
              ))}
          </div>
        </div>
        <div>
          <Title>Gejala pada Miselium</Title>
          <div className="flex flex-col gap-[6px]">
            {data
              .filter((item) => item.label.toLowerCase().includes("miselium"))
              .map((item) => (
                <Checkbox key={item.code} item={item} />
              ))}
          </div>
        </div>
      </section>
      {selected.length > 0 && (
        <div
          className="fixed bottom-0 left-0 right-0 flex items-center justify-center rounded-t-[10px] bg-white shadow-[0px_3px_20px_rgba(0,0,0,0.1)]"
          style={{
            boxShadow: "0px 3px 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="min-w-[384px] px-4 py-4">
            <div className="flex items-center justify-between">
              <div
                className={classNames("mb-3 text-body", shake ? "shake" : "")}
              >
                <span
                  className={classNames(
                    selected.length === 1 || selected.length > 5
                      ? "text-red-500"
                      : "text-slate-900"
                  )}
                >
                  {selected.length} gejala dipilih
                </span>
                {selected.length === 1 && (
                  <span className="text-slate-400"> (min 2 gejala)</span>
                )}
                {selected.length > 5 && (
                  <span className="text-slate-400"> (max 5 gejala)</span>
                )}
              </div>
              {/* <button className="p-1" onClick={() => setSelected([])}>
                <Trash2 className="h-4 w-4 text-slate-400" />
              </button> */}
            </div>
            <Button
              isLoading={loading}
              className="w-full"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Diagnose;
