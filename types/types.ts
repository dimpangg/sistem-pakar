export type IconProps = {
  stroke?: string;
  fill?: string;
  color?: string;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
};

export type ICommonResponse<T> = {
  status: string;
  message: string;
  data: T;
};

export type ISymptoms = {
  code: string;
  label: string;
};

export type IDiagnostics = {
  id: string;
  pest_disease_id: string;
  percentage: number;
};

export type IDiagnoseDetail = {
  id: string;
  pest_disease: IPestDisease;
  days: string[] | null;
  history: {
    symptoms: ISymptoms[];
    treatment: ITreatmentItem[];
  };
  conditions: {
    id: number;
    status: string;
    value: string;
    treatment: string[];
    day: number;
    is_after: number | null;
  }[];
  created_at: string;
  updated_at: string;
};
export type IPestDisease = {
  id: string;
  label: string;
  code: string;
  treatment: string[];
  description: string;
};
export type ITreatmentItem = {
  day: string;
  treatment: string[] | null;
  value: string | null;
  status: string | null;
  id: number | null;
  code: string | null;
};

export type IDiagnoseList = {
  id: string;
  pest_disease: Omit<IPestDisease, "description">;
  badge: "Selesai" | "Butuh Konfirmasi";
  created_at: string;
  updated_at: Date;
};

export enum LocalStorageKey {
  Diagnosis = "38f00f8738e241daea6f37f6f55ae8414d7b0219",
  Token = "38f00f8738e241daea6f37f6fakmh8414d7b0219",
}
