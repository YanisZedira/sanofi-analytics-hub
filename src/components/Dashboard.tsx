import React, { useState } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { ArrowUpRight, ArrowDownRight, Activity, Users, DollarSign, Microscope } from 'lucide-react';
import { mockData } from '../data';
import { motion } from 'motion/react';

const COLORS = ['#7A00E6', '#9D4DFF', '#C199FF', '#E5E5E5'];

import { translations, type Language } from '../translations';

export default function Dashboard({ language = 'en' }: { language?: Language }) {
  const [timePeriod, setTimePeriod] = useState('6m');
  const t = translations[language];

  const getFilteredSales = () => {
    if (timePeriod === '3m') return mockData.sales.slice(-3);
    return mockData.sales;
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">{t.dashboard}</h1>
        <p className="text-slate-500 mt-1">{t.realTimeMetrics}</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockData.metrics.map((metric, idx) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-card p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-slate-50 rounded-lg text-sanofi-purple">
                {idx === 0 && <DollarSign size={20} />}
                {idx === 1 && <Microscope size={20} />}
                {idx === 2 && <Activity size={20} />}
                {idx === 3 && <Users size={20} />}
              </div>
              <div className={cn(
                "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full",
                metric.trend === 'up' ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
              )}>
                {metric.trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {metric.change}%
              </div>
            </div>
            <h3 className="text-slate-500 text-sm font-medium">
              {metric.label === 'Revenue' ? t.revenue : 
               metric.label === 'R&D Spend' ? 'R&D Spend' : // Maybe add translation for this too if needed
               metric.label}
            </h3>
            <p className="text-2xl font-bold text-slate-900 mt-1">{metric.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sales Trend */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-8"
        >
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold">{t.revenueBySegment}</h3>
            <select 
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
              className="bg-slate-50 border-none text-sm rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-sanofi-purple/20 outline-none cursor-pointer"
            >
              <option value="6m">{t.last6Months}</option>
              <option value="3m">{t.lastQuarter}</option>
            </select>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={getFilteredSales()}>
                <defs>
                  <linearGradient id="colorSpecialty" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7A00E6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#7A00E6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="specialtyCare" stroke="#7A00E6" strokeWidth={3} fillOpacity={1} fill="url(#colorSpecialty)" />
                <Area type="monotone" dataKey="vaccines" stroke="#9D4DFF" strokeWidth={3} fill="transparent" />
                <Area type="monotone" dataKey="generalMedicine" stroke="#C199FF" strokeWidth={3} fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-6 mt-6 justify-center">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <div className="w-3 h-3 rounded-full bg-sanofi-purple" /> {t.specialtyCare}
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <div className="w-3 h-3 rounded-full bg-[#9D4DFF]" /> {t.vaccines}
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <div className="w-3 h-3 rounded-full bg-[#C199FF]" /> {t.generalMed}
            </div>
          </div>
        </motion.div>

        {/* Regional Performance */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-8"
        >
          <h3 className="text-lg font-bold mb-8">{t.regionalGrowth}</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockData.regional} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="region" type="category" axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 13, fontWeight: 500}} width={100} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="revenue" radius={[0, 4, 4, 0]} barSize={32}>
                  {mockData.regional.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 space-y-4">
            {mockData.regional.map((reg, idx) => (
              <div key={reg.region} className="flex justify-between items-center text-sm">
                <span className="text-slate-500">{reg.region}</span>
                <span className="font-bold text-emerald-600">+{reg.growth}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
