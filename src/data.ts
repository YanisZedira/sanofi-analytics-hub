import { AppData, PipelineProject } from './types';

export const mockData: AppData = {
  metrics: [
    { label: 'Total Revenue (Q4)', value: '€11.2B', change: 4.2, trend: 'up' },
    { label: 'R&D Investment', value: '€1.8B', change: 12.5, trend: 'up' },
    { label: 'Active Clinical Trials', value: 84, change: 5, trend: 'up' },
    { label: 'Market Cap', value: '€118.5B', change: -1.2, trend: 'down' },
  ],
  pipeline: [
    {
      id: '1',
      name: 'SAR444245 (IL-2)',
      therapeuticArea: 'Oncology',
      phase: 'Phase II',
      status: 'On Track',
      probabilityOfSuccess: 65,
      estimatedLaunch: '2026',
    },
    {
      id: '2',
      name: 'Dupixent (COPD)',
      therapeuticArea: 'Immunology',
      phase: 'Registration',
      status: 'Accelerated',
      probabilityOfSuccess: 95,
      estimatedLaunch: '2024',
    },
    {
      id: '3',
      name: 'Tolebrutinib',
      therapeuticArea: 'Neurology',
      phase: 'Phase III',
      status: 'On Track',
      probabilityOfSuccess: 78,
      estimatedLaunch: '2025',
    },
    {
      id: '4',
      name: 'Beyfortus',
      therapeuticArea: 'Vaccines',
      phase: 'Registration',
      status: 'On Track',
      probabilityOfSuccess: 99,
      estimatedLaunch: '2024',
    },
    {
      id: '5',
      name: 'SAR442168',
      therapeuticArea: 'Rare Diseases',
      phase: 'Phase II',
      status: 'Delayed',
      probabilityOfSuccess: 45,
      estimatedLaunch: '2027',
    },
  ],
  sales: [
    { month: 'Jan', specialtyCare: 2100, vaccines: 800, generalMedicine: 1500 },
    { month: 'Feb', specialtyCare: 2200, vaccines: 750, generalMedicine: 1450 },
    { month: 'Mar', specialtyCare: 2400, vaccines: 900, generalMedicine: 1600 },
    { month: 'Apr', specialtyCare: 2300, vaccines: 850, generalMedicine: 1550 },
    { month: 'May', specialtyCare: 2500, vaccines: 950, generalMedicine: 1700 },
    { month: 'Jun', specialtyCare: 2700, vaccines: 1100, generalMedicine: 1650 },
  ],
  regional: [
    { region: 'United States', revenue: 4800, growth: 8.5 },
    { region: 'Europe', revenue: 3200, growth: 3.2 },
    { region: 'China', revenue: 1500, growth: 12.0 },
    { region: 'Rest of World', revenue: 1700, growth: 5.4 },
  ],
  countries: [
    {
      id: 'fr',
      name: 'France',
      coordinates: [48.8566, 2.3522],
      treatments: ['Dupixent', 'Lantus', 'Praluent'],
      services: ['R&D Excellence Center', 'Bioproduction Hub'],
      revenue: '€2.4B',
      employees: 25000
    },
    {
      id: 'us',
      name: 'United States',
      coordinates: [37.0902, -95.7129],
      treatments: ['Dupixent', 'Aubagio', 'Kevzara'],
      services: ['Commercial HQ', 'Specialty Care Hub'],
      revenue: '€15.2B',
      employees: 12000
    },
    {
      id: 'cn',
      name: 'China',
      coordinates: [35.8617, 104.1954],
      treatments: ['Plavix', 'Aprovel', 'Toujeo'],
      services: ['Digital Innovation Lab', 'Manufacturing'],
      revenue: '€3.1B',
      employees: 8000
    },
    {
      id: 'br',
      name: 'Brazil',
      coordinates: [-14.2350, -51.9253],
      treatments: ['Vaccines', 'General Medicine'],
      services: ['Distribution Center', 'Public Health Partnership'],
      revenue: '€0.9B',
      employees: 3500
    },
    {
      id: 'in',
      name: 'India',
      coordinates: [20.5937, 78.9629],
      treatments: ['Insulin', 'Consumer Healthcare'],
      services: ['Global Service Center', 'Manufacturing'],
      revenue: '€0.7B',
      employees: 5000
    },
    {
      id: 'jp',
      name: 'Japan',
      coordinates: [36.2048, 138.2529],
      treatments: ['Dupixent', 'Praluent'],
      services: ['R&D Hub', 'Commercial Operations'],
      revenue: '€1.8B',
      employees: 2800
    },
    {
      id: 'de',
      name: 'Germany',
      coordinates: [51.1657, 10.4515],
      treatments: ['Lantus', 'Toujeo'],
      services: ['Manufacturing Excellence', 'R&D'],
      revenue: '€2.1B',
      employees: 9000
    }
  ]
};
