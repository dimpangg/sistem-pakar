"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  formatRelative,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
} from "date-fns";
import { useRef, useState } from "react";
import classNames from "clsx";
import { id } from "date-fns/locale";
import { IDiagnoseDetail } from "@/types";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  RadioBox,
} from "../molecules";
import { API_URL, conditionStatus } from "@/helpers";
import { AlertCircle, ExternalLink, Info } from "lucide-react";
import { useToast } from "@/hooks";
import { intersection, isTruthy } from "remeda";

const dayWeek = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

export default function Calendar({
  data,
  refetch,
}: {
  data?: IDiagnoseDetail;
  refetch?: () => void;
}) {
  const today = startOfToday();
  const [selectedDay, setSelectedDay] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const { toast } = useToast();

  const refTitle = useRef<HTMLHeadingElement>(null);

  const days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  function previousMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  const formatRelativeLocale: Record<string, string> = {
    lastWeek: "eeee 'lalu'",
    yesterday: "'Kemarin'",
    today: "'Hari ini'",
    tomorrow: "'Besok'",
    nextWeek: "'Hari' eeee 'depan'",
    other: "'Hari' eeee, dd MMMM yyyy",
  };

  const locale: Locale = {
    ...id,
    formatRelative: (token: string) => formatRelativeLocale[token],
  };

  const [value, setValue] = useState<{ value: string; label: string } | null>(
    null
  );

  function getNowDay(date: Date) {
    return data?.history.treatment.find((item) =>
      isSameDay(parseISO(item.day), date)
    );
  }

  function isNullTreatmentLessThanToday(selectedDay: Date) {
    // and selectedDay is today
    return (
      data?.history.treatment.find(
        (item) =>
          item.treatment === null &&
          format(parseISO(item.day), "yyyy-MM-dd") < format(today, "yyyy-MM-dd")
      ) !== undefined && isSameDay(selectedDay, today)
    );
  }

  function getLastDayTreatment() {
    return parseToDate(
      data?.history.treatment[data?.history.treatment.length - 1]?.day || ""
    );
  }

  // function getMoreDay(date: Date) {
  //   return data?.history.treatment.find(
  //     (item) =>
  //       item.treatment === null &&
  //       format(date, "yyyy-MM-dd") >= format(parseISO(item.day), "yyyy-MM-dd")
  //   );
  // }

  function parseToDate(date: string) {
    return parse(
      format(parseISO(date), "yyyy-MM-dd"),
      "yyyy-MM-dd",
      new Date()
    );
  }

  function optionRadio() {
    const dataId = data?.history.treatment
      .filter((item) => isTruthy(item.id))
      .map((item) => item.id);
    const arrayIsAfter = data?.conditions
      .filter((item) => isTruthy(item.is_after))
      .map((condition) => condition.is_after);
    if (
      dataId &&
      arrayIsAfter &&
      intersection(dataId, arrayIsAfter).length > 0
    ) {
      const notIsAfter =
        data?.conditions
          .filter(
            (item) =>
              !item.is_after &&
              !intersection(dataId, arrayIsAfter).includes(item.id)
          )
          .map((condition) => ({
            value: condition.id.toString(),
            label: condition.value,
          })) || [];
      const isAfter =
        data?.conditions
          .filter((item) =>
            intersection(dataId, arrayIsAfter).includes(item.is_after)
          )
          .map((condition) => ({
            value: condition.id.toString(),
            label: condition.value,
          })) || [];

      return [...notIsAfter, ...isAfter];
    }

    return (
      data?.conditions
        .filter((item) => !item.is_after)
        .map((condition) => ({
          value: condition.id.toString(),
          label: condition.value,
        })) || []
    );
  }

  return (
    <section>
      <div className="mx-auto px-4">
        <div className="flex items-center">
          <h2 className="flex-auto font-semibold text-gray-900">
            {format(firstDayCurrentMonth, "MMMM yyyy", { locale: id })}
          </h2>
          <button
            type="button"
            onClick={previousMonth}
            className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Previous month</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            onClick={nextMonth}
            type="button"
            className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Next month</span>
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-10 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
          {dayWeek.map((day, i) => (
            <div key={i}>{day}</div>
          ))}
        </div>
        <div className="mt-2 grid grid-cols-7 text-sm">
          {days.map((day, dayIdx) => (
            <div
              key={day.toString()}
              className={classNames(
                dayIdx === 0 && colStartClasses[getDay(day)],
                "py-1.5"
              )}
            >
              <button
                type="button"
                onClick={() => {
                  setSelectedDay(day);
                  setValue(null);
                }}
                className={classNames(
                  isEqual(day, selectedDay) && "text-white",
                  !isEqual(day, selectedDay) && isToday(day) && "text-primary",
                  !isEqual(day, selectedDay) &&
                    !isToday(day) &&
                    isSameMonth(day, firstDayCurrentMonth) &&
                    "text-slate-900",
                  !isEqual(day, selectedDay) &&
                    !isToday(day) &&
                    !isSameMonth(day, firstDayCurrentMonth) &&
                    "text-slate-400",
                  isEqual(day, selectedDay) && isToday(day) && "bg-primary",
                  isEqual(day, selectedDay) && !isToday(day) && "bg-primary/70",
                  !isEqual(day, selectedDay) && "hover:bg-gray-200",
                  (isEqual(day, selectedDay) || isToday(day)) &&
                    "font-semibold",
                  getNowDay(day)?.day && getNowDay(day)?.treatment !== null
                    ? "border border-primary"
                    : getNowDay(day)?.treatment === null
                    ? "border border-yellow-400"
                    : "",
                  "mx-auto flex h-8 w-8 items-center justify-center rounded-full"
                )}
              >
                <time dateTime={format(day, "yyyy-MM-dd")}>
                  {format(day, "d")}
                </time>
              </button>
            </div>
          ))}
        </div>
      </div>
      <section className="mt-6">
        <h2
          className="bg-slate-50/80 p-4 font-semibold text-gray-900"
          ref={refTitle}
        >
          Hasil untuk{" "}
          <time dateTime={format(selectedDay, "yyyy-MM-dd")}>
            {format(selectedDay, "eeee, dd MMM yyy", { locale: id })}
          </time>
        </h2>
        <div className="mx-auto mt-4 space-y-1 px-4 text-sm leading-6 text-gray-500">
          {data ? (
            getNowDay(selectedDay) &&
            getNowDay(selectedDay)?.treatment !== null ? (
              <>
                <div className="mb-4 rounded-2xl">
                  <div className="mb-[6px] text-p-ui font-bold text-slate-900">
                    {getNowDay(selectedDay)?.status === "IMPROVED"
                      ? "Cara Pencegahan Selanjutnya"
                      : "Cara Penanganan"}
                  </div>
                  {getNowDay(selectedDay)?.status ? (
                    <div className="mb-3 text-base font-bold">
                      Kondisi jamur tiram:{" "}
                      {conditionStatus(getNowDay(selectedDay)?.status || "")}
                    </div>
                  ) : (
                    <></>
                  )}
                  <table>
                    <tbody>
                      {getNowDay(selectedDay)?.treatment?.map((value, i) => (
                        <tr
                          key={i}
                          className="border-b border-slate-300 first:border-t odd:bg-slate-50/50"
                        >
                          <td
                            className="py-2 pl-1 pr-2 text-detail text-slate-900"
                            valign="top"
                          >
                            {i + 1}.
                          </td>
                          <td className="py-2 text-detail text-slate-900">
                            {value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {data.history.treatment.find(
                  (item) => item.treatment === null && item.day
                )?.day ? (
                  <Alert variant="info">
                    <Info className="h-4 w-4" />
                    <AlertTitle>Informasi</AlertTitle>
                    <AlertDescription>
                      Setelah melakukan penanganan, jangan lupa untuk konfirmasi
                      kondisi jamur tiram pada hari{" "}
                      <span
                        className="inline-flex cursor-pointer items-center gap-1 font-bold underline"
                        onClick={() => {
                          const date = parseToDate(
                            data.history.treatment.find(
                              (item) => item.treatment === null && item.day
                            )?.day || ""
                          );

                          if (isSameMonth(date, firstDayCurrentMonth)) {
                            setSelectedDay(date);
                          } else {
                            setCurrentMonth(format(date, "MMM-yyyy"));
                            setSelectedDay(date);
                          }
                          if (refTitle.current) {
                            const offsetPosition =
                              refTitle.current.getBoundingClientRect().top -
                              72 -
                              8;
                            window.scrollBy({
                              top: offsetPosition,
                              behavior: "smooth",
                            });
                          }
                        }}
                      >
                        {format(
                          parseISO(
                            data.history.treatment.find(
                              (item) => item.treatment === null && item.day
                            )?.day || ""
                          ),
                          "eeee, dd MMM yyy",
                          { locale: id }
                        )}{" "}
                        <ExternalLink className="inline h-4 w-4" />
                      </span>
                    </AlertDescription>
                  </Alert>
                ) : (
                  <></>
                )}
              </>
            ) : getNowDay(selectedDay)?.treatment === null ||
              isNullTreatmentLessThanToday(selectedDay) ? (
              <div className="text-slate-900">
                <div className="mb-3 text-base font-bold">
                  Bagaimana kondisi jamur tiram sekarang?
                </div>
                {!isSameDay(selectedDay, today) && (
                  <Alert variant="warning" className="mb-5">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Peringatan</AlertTitle>
                    <AlertDescription>
                      Konfirmasi kondisi jamur tiram harus dilakukan pada hari
                      yang sama.
                    </AlertDescription>
                  </Alert>
                )}
                <RadioBox
                  option={optionRadio()}
                  value={value}
                  onChange={(value) => setValue(value)}
                />
                <Button
                  isLoading={loadingSubmit}
                  onClick={(e) => {
                    e.preventDefault();
                    setLoadingSubmit(true);
                    fetch(API_URL + "/diagnose-add-day", {
                      method: "POST",
                      body: JSON.stringify({
                        diagnose_id: data.id,
                        condition_id: value ? value.value : null,
                      }),
                      headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                      },
                      credentials: "include",
                    })
                      .then((res) => {
                        if (res.ok) {
                          refetch?.();
                          if (isNullTreatmentLessThanToday(selectedDay)) {
                            setSelectedDay(getLastDayTreatment());
                          }
                          toast({
                            description: "Berhasil menyimpan data",
                            duration: 1500,
                          });
                        } else {
                          throw new Error(res.statusText);
                        }
                      })
                      .finally(() => {
                        setValue(null);
                        setLoadingSubmit(false);
                      });
                  }}
                  disabled={!(value && isSameDay(selectedDay, today))}
                  className="mt-4"
                >
                  Simpan
                </Button>
              </div>
            ) : (
              <p>
                Tidak ada hasil untuk{" "}
                {formatRelative(selectedDay, new Date(), { locale })}.
              </p>
            )
          ) : (
            <></>
          )}
        </div>
      </section>
    </section>
  );
}

const colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];
