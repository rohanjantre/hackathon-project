import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Activity, Server, ShieldAlert, HeartPulse, Calendar, FileText, ArrowRight, Settings, LayoutGrid, Box, PenTool, Search, Wrench, ShieldCheck, TrendingUp, ChevronLeft, ChevronRight, Clock, User, CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/card';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from 'recharts';

import { assets } from '../../mock/assets.mock';
import { maintenanceRecords } from '../../mock/maintenance.mock';
import { inspections } from '../../mock/inspection.mock';
import { historyEvents } from '../../mock/history.mock';
import { analyticsData } from '../../mock/analytics.mock';

type TabType = 'overview' | 'assets' | 'maintenance' | 'inspection' | 'history' | 'analytics';

export const AssetDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  
  // Overview Stats
  const stats = {
    total: assets.length,
    healthy: assets.filter(a => a.status === 'Operational').length,
    maintenance: assets.filter(a => a.status === 'Warning').length,
    critical: assets.filter(a => a.status === 'Critical' || a.status === 'Offline').length,
  };

  const renderTabs = () => (
    <div className="flex items-center gap-1 overflow-x-auto border-b border-slate-800 pb-1 -mx-6 px-6 mb-8 custom-scrollbar">
      {[
        { id: 'overview', icon: LayoutGrid, label: 'Overview' },
        { id: 'assets', icon: Box, label: 'Assets' },
        { id: 'maintenance', icon: Wrench, label: 'Maintenance' },
        { id: 'inspection', icon: ShieldCheck, label: 'Inspection' },
        { id: 'history', icon: Calendar, label: 'History' },
        { id: 'analytics', icon: TrendingUp, label: 'Analytics' }
      ].map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id as TabType)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors whitespace-nowrap ${
            activeTab === tab.id 
              ? 'bg-blue-600/10 text-blue-400 font-semibold' 
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <tab.icon className="w-4 h-4" /> {tab.label}
        </button>
      ))}
    </div>
  );

  return (
    <div className="flex-1 bg-[#0b1120] p-6 space-y-8 min-h-screen">
      {renderTabs()}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
            <Server className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Asset Digital Twin</h1>
            <p className="text-slate-400 mt-1 text-sm">ForgeMind Heavy Engineering Pvt Ltd • Central Monitoring</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 bg-[#111827] border-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white">
            <FileText className="w-4 h-4" /> Export Report
          </Button>
        </div>
      </div>

      {activeTab === 'overview' && <OverviewTab stats={stats} />}
      {activeTab === 'assets' && <AssetsTab />}
      {activeTab === 'maintenance' && <MaintenanceTab />}
      {activeTab === 'inspection' && <InspectionTab />}
      {activeTab === 'history' && <HistoryTab />}
      {activeTab === 'analytics' && <AnalyticsTab />}
    </div>
  );
};

// --- TABS ---

