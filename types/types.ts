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
  pest_disease: {
    label: string;
    treatment: string[];
    description: string;
  };
  percentage: number;
};

export enum LocalStorageKey {
  Diagnosis = "38f00f8738e241daea6f37f6f55ae8414d7b0219",
}
