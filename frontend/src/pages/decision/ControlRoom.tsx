import React, { useState, useMemo } from 'react';
import { 
  HeartPulse, ShieldAlert, GitMerge, Activity, ShieldCheck, Wrench, 
  Calendar, Plus, LayoutGrid, Settings, Bell, Lightbulb, FileText, 
  ChevronDown, ArrowUpRight, ArrowDownRight, Maximize2, Check, AlertTriangle, Search, Filter, ChevronLeft, ChevronRight, Download, Eye, Zap, Wind, Droplets
} from 'lucide-react';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

import { operationsStats, runningEquipment } from '../../mock/operations.mock';
import { commandAlerts } from '../../mock/alerts.mock';
import { commandAIInsights } from '../../mock/aiInsights.mock';
import { commandReports } from '../../mock/reports.mock';
import { commandActivity } from '../../mock/activity.mock';

type TabType = 'overview' | 'operations' | 'alerts' | 'ai' | 'reports' | 'activity';

export const ControlRoom: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const tabs = [
    { id: 'overview', icon: LayoutGrid, label: 'Overview' },
    { id: 'operations', icon: Settings, label: 'Operations' },
    { id: 'alerts', icon: Bell, label: 'Alerts' },
    { id: 'ai', icon: Lightbulb, label: 'AI Insights' },
    { id: 'reports', icon: FileText, label: 'Reports' },
    { id: 'activity', icon: Activity, label: 'Activity' }
  ];

  return (
    <div className="flex-1 bg-[#0b1120] p-6 space-y-8 min-h-screen">
      {/* Secondary Module Navigation (Tabs) */}
      <div className="flex items-center gap-1 overflow-x-auto border-b border-slate-800 pb-1 -mx-6 px-6 mb-8 custom-scrollbar">
        {tabs.map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabType)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap ${activeTab === tab.id ? 'bg-blue-600/10 text-blue-400' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}>
            <tab.icon className="w-4 h-4" /> {tab.label}
          </button>
        ))}
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Command Center</h1>
          <p className="text-slate-400 mt-1 text-sm">Real-time overview of your industrial operations</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 bg-[#111827] border-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white">
            <Calendar className="w-4 h-4" /> Last 7 Days
          </Button>
          <Button className="gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-lg shadow-blue-500/20">
            <Plus className="w-4 h-4" /> Add Widget
          </Button>
        </div>
      </div>

      {activeTab === 'overview' && <OverviewTab setActiveTab={setActiveTab} />}
      {activeTab === 'operations' && <OperationsTab />}
      {activeTab === 'alerts' && <AlertsTab />}
      {activeTab === 'ai' && <AITab />}
      {activeTab === 'reports' && <ReportsTab />}
      {activeTab === 'activity' && <ActivityTab />}
    </div>
  );
};

// --- TABS COMPONENTS ---

