import { Button, Footer, Header } from "@/components";
import { ChevronRight, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />
      <div className="px-4">
        <div className="mt-2 flex flex-col gap-10 rounded-2xl bg-slate-50 px-4 py-8">
          <div>
            <div className="text-h2">
              Sistem Deteksi Hama dan Penyakit pada{" "}
              <span className="text-emerald-400">Jamur Tiram</span>
            </div>
            <p className="mt-1 text-subtle text-slate-700">
              Sistem pakar untuk mendiagnosa dan mengendalikan masalah hama dan
              penyakit pada tanaman jamur tiram.
            </p>
          </div>
          <div>
            <Link href="/diagnose">
              <Button className="flex justify-between gap-3">
                Mulai Diagnosa <ChevronRight />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-6 flex w-full flex-col items-center">
        <div className="text-large text-slate-900">Support by</div>
        <div className="text-h2 text-slate-300">Mitra Jamur</div>
      </div>
      <section className="mt-12 mb-5 px-4">
        <div className="mb-3 text-h2 text-slate-900">Features</div>
        <div className="flex flex-col gap-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="flex gap-3 rounded-[10px] border-[1px] border-solid border-slate-50 bg-white px-4 py-6"
              style={{
                boxShadow: "0px 3px 28px rgba(0, 0, 0, 0.05)",
              }}
            >
              <CheckCircle className="text-slate-900" />
              <span className="text-detail text-slate-900">
                An expert detection system to diagnose and control pest and
                disease issues in.
              </span>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
