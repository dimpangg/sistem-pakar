import { Button, ChevronRight, Footer, Header } from "@/components";

export default function Home() {
  return (
    <>
      <Header />
      <div className="px-4">
        <div className="mt-2 flex flex-col gap-10 rounded-2xl bg-slate-50 px-4 py-8">
          <div>
            <div className="text-h2">
              Sistem Deteksi Hama dan Penyakit pada Jamur Tiram
            </div>
            <p className="mt-1 text-subtle text-slate-700">
              Sistem pakar untuk mendiagnosa dan mengendalikan masalah hama dan
              penyakit pada tanaman jamur tiram.
            </p>
          </div>
          <div>
            <Button className="flex justify-between gap-3">
              Mulai Diagnosa <ChevronRight />
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-2 flex w-full flex-col items-center">
        <div className="text-large text-slate-900">Support by</div>
        <div className="text-h2 text-slate-300">Mitra Jamur</div>
      </div>
      <Footer />
    </>
  );
}
