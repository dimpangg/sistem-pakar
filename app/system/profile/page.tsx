"use client";
import { Button, LoadingPage } from "@/components";
import { Input } from "@/components/molecules/Input";
import { toast } from "@/hooks";
import { getProfile, updateProfile } from "@/services";
import { IProfile } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const Profile = () => {
  const [profile, setProfile] = useState<IProfile>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

  useEffect(() => {
    getProfile()
      .then((res) => {
        setProfile(res.data);
        reset({
          name: res.data.name,
          email: res.data.email,
          phone: res.data.phone ?? "",
        });
      })
      .catch((err) => {
        setError(err.message ?? "Terjadi kesalahan");
      })
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const profileSchema = z.object({
    name: z.string().nonempty("Nama tidak boleh kosong"),
    email: z
      .string()
      .nonempty("Email tidak boleh kosong")
      .email("Email tidak valid"),
    phone: z.string().nonempty("Nomor telepon tidak boleh kosong").min(6, {
      message: "Nomor telepon tidak valid",
    }),
  });

  type ProfileForm = z.infer<typeof profileSchema>;

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    setError: setFormError,
  } = useForm<ProfileForm>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
    resolver: zodResolver(profileSchema),
  });

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <>
      <div className="mt-5 px-4">
        {error ? (
          <div className="text-h4 text-slate-900">{error}</div>
        ) : profile ? (
          <>
            <section className="mb-7 flex gap-2">
              <User size={36} className="text-emerald-400" />
              <div>
                <div className="text-h4 text-slate-900">Profile</div>
                <div className="text-detail text-slate-500">
                  Ubah informasi profil anda
                </div>
              </div>
            </section>

            <form
              className="flex flex-col gap-5"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit((data) => {
                  setLoadingSubmit(true);
                  updateProfile(data)
                    .then(() => {
                      setTimeout(() => {
                        window.location.reload();
                      }, 2000);
                      toast({
                        title: "Berhasil",
                        description: "Berhasil mengubah profil",
                        duration: 2000,
                      });
                    })
                    .catch((err) => {
                      if (err instanceof Response) {
                        err
                          .json()
                          .then(
                            (data: {
                              message: string;
                              errors: Record<string, string[]>;
                            }) => {
                              Object.entries(data.errors).forEach(
                                ([key, value]) => {
                                  setFormError(key as keyof ProfileForm, {
                                    message: value[0],
                                  });
                                }
                              );
                            }
                          );
                      }
                      setLoadingSubmit(false);
                      toast({
                        title: "Terjadi kesalahan",
                        description: "Gagal mengubah profil",
                        variant: "destructive",
                        duration: 2000,
                      });
                    });
                  // console.log(data);
                })();
              }}
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm text-muted-foreground">
                  Nama
                </label>
                <Input
                  placeholder="John Doe"
                  type="text"
                  {...register("name")}
                />
                {errors.name && (
                  <span className="text-xs text-destructive">
                    {errors.name.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-sm text-muted-foreground"
                >
                  Email
                </label>
                <Input
                  placeholder="contoh@gmail.com"
                  type="email"
                  {...register("email")}
                />
                {errors.email && (
                  <span className="text-xs text-destructive">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="phone"
                  className="text-sm text-muted-foreground"
                >
                  Nomor Telepon
                </label>
                <Input
                  placeholder="081234567890"
                  {...register("phone", {
                    onChange: (e) => {
                      const value = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 13);
                      e.target.value = value;
                    },
                  })}
                />
                {errors.phone && (
                  <span className="text-xs text-destructive">
                    {errors.phone.message}
                  </span>
                )}
              </div>
              <Button
                isLoading={loadingSubmit}
                fullWidth
                size="lg"
                type="submit"
              >
                Simpan
              </Button>
            </form>
          </>
        ) : null}
      </div>
    </>
  );
};

export default Profile;
