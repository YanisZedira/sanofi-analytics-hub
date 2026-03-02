import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { DollarSign, TrendingUp, CreditCard, Wallet } from 'lucide-react';
import { motion } from 'motion/react';

const data = [
  { name: 'Specialty Care', value: 45 },
  { name: 'Vaccines', value: 25 },
  { name: 'General Med', value: 20 },
  { name: 'Consumer Health', value: 10 },
];

const COLORS = ['#7A00E6', '#9D4DFF', '#C199FF', '#E2E8F0'];

import { translations, type Language } from '../translations';

export default function Financials({ language = 'en' }: { language?: Language }) {
  const t = translations[language];

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">{t.financials}</h1>
        <p className="text-slate-500 mt-1">{t.financialBreakdown}</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 glass-card p-8"
        >
          <h3 className="text-lg font-bold mb-8">{t.quarterlyRevenue}</h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { q: 'Q1 2023', rev: 10.2 },
                { q: 'Q2 2023', rev: 10.5 },
                { q: 'Q3 2023', rev: 10.8 },
                { q: 'Q4 2023', rev: 11.2 },
                { q: 'Q1 2024 (Est)', rev: 11.5 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="q" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} unit="B" />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="rev" fill="#7A00E6" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-8"
        >
          <h3 className="text-lg font-bold mb-8">{t.revenueMix}</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.map(item => ({
                    ...item,
                    name: item.name === 'Specialty Care' ? t.specialtyCare :
                          item.name === 'Vaccines' ? t.vaccines :
                          item.name === 'General Med' ? t.generalMed :
                          item.name === 'Consumer Health' ? t.consumerHealth : item.name
                  }))}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-4">
            {data.map((item, idx) => (
              <div key={item.name} className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx] }} />
                  <span className="text-slate-500">
                    {item.name === 'Specialty Care' ? t.specialtyCare :
                     item.name === 'Vaccines' ? t.vaccines :
                     item.name === 'General Med' ? t.generalMed :
                     item.name === 'Consumer Health' ? t.consumerHealth : item.name}
                  </span>
                </div>
                <span className="font-bold">{item.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: t.ebitdaMargin, value: '32.4%', icon: TrendingUp, color: 'text-emerald-600' },
          { label: t.freeCashFlow, value: '€2.4B', icon: Wallet, color: 'text-blue-600' },
          { label: t.dividendYield, value: '4.1%', icon: CreditCard, color: 'text-sanofi-purple' },
        ].map((item, idx) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + idx * 0.1 }}
            className="glass-card p-6 flex items-center gap-4"
          >
            <div className={cn("p-3 bg-slate-50 rounded-xl", item.color)}>
              <item.icon size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{item.label}</p>
              <p className="text-xl font-bold text-slate-900">{item.value}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