const OverviewTab = ({ stats }: { stats: any }) => (
  <div className="space-y-6 animate-in fade-in duration-300">
    {/* 4 KPI Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      <Card className="bg-[#111827] border-slate-800/60 shadow-md">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0"><Server className="w-5 h-5" /></div>
            <div>
              <p className="text-xs font-medium text-slate-400">Total Assets</p>
              <p className="text-2xl font-bold text-white mt-0.5">{stats.total}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-[#111827] border-emerald-500/30 shadow-md">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0"><HeartPulse className="w-5 h-5" /></div>
            <div>
              <p className="text-xs font-medium text-slate-400">Healthy Assets</p>
              <p className="text-2xl font-bold text-emerald-400 mt-0.5">{stats.healthy}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-[#111827] border-amber-500/30 shadow-md">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0"><Settings className="w-5 h-5" /></div>
            <div>
              <p className="text-xs font-medium text-slate-400">Warning State</p>
              <p className="text-2xl font-bold text-amber-400 mt-0.5">{stats.maintenance}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-[#111827] border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.15)]">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center shrink-0 animate-pulse"><ShieldAlert className="w-5 h-5" /></div>
            <div>
              <p className="text-xs font-medium text-slate-400">Critical Alerts</p>
              <p className="text-2xl font-bold text-red-400 mt-0.5">{stats.critical}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <div className="xl:col-span-2 space-y-6">
        <Card className="bg-[#111827] border-slate-800/60 shadow-md">
          <div className="p-4 border-b border-slate-800/60"><h3 className="text-sm font-semibold text-white flex items-center gap-2"><Activity className="w-4 h-4 text-blue-400" /> Recent AI Recommendations</h3></div>
          <CardContent className="p-6 space-y-4">
            <div className="p-4 rounded-xl bg-gradient-to-r from-red-500/10 to-slate-800/40 border border-red-500/20">
              <h4 className="font-medium text-red-400 flex items-center gap-2 text-sm mb-2"><ShieldAlert className="w-4 h-4" /> Pump P-101 bearing vibration increased by 18%</h4>
              <p className="text-sm text-slate-300">Recommend scheduling bearing replacement within next 5 days. Estimated savings: ₹2,85,000</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 to-slate-800/40 border border-amber-500/20">
              <h4 className="font-medium text-amber-400 flex items-center gap-2 text-sm mb-2"><Settings className="w-4 h-4" /> Boiler B-201 Thermal Efficiency Drop</h4>
              <p className="text-sm text-slate-300">Descaling required. Efficiency dropped by 4% over last 72 hours in Chakan MIDC Plant.</p>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="xl:col-span-1 space-y-6">
        <Card className="bg-[#111827] border-slate-800/60 shadow-md">
          <div className="p-4 border-b border-slate-800/60"><h3 className="text-sm font-semibold text-white flex items-center gap-2"><Calendar className="w-4 h-4 text-blue-400" /> Upcoming Maintenance</h3></div>
          <CardContent className="p-4 space-y-3">
            {maintenanceRecords.slice(0,4).map(m => (
              <div key={m.id} className="flex justify-between items-center p-3 rounded-lg bg-slate-900 border border-slate-800">
                <div>
                  <p className="text-sm text-white">{assets.find(a => a.id === m.assetId)?.name || 'Asset'}</p>
                  <p className="text-xs text-slate-500">{m.reason}</p>
                </div>
                <p className="text-xs text-blue-400">{m.date}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
);

const AssetsTab = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const limit = 15;
  
  const filtered = useMemo(() => assets.filter(a => a.name.toLowerCase().includes(search.toLowerCase()) || a.id.toLowerCase().includes(search.toLowerCase())), [search]);
  const paginated = filtered.slice((page-1)*limit, page*limit);

  return (
    <Card className="bg-[#111827] border-slate-800/60 shadow-md animate-in fade-in duration-300">
      <div className="p-4 border-b border-slate-800/60 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <h3 className="font-semibold text-white">Asset Inventory</h3>
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input 
            type="text" placeholder="Search by name or ID..." 
            value={search} onChange={e => {setSearch(e.target.value); setPage(1);}}
            className="w-full bg-slate-900 border border-slate-700 rounded-md pl-9 pr-4 py-2 text-sm text-white focus:border-blue-500 outline-none" 
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-[#0b1120] text-slate-400 font-semibold text-xs border-b border-slate-800/60 uppercase">
            <tr>
              <th className="px-4 py-3">Asset ID & Name</th>
              <th className="px-4 py-3">Plant</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Health</th>
              <th className="px-4 py-3">Run Hours</th>
              <th className="px-4 py-3">Risk</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/40">
            {paginated.map(asset => (
              <tr key={asset.id} className="hover:bg-slate-800/30 transition-colors cursor-pointer">
                <td className="px-4 py-3">
                  <p className="font-medium text-white">{asset.name}</p>
                  <p className="text-xs text-slate-500">{asset.id}</p>
                </td>
                <td className="px-4 py-3 text-slate-400">{asset.plantId.replace('plt-', 'Plant ')}</td>
                <td className="px-4 py-3">
                  <span className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded border font-semibold ${
                    asset.status === 'Operational' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                    asset.status === 'Warning' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                    'bg-red-500/10 text-red-400 border-red-500/20'
                  }`}>{asset.status}</span>
                </td>
                <td className="px-4 py-3 text-white">{asset.healthScore}%</td>
                <td className="px-4 py-3 font-mono text-slate-400">{asset.runningHours.toLocaleString()}</td>
                <td className="px-4 py-3">
                  <span className={`text-[10px] uppercase px-2 py-1 rounded font-bold ${
                    asset.criticality === 'Critical' ? 'text-red-400 bg-red-900/20' : asset.criticality === 'High' ? 'text-amber-400 bg-amber-900/20' : 'text-slate-400'
                  }`}>{asset.criticality}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 border-t border-slate-800/60 flex justify-between items-center text-sm text-slate-400">
        <span>Showing {(page-1)*limit + 1} to {Math.min(page*limit, filtered.length)} of {filtered.length}</span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setPage(p=>Math.max(1, p-1))} disabled={page===1} className="bg-slate-900 border-slate-700 hover:bg-slate-800 text-white"><ChevronLeft className="w-4 h-4"/></Button>
          <Button variant="outline" size="sm" onClick={() => setPage(p=>Math.min(Math.ceil(filtered.length/limit), p+1))} disabled={page>=Math.ceil(filtered.length/limit)} className="bg-slate-900 border-slate-700 hover:bg-slate-800 text-white"><ChevronRight className="w-4 h-4"/></Button>
        </div>
      </div>
    </Card>
  );
};

const MaintenanceTab = () => {
  const [page, setPage] = useState(1);
  const limit = 15;
  const paginated = maintenanceRecords.slice((page-1)*limit, page*limit);

  return (
    <Card className="bg-[#111827] border-slate-800/60 shadow-md animate-in fade-in duration-300">
      <div className="p-4 border-b border-slate-800/60"><h3 className="font-semibold text-white">Maintenance Log</h3></div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-[#0b1120] text-slate-400 font-semibold text-xs border-b border-slate-800/60 uppercase">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Asset ID</th>
              <th className="px-4 py-3">Reason / Type</th>
              <th className="px-4 py-3">Duration (hrs)</th>
              <th className="px-4 py-3">Cost (₹)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/40">
            {paginated.map(record => (
              <tr key={record.id} className="hover:bg-slate-800/30">
                <td className="px-4 py-3 whitespace-nowrap">{record.date}</td>
                <td className="px-4 py-3 font-mono">{record.assetId}</td>
                <td className="px-4 py-3 text-white">{record.reason}</td>
                <td className="px-4 py-3">{record.durationHours}</td>
                <td className="px-4 py-3 text-red-400">₹{record.cost.toLocaleString('en-IN')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 border-t border-slate-800/60 flex justify-end gap-2">
        <Button variant="outline" size="sm" onClick={() => setPage(p=>Math.max(1, p-1))} className="bg-slate-900 border-slate-700 text-white"><ChevronLeft className="w-4 h-4"/></Button>
        <Button variant="outline" size="sm" onClick={() => setPage(p=>p+1)} className="bg-slate-900 border-slate-700 text-white"><ChevronRight className="w-4 h-4"/></Button>
      </div>
    </Card>
  );
};

const InspectionTab = () => {
  const [page, setPage] = useState(1);
  const limit = 15;
  const paginated = inspections.slice((page-1)*limit, page*limit);

  return (
    <Card className="bg-[#111827] border-slate-800/60 shadow-md animate-in fade-in duration-300">
      <div className="p-4 border-b border-slate-800/60"><h3 className="font-semibold text-white">Inspection Reports</h3></div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-[#0b1120] text-slate-400 font-semibold text-xs border-b border-slate-800/60 uppercase">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Asset ID</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Result</th>
              <th className="px-4 py-3">Remarks</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/40">
            {paginated.map(insp => (
              <tr key={insp.id} className="hover:bg-slate-800/30">
                <td className="px-4 py-3 whitespace-nowrap">{insp.date}</td>
                <td className="px-4 py-3 font-mono">{insp.assetId}</td>
                <td className="px-4 py-3">{insp.type}</td>
                <td className="px-4 py-3">
                  <span className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded border font-semibold ${
                    insp.status.includes('Passed') ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'
                  }`}>{insp.status}</span>
                </td>
                <td className="px-4 py-3 text-xs text-slate-400 max-w-xs truncate">{insp.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 border-t border-slate-800/60 flex justify-end gap-2">
        <Button variant="outline" size="sm" onClick={() => setPage(p=>Math.max(1, p-1))} className="bg-slate-900 border-slate-700 text-white"><ChevronLeft className="w-4 h-4"/></Button>
        <Button variant="outline" size="sm" onClick={() => setPage(p=>p+1)} className="bg-slate-900 border-slate-700 text-white"><ChevronRight className="w-4 h-4"/></Button>
      </div>
    </Card>
  );
};

const HistoryTab = () => {
  return (
    <Card className="bg-[#111827] border-slate-800/60 shadow-md animate-in fade-in duration-300">
      <div className="p-4 border-b border-slate-800/60"><h3 className="font-semibold text-white">Asset Activity Timeline</h3></div>
      <CardContent className="p-6">
        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
          {historyEvents.slice(0, 20).map(event => {
            const date = new Date(event.timestamp);
            return (
              <div key={event.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#0b1120] bg-blue-500/20 text-blue-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  {event.type.includes('AI') ? <Activity className="w-4 h-4"/> : <Clock className="w-4 h-4" />}
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-800 bg-slate-900 shadow-md">
                  <div className="flex items-center justify-between space-x-2 mb-1">
                    <div className="font-bold text-slate-200">{event.type}</div>
                    <time className="text-xs text-slate-500 font-mono">{date.toLocaleDateString('en-IN')} {date.toLocaleTimeString('en-IN', {hour:'2-digit', minute:'2-digit'})}</time>
                  </div>
                  <div className="text-slate-400 text-sm">{event.assetName} • {event.description}</div>
                  <div className="text-xs text-blue-400 mt-2 flex items-center gap-1"><User className="w-3 h-3"/> {event.user}</div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

const AnalyticsTab = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-[#111827] border-slate-800/60 shadow-md">
          <div className="p-4 border-b border-slate-800/60"><h3 className="font-semibold text-white">Asset Health Trend</h3></div>
          <CardContent className="p-4 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analyticsData.healthTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} domain={[60, 100]} />
                <RechartsTooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }} />
                <Line type="monotone" dataKey="score" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-[#111827] border-slate-800/60 shadow-md">
          <div className="p-4 border-b border-slate-800/60"><h3 className="font-semibold text-white">Maintenance Cost (₹ Lakhs)</h3></div>
          <CardContent className="p-4 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData.maintenanceCost}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} tickFormatter={(val)=>`${val/100000}L`} />
                <RechartsTooltip formatter={(value: any) => `₹${value.toLocaleString('en-IN')}`} contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }} />
                <Bar dataKey="cost" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-[#111827] border-slate-800/60 shadow-md">
          <div className="p-4 border-b border-slate-800/60"><h3 className="font-semibold text-white">Department Efficiency</h3></div>
          <CardContent className="p-4 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData.departmentPerformance} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                <XAxis type="number" stroke="#94a3b8" fontSize={12} domain={[0, 100]} />
                <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <RechartsTooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }} />
                <Bar dataKey="efficiency" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-[#111827] border-slate-800/60 shadow-md">
          <div className="p-4 border-b border-slate-800/60"><h3 className="font-semibold text-white">Risk Distribution</h3></div>
          <CardContent className="p-4 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={analyticsData.riskDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                  {analyticsData.riskDistribution.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
                <RechartsTooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }} />
                <Legend wrapperStyle={{ color: '#94a3b8' }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
