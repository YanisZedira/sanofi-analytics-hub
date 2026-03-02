import React, { useState } from 'react';
import { FlaskConical, Calendar, Target, AlertCircle, CheckCircle2, Clock, Filter } from 'lucide-react';
import { mockData } from '../data';
import { motion } from 'motion/react';

import { translations, type Language } from '../translations';

export default function Pipeline({ language = 'en' }: { language?: Language }) {
  const [filterArea, setFilterArea] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const t = translations[language];

  const therapeuticAreas = [t.allAreas, ...new Set(mockData.pipeline.map(p => p.therapeuticArea))];
  const statuses = [t.allStatuses, t.onTrack, t.accelerated, t.delayed];

  const filteredPipeline = mockData.pipeline.filter(p => {
    const statusMap: Record<string, string> = {
      'On Track': t.onTrack,
      'Accelerated': t.accelerated,
      'Delayed': t.delayed
    };
    const translatedStatus = statusMap[p.status] || p.status;

    return (filterArea === t.allAreas || p.therapeuticArea === filterArea) &&
           (filterStatus === t.allStatuses || translatedStatus === filterStatus);
  });

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{t.pipeline}</h1>
          <p className="text-slate-500 mt-1">{t.trackingPrograms.replace('{count}', filteredPipeline.length.toString())}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2">
            <Filter size={14} className="text-slate-400" />
            <select 
              value={filterArea}
              onChange={(e) => setFilterArea(e.target.value)}
              className="text-xs font-bold bg-transparent border-none outline-none cursor-pointer"
            >
              {therapeuticAreas.map(area => <option key={area} value={area}>{area}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2">
            <Clock size={14} className="text-slate-400" />
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="text-xs font-bold bg-transparent border-none outline-none cursor-pointer"
            >
              {statuses.map(status => <option key={status} value={status}>{status}</option>)}
            </select>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {filteredPipeline.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="glass-card p-6 flex flex-col md:flex-row items-center gap-8 group hover:border-sanofi-purple/30 transition-all"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-sanofi-purple bg-sanofi-purple/10 px-2 py-1 rounded">
                  {project.therapeuticArea}
                </span>
                <span className={cn(
                  "text-[10px] font-bold uppercase px-2 py-1 rounded flex items-center gap-1",
                  project.status === 'Accelerated' ? "bg-emerald-50 text-emerald-600" : 
                  project.status === 'Delayed' ? "bg-rose-50 text-rose-600" : "bg-blue-50 text-blue-600"
                )}>
                  {project.status === 'Accelerated' && <CheckCircle2 size={10} />}
                  {project.status === 'Delayed' && <AlertCircle size={10} />}
                  {project.status === 'On Track' && <Clock size={10} />}
                  {project.status === 'Accelerated' ? t.accelerated : 
                   project.status === 'Delayed' ? t.delayed : 
                   project.status === 'On Track' ? t.onTrack : project.status}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-sanofi-purple transition-colors">{project.name}</h3>
              <div className="flex items-center gap-4 mt-4 text-sm text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Target size={16} />
                  <span>{project.phase}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar size={16} />
                  <span>{t.estLaunch}: {project.estimatedLaunch}</span>
                </div>
              </div>
            </div>

            <div className="w-full md:w-64 space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-500 uppercase">
                <span>{t.probabilityOfSuccess}</span>
                <span>{project.probabilityOfSuccess}%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${project.probabilityOfSuccess}%` }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 + (idx * 0.05) }}
                  className={cn(
                    "h-full rounded-full",
                    project.probabilityOfSuccess > 70 ? "bg-emerald-500" : 
                    project.probabilityOfSuccess > 40 ? "bg-amber-500" : "bg-rose-500"
                  )}
                />
              </div>
            </div>

            <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:text-sanofi-purple hover:bg-sanofi-purple/5 transition-colors">
              <FlaskConical size={20} />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
