export interface Metric {
  label: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
}

export interface PipelineProject {
  id: string;
  name: string;
  therapeuticArea: string;
  phase: 'Phase I' | 'Phase II' | 'Phase III' | 'Registration';
  status: 'On Track' | 'Delayed' | 'Accelerated';
  probabilityOfSuccess: number;
  estimatedLaunch: string;
}

export interface SalesData {
  month: string;
  specialtyCare: number;
  vaccines: number;
  generalMedicine: number;
}

export interface RegionalData {
  region: string;
  revenue: number;
  growth: number;
}

export interface CountryPresence {
  id: string;
  name: string;
  coordinates: [number, number]; // [lat, lng]
  treatments: string[];
  services: string[];
  revenue: string;
  employees: number;
}

export interface AppData {
  metrics: Metric[];
  pipeline: PipelineProject[];
  sales: SalesData[];
  regional: RegionalData[];
  countries: CountryPresence[];
}