const OverviewTab = ({ setActiveTab }: { setActiveTab: (t: TabType) => void }) => (
  <div className="space-y-8 animate-in fade-in duration-300">
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
      <Card className="bg-[#111827] border-slate-800/60 shadow-md">
        <CardContent className="p-4 relative overflow-hidden">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
              <HeartPulse className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <p className="text-xs font-medium text-slate-400">Overall Health</p>
              <p className="text-2xl font-bold text-white mt-0.5">92%</p>
              <p className="text-[10px] text-emerald-400 mt-1 flex items-center gap-0.5"><ArrowUpRight className="w-3 h-3"/> 6% <span className="text-slate-500 ml-1">vs last 7 days</span></p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-8 opacity-20">
            <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="w-full h-full stroke-emerald-500 fill-none stroke-2">
              <path d="M0 15 L20 12 L40 18 L60 8 L80 14 L100 5" />
            </svg>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#111827] border-slate-800/60 shadow-md">
        <CardContent className="p-4 relative overflow-hidden">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <p className="text-xs font-medium text-slate-400">Critical Alerts</p>
              <p className="text-2xl font-bold text-white mt-0.5">8</p>
              <p className="text-[10px] text-emerald-400 mt-1 flex items-center gap-0.5"><ArrowDownRight className="w-3 h-3"/> 2 <span className="text-slate-500 ml-1">vs last 7 days</span></p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-8 opacity-20">
            <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="w-full h-full stroke-red-500 fill-none stroke-2">
              <path d="M0 5 L20 14 L40 8 L60 18 L80 12 L100 15" />
            </svg>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#111827] border-slate-800/60 shadow-md">
        <CardContent className="p-4 relative overflow-hidden">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
              <GitMerge className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <p className="text-xs font-medium text-slate-400">Open Workflows</p>
              <p className="text-2xl font-bold text-white mt-0.5">15</p>
              <p className="text-[10px] text-red-400 mt-1 flex items-center gap-0.5"><ArrowUpRight className="w-3 h-3"/> 3 <span className="text-slate-500 ml-1">vs last 7 days</span></p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-8 opacity-20">
            <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="w-full h-full stroke-blue-500 fill-none stroke-2">
              <path d="M0 15 L20 18 L40 10 L60 14 L80 8 L100 5" />
            </svg>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#111827] border-slate-800/60 shadow-md">
        <CardContent className="p-4 relative overflow-hidden">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
              <Activity className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <p className="text-xs font-medium text-slate-400">Predicted Failures</p>
              <p className="text-2xl font-bold text-white mt-0.5">5</p>
              <p className="text-[10px] text-red-400 mt-1 flex items-center gap-0.5"><ArrowUpRight className="w-3 h-3"/> 1 <span className="text-slate-500 ml-1">vs last 7 days</span></p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-8 opacity-20">
            <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="w-full h-full stroke-amber-500 fill-none stroke-2">
              <path d="M0 12 L20 15 L40 10 L60 12 L80 5 L100 8" />
            </svg>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#111827] border-slate-800/60 shadow-md">
        <CardContent className="p-4 relative overflow-hidden">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <p className="text-xs font-medium text-slate-400">Compliance Score</p>
              <p className="text-2xl font-bold text-white mt-0.5">95%</p>
              <p className="text-[10px] text-emerald-400 mt-1 flex items-center gap-0.5"><ArrowUpRight className="w-3 h-3"/> 4% <span className="text-slate-500 ml-1">vs last 7 days</span></p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-8 opacity-20">
            <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="w-full h-full stroke-purple-500 fill-none stroke-2">
              <path d="M0 15 L20 12 L40 18 L60 8 L80 14 L100 5" />
            </svg>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#111827] border-slate-800/60 shadow-md">
        <CardContent className="p-4 relative overflow-hidden">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-teal-500/10 text-teal-500 flex items-center justify-center shrink-0">
              <Wrench className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <p className="text-xs font-medium text-slate-400">Maintenance Due</p>
              <p className="text-2xl font-bold text-white mt-0.5">12</p>
              <p className="text-[10px] text-emerald-400 mt-1 flex items-center gap-0.5"><ArrowDownRight className="w-3 h-3"/> 4 <span className="text-slate-500 ml-1">vs last 7 days</span></p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-8 opacity-20">
            <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="w-full h-full stroke-teal-500 fill-none stroke-2">
              <path d="M0 5 L20 14 L40 8 L60 18 L80 12 L100 15" />
            </svg>
          </div>
        </CardContent>
      </Card>
    </div>

    {/* Middle Section */}
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <Card className="bg-[#111827] border-slate-800/60 shadow-md xl:col-span-1 flex flex-col">
        <div className="p-4 border-b border-slate-800/60 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">Operational Overview</h3>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 px-2 py-1 bg-slate-800 rounded text-xs text-slate-300">All Plants <ChevronDown className="w-3 h-3" /></button>
            <button onClick={() => setActiveTab('operations')} className="p-1 text-slate-400 hover:text-white rounded"><Maximize2 className="w-3 h-3" /></button>
          </div>
        </div>
        <CardContent className="p-0 flex-1 relative flex flex-col">
           <div className="flex-1 bg-[url('/factory-map.png')] bg-cover bg-center relative overflow-hidden flex items-center justify-center min-h-[300px] group">
             <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent z-10 pointer-events-none" />
             <div className="relative z-20 w-full h-full">
                <div className="absolute top-[35%] left-[25%] flex flex-col items-center group/pin cursor-pointer hover:scale-110 transition-transform z-30">
                   <div className="w-8 h-8 bg-[#111827]/80 backdrop-blur-md rounded-full border-2 border-emerald-500 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)]"><Check className="w-4 h-4 text-emerald-400" /></div>
                   <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-emerald-500 -mt-0.5" />
                   <div className="absolute bottom-full mb-2 opacity-0 group-hover/pin:opacity-100 transition-opacity bg-[#111827] border border-emerald-500/50 text-white text-[10px] font-semibold px-2 py-1 rounded shadow-lg whitespace-nowrap pointer-events-none">Pune Plant - Healthy</div>
                </div>
                <div className="absolute top-[55%] left-[45%] flex flex-col items-center group/pin cursor-pointer hover:scale-110 transition-transform z-30">
                   <div className="w-8 h-8 bg-[#111827]/80 backdrop-blur-md rounded-full border-2 border-amber-500 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.3)] animate-pulse"><AlertTriangle className="w-4 h-4 text-amber-400" /></div>
                   <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-amber-500 -mt-0.5" />
                   <div className="absolute bottom-full mb-2 opacity-0 group-hover/pin:opacity-100 transition-opacity bg-[#111827] border border-amber-500/50 text-white text-[10px] font-semibold px-2 py-1 rounded shadow-lg whitespace-nowrap pointer-events-none">Chakan MIDC - Warning</div>
                </div>
                <div className="absolute top-[45%] left-[60%] flex flex-col items-center group/pin cursor-pointer hover:scale-110 transition-transform z-30">
                   <div className="w-8 h-8 bg-[#111827]/80 backdrop-blur-md rounded-full border-2 border-red-500 flex items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.3)]"><AlertTriangle className="w-4 h-4 text-red-400" /></div>
                   <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-red-500 -mt-0.5" />
                   <div className="absolute bottom-full mb-2 opacity-0 group-hover/pin:opacity-100 transition-opacity bg-[#111827] border border-red-500/50 text-white text-[10px] font-semibold px-2 py-1 rounded shadow-lg whitespace-nowrap pointer-events-none">Nashik Plant - Critical</div>
                </div>
                <div className="absolute top-[25%] left-[70%] flex flex-col items-center group/pin cursor-pointer hover:scale-110 transition-transform z-30">
                   <div className="w-8 h-8 bg-[#111827]/80 backdrop-blur-md rounded-full border-2 border-emerald-500 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)]"><Check className="w-4 h-4 text-emerald-400" /></div>
                   <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-emerald-500 -mt-0.5" />
                   <div className="absolute bottom-full mb-2 opacity-0 group-hover/pin:opacity-100 transition-opacity bg-[#111827] border border-emerald-500/50 text-white text-[10px] font-semibold px-2 py-1 rounded shadow-lg whitespace-nowrap pointer-events-none">Vadodara Plant - Healthy</div>
                </div>
             </div>
             <div className="absolute top-4 left-4 z-20 space-y-2 bg-[#111827]/80 backdrop-blur-md p-3 rounded-xl border border-slate-800/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center gap-2 text-xs text-slate-300"><div className="w-2 h-2 rounded-full bg-emerald-500" /> Healthy <span className="ml-4 font-mono text-slate-400">124</span></div>
                <div className="flex items-center gap-2 text-xs text-slate-300"><div className="w-2 h-2 rounded-full bg-amber-500" /> Warning <span className="ml-4 font-mono text-slate-400">18</span></div>
                <div className="flex items-center gap-2 text-xs text-slate-300"><div className="w-2 h-2 rounded-full bg-red-500" /> Critical <span className="ml-4 font-mono text-slate-400">7</span></div>
                <div className="flex items-center gap-2 text-xs text-slate-300"><div className="w-2 h-2 rounded-full bg-slate-500" /> Offline <span className="ml-4 font-mono text-slate-400">3</span></div>
             </div>
           </div>
           <div className="grid grid-cols-4 gap-2 p-4 border-t border-slate-800/60 z-20 bg-[#111827]">
             <div><p className="text-[10px] text-slate-400 mb-1">Pune</p><p className="text-xs text-emerald-400 mb-1">Healthy 89%</p><div className="w-full bg-slate-800 h-1 rounded-full"><div className="bg-emerald-500 h-full rounded-full w-[89%]" /></div></div>
             <div><p className="text-[10px] text-slate-400 mb-1">Chakan</p><p className="text-xs text-amber-500 mb-1">Warning 72%</p><div className="w-full bg-slate-800 h-1 rounded-full"><div className="bg-amber-500 h-full rounded-full w-[72%]" /></div></div>
             <div><p className="text-[10px] text-slate-400 mb-1">Nashik</p><p className="text-xs text-red-500 mb-1">Critical 45%</p><div className="w-full bg-slate-800 h-1 rounded-full"><div className="bg-red-500 h-full rounded-full w-[45%]" /></div></div>
             <div><p className="text-[10px] text-slate-400 mb-1">Vadodara</p><p className="text-xs text-emerald-400 mb-1">Healthy 94%</p><div className="w-full bg-slate-800 h-1 rounded-full"><div className="bg-emerald-500 h-full rounded-full w-[94%]" /></div></div>
           </div>
        </CardContent>
      </Card>

      <Card className="bg-[#111827] border-slate-800/60 shadow-md xl:col-span-1">
        <div className="p-4 border-b border-slate-800/60 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">AI Recommendations</h3>
          <button onClick={() => setActiveTab('ai')} className="text-xs text-blue-400 hover:text-blue-300">View All</button>
        </div>
        <CardContent className="p-4 space-y-3">
          {commandAIInsights.slice(0, 3).map(insight => (
            <div key={insight.id} onClick={() => setActiveTab('ai')} className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-4 flex items-start gap-4 hover:bg-slate-800/50 transition-colors cursor-pointer group">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${insight.confidence > 90 ? 'bg-red-500/10 border-red-500/20 text-red-500' : 'bg-amber-500/10 border-amber-500/20 text-amber-500'}`}>
                {insight.confidence > 90 ? <ShieldAlert className="w-5 h-5"/> : <Wrench className="w-5 h-5"/>}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors truncate max-w-[150px]">{insight.title}</h4>
                  <span className="text-[10px] bg-amber-500/10 text-amber-500 px-1.5 py-0.5 rounded border border-amber-500/20">{insight.businessImpact}</span>
                </div>
                <p className="text-xs text-slate-400 mt-1 leading-snug">{insight.recommendedAction}</p>
                <div className="flex items-center gap-4 mt-2 text-[10px] text-slate-500">
                  <span>Asset: {insight.linkedAsset}</span>
                  <span>•</span>
                  <span>Confidence: {insight.confidence}%</span>
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-500 -rotate-90 mt-1 group-hover:text-white" />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-[#111827] border-slate-800/60 shadow-md xl:col-span-1">
        <div className="p-4 border-b border-slate-800/60 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">Recent Alerts</h3>
          <button onClick={() => setActiveTab('alerts')} className="text-xs text-blue-400 hover:text-blue-300">View All</button>
        </div>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-800/60">
            {commandAlerts.slice(0, 5).map(alert => (
              <div key={alert.id} onClick={() => setActiveTab('alerts')} className="p-4 flex items-start justify-between hover:bg-slate-800/30 transition-colors cursor-pointer">
                 <div className="flex gap-3">
                   <div className="mt-0.5">
                      {alert.severity === 'Critical' ? <ShieldAlert className="w-4 h-4 text-red-500" /> 
                      : alert.severity === 'High' ? <AlertTriangle className="w-4 h-4 text-amber-500" />
                      : <Activity className="w-4 h-4 text-blue-500" />}
                   </div>
                   <div>
                     <p className="text-sm font-medium text-slate-200">{alert.type}</p>
                     <p className="text-xs text-slate-500 mt-0.5">{alert.assetName}</p>
                   </div>
                 </div>
                 <div className="flex items-center gap-2 text-xs text-slate-500">
                   Just now <div className={`w-1.5 h-1.5 rounded-full ${alert.severity === 'Critical' ? 'bg-red-500' : 'bg-amber-500'}`} />
                 </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>

    <Card className="bg-[#111827] border-slate-800/60 shadow-md">
      <div className="p-4 border-b border-slate-800/60 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">Activity Timeline</h3>
        <button onClick={() => setActiveTab('activity')} className="text-xs text-blue-400 hover:text-blue-300">View All Activity</button>
      </div>
      <CardContent className="p-8">
        <div className="relative flex justify-between overflow-x-auto custom-scrollbar pb-4">
           <div className="absolute top-4 left-6 right-6 h-px bg-slate-800 z-0 min-w-[800px]"></div>
           {commandActivity.slice(0, 6).map((act, i) => (
             <div key={act.id} className="relative z-10 flex flex-col items-center text-center w-40 min-w-[160px]">
               <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center border border-blue-500/20 mb-3">
                 <Activity className="w-4 h-4" />
               </div>
               <p className="text-xs font-semibold text-slate-200">{act.action}</p>
               <p className="text-[10px] text-slate-500 mt-0.5">{act.module}</p>
               <p className="text-[10px] text-slate-400 mt-2">{act.time}</p>
               <p className="text-[10px] text-slate-500">By {act.user}</p>
             </div>
           ))}
        </div>
      </CardContent>
    </Card>
  </div>
);

const OperationsTab = () => {
  const trendData = [
    { time: '08:00', prod: 120, target: 150 }, { time: '10:00', prod: 250, target: 300 }, { time: '12:00', prod: 410, target: 450 },
    { time: '14:00', prod: 580, target: 600 }, { time: '16:00', prod: 720, target: 750 }, { time: '18:00', prod: 900, target: 900 }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-4">
        {[
          { label: 'Plant Status', value: operationsStats.plantStatus, color: 'text-emerald-400' },
          { label: 'OEE', value: operationsStats.oee, color: 'text-blue-400' },
          { label: 'Production Achieved', value: operationsStats.productionAchieved, color: 'text-white' },
          { label: 'Target', value: operationsStats.productionTarget, color: 'text-slate-400' },
          { label: 'Running Equip', value: operationsStats.runningEquipment, color: 'text-emerald-400' },
          { label: 'Stopped Equip', value: operationsStats.stoppedEquipment, color: 'text-red-400' },
          { label: 'Power Usage', value: operationsStats.powerConsumption, color: 'text-amber-400' },
          { label: 'Operators on Shift', value: operationsStats.operatorsOnShift, color: 'text-white' }
        ].map((s, i) => (
          <Card key={i} className="bg-[#111827] border-slate-800/60">
            <CardContent className="p-4 text-center">
              <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">{s.label}</p>
              <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card className="bg-[#111827] border-slate-800/60 h-[400px] flex flex-col">
          <div className="p-4 border-b border-slate-800/60"><h3 className="font-semibold text-white">Live Production Trend</h3></div>
          <CardContent className="p-6 flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorProd" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} />
                <RechartsTooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }} />
                <Area type="monotone" dataKey="prod" stroke="#3b82f6" fillOpacity={1} fill="url(#colorProd)" name="Production" />
                <Line type="monotone" dataKey="target" stroke="#64748b" strokeDasharray="5 5" dot={false} name="Target" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="bg-[#111827] border-slate-800/60 h-[400px] flex flex-col">
          <div className="p-4 border-b border-slate-800/60 flex justify-between items-center">
            <h3 className="font-semibold text-white">Equipment Status</h3>
            <Button variant="outline" size="sm" className="bg-slate-900 border-slate-700 text-slate-300">Export CSV</Button>
          </div>
          <CardContent className="p-0 flex-1 overflow-y-auto custom-scrollbar">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-[#0b1120] text-slate-400 text-xs border-b border-slate-800/60 sticky top-0">
                <tr><th className="px-4 py-3">Asset</th><th className="px-4 py-3">Plant</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Uptime</th><th className="px-4 py-3">Performance</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40">
                {runningEquipment.map(eq => (
                  <tr key={eq.id} className="hover:bg-slate-800/30">
                    <td className="px-4 py-3 font-medium text-slate-200">{eq.name}</td>
                    <td className="px-4 py-3 text-xs">{eq.plant}</td>
                    <td className="px-4 py-3"><span className={`px-2 py-1 rounded text-[10px] font-bold tracking-wider border ${eq.status === 'Running' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>{eq.status}</span></td>
                    <td className="px-4 py-3 font-mono text-xs">{eq.uptime}</td>
                    <td className="px-4 py-3 font-mono text-xs text-blue-400">{eq.performance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const AlertsTab = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const limit = 15;
  const filtered = useMemo(() => commandAlerts.filter(c => c.assetName.toLowerCase().includes(search.toLowerCase()) || c.type.toLowerCase().includes(search.toLowerCase())), [search]);
  const paginated = filtered.slice((page-1)*limit, page*limit);

  return (
    <Card className="bg-[#111827] border-slate-800/60 shadow-md animate-in fade-in duration-300">
      <div className="p-4 border-b border-slate-800/60 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <h3 className="font-semibold text-white flex items-center gap-2">Global Alarm & Alert Center</h3>
        <div className="flex gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input type="text" placeholder="Search alerts..." value={search} onChange={e => {setSearch(e.target.value); setPage(1);}} className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500" />
          </div>
          <Button variant="outline" className="bg-slate-900 border-slate-700 text-slate-300"><Filter className="w-4 h-4"/></Button>
        </div>
      </div>
      <div className="overflow-x-auto min-h-[500px]">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-[#0b1120] text-slate-400 font-semibold text-[10px] uppercase tracking-wider border-b border-slate-800/60">
            <tr><th className="px-6 py-4">Alert ID</th><th className="px-6 py-4">Timestamp</th><th className="px-6 py-4">Alert Type</th><th className="px-6 py-4">Asset/Plant</th><th className="px-6 py-4">Severity</th><th className="px-6 py-4">Status</th><th className="px-6 py-4">Assigned To</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-800/40">
            {paginated.map(a => (
              <tr key={a.id} className="hover:bg-slate-800/30 cursor-pointer">
                <td className="px-6 py-4 font-mono text-xs">{a.id}</td>
                <td className="px-6 py-4 text-xs text-slate-400">{a.timestamp}</td>
                <td className="px-6 py-4 font-medium text-slate-200">{a.type}</td>
                <td className="px-6 py-4"><p className="text-slate-300">{a.assetName}</p><p className="text-[10px] text-slate-500 mt-1">{a.plantName}</p></td>
                <td className="px-6 py-4"><span className={`px-2 py-1 rounded text-[10px] uppercase font-bold tracking-wider border ${a.severity === 'Critical' ? 'bg-red-500/10 text-red-400 border-red-500/20' : a.severity === 'High' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'}`}>{a.severity}</span></td>
                <td className="px-6 py-4 text-xs">{a.status}</td>
                <td className="px-6 py-4">{a.assignedEngineer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 border-t border-slate-800/60 flex justify-between items-center text-sm text-slate-400">
        <span>Showing {(page-1)*limit + 1} to {Math.min(page*limit, filtered.length)} of {filtered.length} alerts</span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setPage(p=>Math.max(1, p-1))} disabled={page===1} className="bg-slate-900 border-slate-700 text-white"><ChevronLeft className="w-4 h-4"/></Button>
          <Button variant="outline" size="sm" onClick={() => setPage(p=>Math.min(Math.ceil(filtered.length/limit), p+1))} disabled={page>=Math.ceil(filtered.length/limit)} className="bg-slate-900 border-slate-700 text-white"><ChevronRight className="w-4 h-4"/></Button>
        </div>
      </div>
    </Card>
  );
};

const AITab = () => (
  <Card className="bg-[#111827] border-slate-800/60 shadow-md animate-in fade-in duration-300">
    <div className="p-4 border-b border-slate-800/60 flex justify-between items-center">
      <h3 className="font-semibold text-white flex items-center gap-2"><Lightbulb className="w-5 h-5 text-yellow-400"/> AI Operations Insights</h3>
    </div>
    <div className="overflow-x-auto min-h-[500px]">
      <table className="w-full text-left text-sm text-slate-300">
        <thead className="bg-[#0b1120] text-slate-400 font-semibold text-[10px] uppercase tracking-wider border-b border-slate-800/60">
          <tr><th className="px-6 py-4">Insight Title</th><th className="px-6 py-4">Confidence</th><th className="px-6 py-4">Impact</th><th className="px-6 py-4">Est. Savings</th><th className="px-6 py-4">Action</th></tr>
        </thead>
        <tbody className="divide-y divide-slate-800/40">
          {commandAIInsights.map(a => (
            <tr key={a.id} className="hover:bg-slate-800/30">
              <td className="px-6 py-4 max-w-sm"><p className="font-medium text-slate-200">{a.title}</p><p className="text-xs text-slate-500 mt-1">{a.evidence}</p></td>
              <td className="px-6 py-4 font-mono text-xs">{a.confidence}%</td>
              <td className="px-6 py-4"><span className="px-2 py-1 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded text-[10px] uppercase font-bold tracking-wider">{a.businessImpact}</span></td>
              <td className="px-6 py-4 font-mono text-emerald-400">₹{a.estimatedSavings.toLocaleString('en-IN')}</td>
              <td className="px-6 py-4"><Button size="sm" className="bg-blue-600 hover:bg-blue-500 text-white">Execute Action</Button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </Card>
);

const ReportsTab = () => (
  <Card className="bg-[#111827] border-slate-800/60 shadow-md animate-in fade-in duration-300">
    <div className="p-4 border-b border-slate-800/60 flex justify-between items-center">
      <h3 className="font-semibold text-white flex items-center gap-2"><FileText className="w-5 h-5 text-emerald-400"/> Operational Reports Engine</h3>
      <Button className="bg-emerald-600 hover:bg-emerald-500 text-white gap-2"><Plus className="w-4 h-4"/> Schedule Report</Button>
    </div>
    <div className="overflow-x-auto min-h-[500px]">
      <table className="w-full text-left text-sm text-slate-300">
        <thead className="bg-[#0b1120] text-slate-400 font-semibold text-[10px] uppercase tracking-wider border-b border-slate-800/60">
          <tr><th className="px-6 py-4">Report Title</th><th className="px-6 py-4">Generated By</th><th className="px-6 py-4">Date</th><th className="px-6 py-4">Size</th><th className="px-6 py-4 text-right">Actions</th></tr>
        </thead>
        <tbody className="divide-y divide-slate-800/40">
          {commandReports.map(r => (
            <tr key={r.id} className="hover:bg-slate-800/30">
              <td className="px-6 py-4 font-medium text-slate-200 flex items-center gap-2"><FileText className="w-4 h-4 text-slate-500"/> {r.title}</td>
              <td className="px-6 py-4">{r.generatedBy}</td>
              <td className="px-6 py-4 text-slate-400">{r.date}</td>
              <td className="px-6 py-4 font-mono text-xs">{r.size} • {r.format}</td>
              <td className="px-6 py-4 text-right flex justify-end gap-2">
                <Button variant="ghost" size="sm" className="text-slate-300"><Eye className="w-4 h-4"/></Button>
                <Button variant="ghost" size="sm" className="text-blue-400"><Download className="w-4 h-4"/></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </Card>
);

const ActivityTab = () => (
  <Card className="bg-[#111827] border-slate-800/60 shadow-md animate-in fade-in duration-300">
    <div className="p-4 border-b border-slate-800/60"><h3 className="font-semibold text-white">Platform Activity Stream</h3></div>
    <div className="p-6">
      <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-slate-700 before:via-slate-700 before:to-transparent">
        {commandActivity.slice(0, 50).map(act => (
          <div key={act.id} className="relative flex items-start gap-4 hover:bg-slate-800/30 p-2 rounded-lg transition-colors">
            <div className="w-10 h-10 rounded-full border-4 border-[#0b1120] bg-slate-800 text-slate-400 flex items-center justify-center shrink-0 z-10 shadow">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-200">{act.action} <span className="font-normal text-slate-400">in {act.module}</span></p>
              <p className="text-xs text-slate-500 mt-1">{act.details}</p>
              <div className="flex items-center gap-4 mt-2 text-[10px] text-slate-500">
                <span>By {act.user}</span>
                <span>•</span>
                <span>{act.plant}</span>
                <span>•</span>
                <span>{act.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </Card>
);
