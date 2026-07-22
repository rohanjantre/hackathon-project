import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Activity, AlertTriangle, TrendingUp, Settings, BrainCircuit, ActivitySquare, LayoutGrid, Calendar, Wrench, ShieldAlert, FileText, Search, X, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

import { predictions } from '../../mock/predictive.mock';
import { recommendations } from '../../mock/recommendations.mock';
import { anomalies } from '../../mock/anomalies.mock';
import { maintenancePlanner } from '../../mock/maintenancePlanner.mock';
import { executiveBrief } from '../../mock/executiveBrief.mock';

type TabType = 'overview' | 'predictions' | 'anomalies' | 'recommendations' | 'maintenance';

export const PredictiveDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const navigate = useNavigate();

  const stats = {
    overallHealth: 92,
    predictedFailures: predictions.filter(p => p.severity === 'Critical').length,
    criticalAssets: 14,
    downtimePrediction: 124,
  };

  const tabs = [
    { id: 'overview', icon: LayoutGrid, label: 'Overview' },
    { id: 'predictions', icon: BrainCircuit, label: 'Predictions' },
    { id: 'anomalies', icon: AlertTriangle, label: 'Anomalies' },
    { id: 'recommendations', icon: FileText, label: 'Recommendations' },
    { id: 'maintenance', icon: Calendar, label: 'Maintenance Planner' }
  ];

  return (
    <div className="flex-1 bg-[#0b1120] p-6 space-y-8 min-h-screen">
      {/* Secondary Module Navigation (Tabs) */}
      <div className="flex items-center gap-1 overflow-x-auto border-b border-slate-800 pb-1 -mx-6 px-6 mb-8 custom-scrollbar">
        {tabs.map(tab => (
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

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400 flex items-center justify-center shrink-0">
            <BrainCircuit className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Predictive AI</h1>
            <p className="text-slate-400 mt-1 text-sm">Proactive failure prediction and anomaly detection.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={() => setSettingsOpen(true)} variant="outline" className="gap-2 bg-[#111827] border-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white">
            <Settings className="w-4 h-4" /> Optimization Settings
          </Button>
          <Button onClick={() => setActiveTab('predictions')} className="gap-2 bg-violet-600 hover:bg-violet-500 text-white font-medium shadow-lg shadow-violet-500/20">
            <TrendingUp className="w-4 h-4" /> View Predictions
          </Button>
        </div>
      </div>

      {/* Conditional Rendering of Tabs */}
      {activeTab === 'overview' && <OverviewTab stats={stats} />}
      {activeTab === 'predictions' && <PredictionsTab />}
      {activeTab === 'anomalies' && <AnomaliesTab />}
      {activeTab === 'recommendations' && <RecommendationsTab />}
      {activeTab === 'maintenance' && <MaintenanceTab />}

      {/* Settings Modal */}
      {settingsOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700/60 rounded-2xl w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-5 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white flex items-center gap-2"><Settings className="w-5 h-5 text-blue-400"/> AI Optimization Settings</h3>
              <button onClick={() => setSettingsOpen(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-5 space-y-5">
              <div>
                <label className="text-sm font-medium text-slate-300 mb-1.5 block">Confidence Threshold (%)</label>
                <input type="range" min="50" max="99" defaultValue="85" className="w-full accent-violet-500" />
                <div className="flex justify-between text-xs text-slate-500 mt-1"><span>50%</span><span>85%</span><span>99%</span></div>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-300 mb-1.5 block">Prediction Window (Days)</label>
                <select className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none">
                  <option>7 Days</option>
                  <option>15 Days</option>
                  <option selected>30 Days</option>
                  <option>90 Days</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-300 mb-1.5 block">Alert Priority Routing</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm text-slate-400 cursor-pointer"><input type="checkbox" defaultChecked className="rounded border-slate-700 bg-slate-950 text-violet-500 focus:ring-violet-500" /> Send Critical Alerts to Shift Manager</label>
                  <label className="flex items-center gap-2 text-sm text-slate-400 cursor-pointer"><input type="checkbox" defaultChecked className="rounded border-slate-700 bg-slate-950 text-violet-500 focus:ring-violet-500" /> Auto-generate Maintenance Tickets</label>
                </div>
              </div>
            </div>
            <div className="p-5 border-t border-slate-800 flex justify-end gap-3 bg-slate-800/30 rounded-b-2xl">
              <Button variant="ghost" onClick={() => setSettingsOpen(false)} className="text-slate-300">Cancel</Button>
              <Button onClick={() => setSettingsOpen(false)} className="bg-violet-600 hover:bg-violet-500 text-white">Save Settings</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- TABS COMPONENTS ---

const OverviewTab = ({ stats }: { stats: any }) => {
  const trendData = [
    { day: 'Mon', failures: 2, anomalies: 5 }, { day: 'Tue', failures: 3, anomalies: 8 }, { day: 'Wed', failures: 1, anomalies: 4 }, 
    { day: 'Thu', failures: 4, anomalies: 12 }, { day: 'Fri', failures: 2, anomalies: 6 }, { day: 'Sat', failures: 0, anomalies: 2 }, { day: 'Sun', failures: 1, anomalies: 3 }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <Card className="bg-[#111827] border-slate-800/60 shadow-md">
          <CardContent className="p-4 relative overflow-hidden">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0"><ActivitySquare className="w-5 h-5" /></div>
              <div className="flex flex-col">
                <p className="text-xs font-medium text-slate-400">Plant Health</p>
                <p className="text-2xl font-bold text-white mt-0.5">{stats.overallHealth}%</p>
                <p className="text-[10px] text-emerald-400 mt-1">System nominal</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#111827] border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.15)] relative overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center shrink-0 animate-pulse"><AlertTriangle className="w-5 h-5" /></div>
              <div className="flex flex-col">
                <p className="text-xs font-medium text-slate-400">Predicted Failures</p>
                <p className="text-2xl font-bold text-red-400 mt-0.5">{stats.predictedFailures}</p>
                <p className="text-[10px] text-red-400 mt-1">Action required</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#111827] border-slate-800/60 shadow-md">
          <CardContent className="p-4 relative overflow-hidden">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0"><Activity className="w-5 h-5" /></div>
              <div className="flex flex-col">
                <p className="text-xs font-medium text-slate-400">Critical Assets</p>
                <p className="text-2xl font-bold text-white mt-0.5">{stats.criticalAssets}</p>
                <p className="text-[10px] text-amber-500 mt-1">Require monitoring</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#111827] border-slate-800/60 shadow-md">
          <CardContent className="p-4 relative overflow-hidden">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0"><TrendingUp className="w-5 h-5" /></div>
              <div className="flex flex-col">
                <p className="text-xs font-medium text-slate-400">Downtime Risk</p>
                <p className="text-2xl font-bold text-white mt-0.5">{stats.downtimePrediction} <span className="text-lg font-medium text-slate-500">hrs</span></p>
                <p className="text-[10px] text-slate-500 mt-1">Next 30 days</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <Card className="bg-[#111827] border-slate-800/60 shadow-md">
            <div className="p-4 border-b border-slate-800/60"><h3 className="font-semibold text-white flex items-center gap-2"><BrainCircuit className="w-4 h-4 text-violet-400" /> Executive AI Brief</h3></div>
            <CardContent className="p-6">
              <div className="p-5 rounded-xl bg-slate-900/50 border border-slate-800 shadow-inner mb-6">
                <h4 className="font-bold text-white text-sm mb-3">Daily Predictive Summary</h4>
                <p className="text-slate-300 text-sm leading-relaxed">{executiveBrief.summary}</p>
                <div className="mt-4 flex gap-2">
                  <span className="text-[10px] px-2 py-1 bg-red-500/10 text-red-400 rounded border border-red-500/20 font-bold uppercase tracking-wider">High Priority Action Required</span>
                  <span className="text-[10px] px-2 py-1 bg-violet-500/10 text-violet-400 rounded border border-violet-500/20 font-bold uppercase tracking-wider">AI Generated</span>
                </div>
              </div>
              
              <div className="h-64">
                <h4 className="font-bold text-white text-sm mb-4">Prediction Trend (Last 7 Days)</h4>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} tickLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} />
                    <RechartsTooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }} />
                    <Line type="monotone" dataKey="failures" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Predicted Failures" />
                    <Line type="monotone" dataKey="anomalies" stroke="#eab308" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Anomalies Detected" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="xl:col-span-1 space-y-6">
          <Card className="bg-[#111827] border-slate-800/60 shadow-md">
            <div className="p-4 border-b border-slate-800/60"><h3 className="text-sm font-semibold text-white">Operational Health Score</h3></div>
            <CardContent className="p-6">
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between items-end mb-1.5"><span className="text-sm text-slate-300">Plant Performance</span><span className="text-sm font-bold text-emerald-400">92%</span></div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden"><div className="bg-emerald-400 h-full rounded-full w-[92%]"></div></div>
                </div>
                <div>
                  <div className="flex justify-between items-end mb-1.5"><span className="text-sm text-slate-300">Maintenance Compliance</span><span className="text-sm font-bold text-amber-500">78%</span></div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden"><div className="bg-amber-500 h-full rounded-full w-[78%]"></div></div>
                </div>
                <div>
                  <div className="flex justify-between items-end mb-1.5"><span className="text-sm text-slate-300">Safety & Risk Readiness</span><span className="text-sm font-bold text-blue-400">85%</span></div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden"><div className="bg-blue-400 h-full rounded-full w-[85%]"></div></div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-[#111827] border-slate-800/60 shadow-md">
            <div className="p-4 border-b border-slate-800/60"><h3 className="text-sm font-semibold text-white">Recent AI Alerts</h3></div>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-800/60">
                {anomalies.slice(0, 3).map(a => (
                  <div key={a.id} className="p-4 flex items-start gap-3 hover:bg-slate-800/30 transition-colors cursor-pointer group">
                     <ShieldAlert className={`w-4 h-4 mt-0.5 shrink-0 ${a.severity === 'Critical' ? 'text-red-500' : 'text-amber-500'}`} />
                     <div>
                       <p className="text-sm text-slate-200 group-hover:text-white transition-colors leading-tight">{a.type} detected in {a.assetName}</p>
                       <p className="text-xs text-slate-500 mt-1">{a.detectionTime}</p>
                     </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const PredictionsTab = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const limit = 15;
  const [selectedPrediction, setSelectedPrediction] = useState<any>(null);
  
  const filtered = useMemo(() => predictions.filter(p => p.assetName.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase())), [search]);
  const paginated = filtered.slice((page-1)*limit, page*limit);

  return (
    <Card className="bg-[#111827] border-slate-800/60 shadow-md animate-in fade-in duration-300 relative">
      <div className="p-4 border-b border-slate-800/60 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <h3 className="font-semibold text-white flex items-center gap-2"><BrainCircuit className="w-5 h-5 text-violet-400"/> AI Predictions Registry</h3>
        <div className="flex gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input type="text" placeholder="Search by Asset or ID..." value={search} onChange={e => {setSearch(e.target.value); setPage(1);}} className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-violet-500" />
          </div>
          <Button variant="outline" className="bg-slate-900 border-slate-700 text-slate-300"><Filter className="w-4 h-4"/></Button>
        </div>
      </div>
      <div className="overflow-x-auto min-h-[500px]">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-[#0b1120] text-slate-400 font-semibold text-[10px] uppercase tracking-wider border-b border-slate-800/60">
            <tr>
              <th className="px-6 py-4">Prediction ID</th>
              <th className="px-6 py-4">Asset</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Confidence</th>
              <th className="px-6 py-4">Failure Window</th>
              <th className="px-6 py-4">Severity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/40">
            {paginated.map(p => (
              <tr key={p.id} onClick={() => setSelectedPrediction(p)} className="hover:bg-slate-800/30 transition-colors cursor-pointer">
                <td className="px-6 py-4 font-mono text-xs text-slate-400">{p.id}</td>
                <td className="px-6 py-4 font-medium text-slate-200">{p.assetName} <div className="text-xs text-slate-500 font-normal">{p.plantName}</div></td>
                <td className="px-6 py-4">{p.type}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs">{p.confidence}%</span>
                    <div className="w-16 h-1.5 bg-slate-800 rounded-full"><div className="h-full bg-violet-500 rounded-full" style={{width: `${p.confidence}%`}}></div></div>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-400">{p.daysToFailure} Days</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-[10px] uppercase font-bold tracking-wider border ${p.severity === 'Critical' ? 'bg-red-500/10 text-red-400 border-red-500/20' : p.severity === 'High' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'}`}>{p.severity}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 border-t border-slate-800/60 flex justify-between items-center text-sm text-slate-400">
        <span>Showing {(page-1)*limit + 1} to {Math.min(page*limit, filtered.length)} of {filtered.length} predictions</span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setPage(p=>Math.max(1, p-1))} disabled={page===1} className="bg-slate-900 border-slate-700 text-white"><ChevronLeft className="w-4 h-4"/></Button>
          <Button variant="outline" size="sm" onClick={() => setPage(p=>Math.min(Math.ceil(filtered.length/limit), p+1))} disabled={page>=Math.ceil(filtered.length/limit)} className="bg-slate-900 border-slate-700 text-white"><ChevronRight className="w-4 h-4"/></Button>
        </div>
      </div>

      {/* Drawer */}
      {selectedPrediction && (
        <div className="absolute top-0 right-0 bottom-0 w-96 bg-slate-900 border-l border-slate-700/60 shadow-2xl z-10 flex flex-col animate-in slide-in-from-right-8">
          <div className="p-5 border-b border-slate-800 flex justify-between items-center">
            <h3 className="font-bold text-white flex items-center gap-2"><BrainCircuit className="w-5 h-5 text-violet-400"/> Prediction Details</h3>
            <button onClick={() => setSelectedPrediction(null)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div>
              <p className="text-xs font-mono text-slate-500">{selectedPrediction.id}</p>
              <h2 className="text-xl font-bold text-white mt-1">{selectedPrediction.type}</h2>
              <p className="text-sm text-slate-400 mt-1">{selectedPrediction.assetName} • {selectedPrediction.plantName}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Probability</p>
                <p className="text-lg font-bold text-white font-mono">{selectedPrediction.probability}%</p>
              </div>
              <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Time to Failure</p>
                <p className="text-lg font-bold text-white font-mono">{selectedPrediction.daysToFailure} Days</p>
              </div>
              <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Severity</p>
                <p className={`text-lg font-bold ${selectedPrediction.severity === 'Critical' ? 'text-red-400' : 'text-amber-400'}`}>{selectedPrediction.severity}</p>
              </div>
              <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Status</p>
                <p className="text-sm font-bold text-blue-400 mt-1">{selectedPrediction.status}</p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-white mb-2">AI Recommended Action</h4>
              <p className="text-sm text-slate-300 leading-relaxed bg-slate-800/30 p-4 rounded-lg border border-slate-800">{selectedPrediction.recommendedAction}</p>
            </div>

            <Button className="w-full bg-violet-600 hover:bg-violet-500 text-white">Create Maintenance Ticket</Button>
          </div>
        </div>
      )}
    </Card>
  );
};

const AnomaliesTab = () => {
  const [page, setPage] = useState(1);
  const limit = 15;
  const paginated = anomalies.slice((page-1)*limit, page*limit);

  return (
    <Card className="bg-[#111827] border-slate-800/60 shadow-md animate-in fade-in duration-300">
      <div className="p-4 border-b border-slate-800/60"><h3 className="font-semibold text-white">Detected Anomalies Log</h3></div>
      <div className="overflow-x-auto min-h-[500px]">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-[#0b1120] text-slate-400 font-semibold text-[10px] uppercase tracking-wider border-b border-slate-800/60">
            <tr>
              <th className="px-6 py-4">Detection Time</th>
              <th className="px-6 py-4">Anomaly Type</th>
              <th className="px-6 py-4">Asset</th>
              <th className="px-6 py-4">Department</th>
              <th className="px-6 py-4">Risk Score</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/40">
            {paginated.map(a => (
              <tr key={a.id} className="hover:bg-slate-800/30">
                <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-400">{a.detectionTime}</td>
                <td className="px-6 py-4 font-medium text-slate-200">{a.type}</td>
                <td className="px-6 py-4">{a.assetName}</td>
                <td className="px-6 py-4 text-slate-400">{a.department}</td>
                <td className="px-6 py-4 font-mono text-amber-500">{a.riskScore}/100</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-[10px] uppercase font-bold tracking-wider border ${a.status === 'Active' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-slate-800 text-slate-400 border-slate-700'}`}>{a.status}</span>
                </td>
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

const RecommendationsTab = () => {
  const [page, setPage] = useState(1);
  const limit = 15;
  const paginated = recommendations.slice((page-1)*limit, page*limit);

  return (
    <Card className="bg-[#111827] border-slate-800/60 shadow-md animate-in fade-in duration-300">
      <div className="p-4 border-b border-slate-800/60"><h3 className="font-semibold text-white">AI Recommendations & Optimizations</h3></div>
      <div className="overflow-x-auto min-h-[500px]">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-[#0b1120] text-slate-400 font-semibold text-[10px] uppercase tracking-wider border-b border-slate-800/60">
            <tr>
              <th className="px-6 py-4">Title & Asset</th>
              <th className="px-6 py-4">Business Reason</th>
              <th className="px-6 py-4">Est. Savings</th>
              <th className="px-6 py-4">Confidence</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/40">
            {paginated.map(r => (
              <tr key={r.id} className="hover:bg-slate-800/30">
                <td className="px-6 py-4">
                  <p className="font-medium text-slate-200">{r.title}</p>
                  <p className="text-xs text-slate-500 mt-1">{r.linkedAssetName}</p>
                </td>
                <td className="px-6 py-4 text-xs text-slate-400 max-w-xs">{r.businessReason}</td>
                <td className="px-6 py-4 font-mono text-emerald-400">₹{r.expectedSavings.toLocaleString('en-IN')}</td>
                <td className="px-6 py-4 font-mono text-xs text-blue-400">{r.confidence}%</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-[10px] uppercase font-bold tracking-wider border ${r.approvalStatus === 'Pending' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'}`}>{r.approvalStatus}</span>
                </td>
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

const MaintenanceTab = () => {
  return (
    <Card className="bg-[#111827] border-slate-800/60 shadow-md animate-in fade-in duration-300">
      <div className="p-4 border-b border-slate-800/60 flex justify-between items-center">
        <h3 className="font-semibold text-white">Smart Maintenance Planner</h3>
        <Button size="sm" variant="outline" className="bg-slate-900 border-slate-700 text-slate-300 gap-2"><Calendar className="w-4 h-4"/> Sync Calendar</Button>
      </div>
      <div className="p-6">
        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
          {maintenancePlanner.slice(0, 15).sort((a,b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime()).map(task => (
            <div key={task.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#0b1120] bg-blue-500/20 text-blue-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <Wrench className="w-4 h-4" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-5 rounded-xl border border-slate-700 bg-slate-900 shadow-md hover:border-blue-500/50 transition-colors cursor-pointer">
                <div className="flex items-center justify-between space-x-2 mb-2">
                  <div className="font-bold text-slate-200">{task.assetName}</div>
                  <time className="text-xs text-slate-400 font-mono bg-slate-800 px-2 py-1 rounded">{task.scheduledDate}</time>
                </div>
                <div className="text-slate-400 text-sm mb-3">Assigned to: <span className="text-slate-200">{task.engineer}</span></div>
                <div className="flex gap-2">
                   <span className="px-2 py-1 bg-slate-800 text-slate-300 rounded border border-slate-700 text-[10px] uppercase font-bold tracking-wider">{task.taskType}</span>
                   <span className="px-2 py-1 bg-slate-800 text-slate-300 rounded border border-slate-700 text-[10px] uppercase font-bold tracking-wider">{task.durationHours} hrs</span>
                   <span className={`px-2 py-1 rounded border text-[10px] uppercase font-bold tracking-wider ${task.priority === 'Critical' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-slate-800 text-slate-300 border-slate-700'}`}>{task.priority} Priority</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
