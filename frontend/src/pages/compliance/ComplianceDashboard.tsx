import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { ShieldCheck, ShieldAlert, AlertTriangle, Activity, FileText, Search, Filter, ChevronLeft, ChevronRight, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/card';

import { rcaCases, complianceCases, openCAPAs, upcomingAudits } from '../../mock/compliance.mock';

type TabType = 'overview' | 'cases' | 'capa' | 'rca' | 'audits';

export const ComplianceDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const navigate = useNavigate();

  const stats = {
    complianceScore: 94,
    criticalViolations: complianceCases.filter(c => c.priority === 'Critical' && c.status !== 'Closed').length,
    openCapas: openCAPAs.filter(c => c.status !== 'Closed').length,
    totalCases: complianceCases.length
  };

  const tabs = [
    { id: 'overview', icon: ShieldCheck, label: 'Overview' },
    { id: 'cases', icon: ShieldAlert, label: 'Compliance Cases' },
    { id: 'capa', icon: AlertTriangle, label: 'CAPA Management' },
    { id: 'rca', icon: Activity, label: 'Root Cause Analysis (RCA)' },
    { id: 'audits', icon: FileText, label: 'Audit Tracker' }
  ];

  return (
    <div className="flex-1 bg-slate-900/50 p-6 md:p-10 space-y-8 min-h-screen">
      {/* Secondary Module Navigation (Tabs) */}
      <div className="flex items-center gap-1 overflow-x-auto border-b border-slate-800 pb-1 -mx-6 px-6 mb-8 custom-scrollbar">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabType)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors whitespace-nowrap ${
              activeTab === tab.id 
                ? 'bg-emerald-600/10 text-emerald-400 font-semibold' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <tab.icon className="w-4 h-4" /> {tab.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <ShieldCheck className="text-emerald-400 w-8 h-8" /> Compliance & RCA
          </h1>
          <p className="text-slate-400 mt-1">AI-driven audit readiness, Root Cause Analysis, and CAPA management.</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="gap-2 border-slate-700 hover:border-slate-500 text-slate-300">
            <FileText className="w-4 h-4" /> Export Report
          </Button>
          <Button onClick={() => setActiveTab('cases')} className="gap-2 shadow-glow bg-emerald-600 hover:bg-emerald-500 text-white">
            Log New Case <Activity className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {activeTab === 'overview' && <OverviewTab stats={stats} />}
      {activeTab === 'cases' && <ComplianceCasesTab />}
      {activeTab === 'capa' && <CAPATab />}
      {activeTab === 'rca' && <RCATab />}
      {activeTab === 'audits' && <AuditsTab />}
    </div>
  );
};

// --- TABS COMPONENTS ---

const OverviewTab = ({ stats }: { stats: any }) => (
  <div className="space-y-8 animate-in fade-in duration-300">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="glass-card p-1 border-emerald-500/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-400">Compliance Score</p>
              <p className="text-2xl font-bold text-white">{stats.complianceScore}%</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="glass-card p-1 border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center animate-pulse">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-400">Critical Violations</p>
              <p className="text-2xl font-bold text-red-400">{stats.criticalViolations}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card p-1">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-400">Open CAPAs</p>
              <p className="text-2xl font-bold text-white">{stats.openCapas}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card p-1">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-400">Total Cases</p>
              <p className="text-2xl font-bold text-white">{stats.totalCases}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="glass-card flex flex-col h-[400px]">
        <div className="p-4 border-b border-slate-700/50"><h3 className="font-semibold text-white flex items-center gap-2">AI Root Cause Analysis Feed</h3></div>
        <CardContent className="p-0 flex-1 overflow-y-auto custom-scrollbar">
          <div className="divide-y divide-slate-800/60">
            {rcaCases.slice(0, 5).map(rca => (
              <div key={rca.id} className="p-5 hover:bg-slate-800/30 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-amber-400">{rca.title} ({rca.assetName})</h4>
                  <span className="text-xs bg-slate-700/50 px-2 py-1 rounded text-slate-300 font-mono">Confidence: {rca.confidence}%</span>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed mb-3"><strong>AI Diagnosis:</strong> {rca.rootCause}</p>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded border border-emerald-500/20 uppercase font-bold tracking-wider">Recommended Action</span>
                  <span className="text-xs text-slate-300">{rca.recommendedAction}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card flex flex-col h-[400px]">
        <div className="p-4 border-b border-slate-700/50"><h3 className="font-semibold text-white flex items-center gap-2">Upcoming Audits & Inspections</h3></div>
        <CardContent className="p-0 flex-1 overflow-y-auto custom-scrollbar">
           <div className="divide-y divide-slate-800/60">
             {upcomingAudits.sort((a,b) => a.daysRemaining - b.daysRemaining).slice(0, 7).map(audit => (
                <div key={audit.id} className="flex items-center justify-between p-5 hover:bg-slate-800/30 transition-colors">
                  <div>
                    <p className="text-sm font-medium text-white">{audit.title}</p>
                    <p className="text-xs text-slate-400 mt-1">{audit.category}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-semibold ${audit.status === 'Ready' ? 'text-emerald-400' : audit.status === 'Action Required' ? 'text-red-400' : 'text-amber-400'}`}>{audit.status}</p>
                    <p className="text-xs text-slate-500 mt-1 flex items-center justify-end gap-1"><Clock className="w-3 h-3"/> In {audit.daysRemaining} Days</p>
                  </div>
                </div>
             ))}
           </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

const ComplianceCasesTab = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const limit = 15;
  const filtered = useMemo(() => complianceCases.filter(c => c.title.toLowerCase().includes(search.toLowerCase()) || c.linkedAsset.toLowerCase().includes(search.toLowerCase())), [search]);
  const paginated = filtered.slice((page-1)*limit, page*limit);

  return (
    <Card className="glass-card animate-in fade-in duration-300">
      <div className="p-4 border-b border-slate-700/50 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <h3 className="font-semibold text-white">Compliance Violations Log</h3>
        <div className="flex gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input type="text" placeholder="Search title or asset..." value={search} onChange={e => {setSearch(e.target.value); setPage(1);}} className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500" />
          </div>
          <Button variant="outline" className="bg-slate-900 border-slate-700 text-slate-300"><Filter className="w-4 h-4"/></Button>
        </div>
      </div>
      <div className="overflow-x-auto min-h-[500px]">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-[#0b1120] text-slate-400 font-semibold text-[10px] uppercase tracking-wider border-b border-slate-700/50">
            <tr>
              <th className="px-6 py-4">Case ID</th>
              <th className="px-6 py-4">Issue & Type</th>
              <th className="px-6 py-4">Asset / Plant</th>
              <th className="px-6 py-4">Due Date</th>
              <th className="px-6 py-4">Owner</th>
              <th className="px-6 py-4">Priority</th>
              <th className="px-6 py-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/40">
            {paginated.map(c => (
              <tr key={c.id} className="hover:bg-slate-800/30 transition-colors cursor-pointer">
                <td className="px-6 py-4 font-mono text-emerald-400 text-xs">{c.id}</td>
                <td className="px-6 py-4">
                  <p className="font-medium text-slate-200">{c.title}</p>
                  <p className="text-xs text-slate-500 mt-1">{c.type}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-slate-300">{c.linkedAsset}</p>
                  <p className="text-xs text-slate-500 mt-1">{c.plantName}</p>
                </td>
                <td className="px-6 py-4 text-slate-400">{c.dueDate}</td>
                <td className="px-6 py-4 text-slate-400">{c.owner}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-[10px] uppercase font-bold tracking-wider border ${c.priority === 'Critical' ? 'bg-red-500/10 text-red-400 border-red-500/20' : c.priority === 'High' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'}`}>{c.priority}</span>
                </td>
                <td className="px-6 py-4 text-right">
                   <span className={`px-2 py-1 rounded text-xs ${c.status === 'Closed' ? 'text-slate-500 bg-slate-800' : 'text-blue-400 bg-blue-500/10'}`}>{c.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 border-t border-slate-700/50 flex justify-between items-center text-sm text-slate-400">
        <span>Showing {(page-1)*limit + 1} to {Math.min(page*limit, filtered.length)} of {filtered.length} entries</span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setPage(p=>Math.max(1, p-1))} disabled={page===1} className="bg-slate-900 border-slate-700 text-white"><ChevronLeft className="w-4 h-4"/></Button>
          <Button variant="outline" size="sm" onClick={() => setPage(p=>Math.min(Math.ceil(filtered.length/limit), p+1))} disabled={page>=Math.ceil(filtered.length/limit)} className="bg-slate-900 border-slate-700 text-white"><ChevronRight className="w-4 h-4"/></Button>
        </div>
      </div>
    </Card>
  );
};

const CAPATab = () => {
  const [page, setPage] = useState(1);
  const limit = 15;
  const paginated = openCAPAs.slice((page-1)*limit, page*limit);

  return (
    <Card className="glass-card animate-in fade-in duration-300">
      <div className="p-4 border-b border-slate-700/50"><h3 className="font-semibold text-white">Corrective & Preventive Actions (CAPA)</h3></div>
      <div className="overflow-x-auto min-h-[500px]">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-[#0b1120] text-slate-400 font-semibold text-[10px] uppercase tracking-wider border-b border-slate-700/50">
            <tr>
              <th className="px-6 py-4">CAPA ID</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4">Asset</th>
              <th className="px-6 py-4">Target Date</th>
              <th className="px-6 py-4">Owner</th>
              <th className="px-6 py-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/40">
            {paginated.map(c => (
              <tr key={c.id} className="hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4 font-mono text-amber-400 text-xs">{c.id}</td>
                <td className="px-6 py-4 font-medium text-slate-200">{c.description}</td>
                <td className="px-6 py-4 text-slate-300">{c.linkedAsset}</td>
                <td className="px-6 py-4 text-slate-400">{c.targetDate}</td>
                <td className="px-6 py-4 text-slate-400">{c.owner}</td>
                <td className="px-6 py-4 text-right">
                   <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs text-slate-300">{c.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 border-t border-slate-700/50 flex justify-end gap-2">
        <Button variant="outline" size="sm" onClick={() => setPage(p=>Math.max(1, p-1))} className="bg-slate-900 border-slate-700 text-white"><ChevronLeft className="w-4 h-4"/></Button>
        <Button variant="outline" size="sm" onClick={() => setPage(p=>p+1)} className="bg-slate-900 border-slate-700 text-white"><ChevronRight className="w-4 h-4"/></Button>
      </div>
    </Card>
  );
};

const RCATab = () => {
  const [page, setPage] = useState(1);
  const limit = 15;
  const paginated = rcaCases.slice((page-1)*limit, page*limit);

  return (
    <Card className="glass-card animate-in fade-in duration-300">
      <div className="p-4 border-b border-slate-700/50"><h3 className="font-semibold text-white">AI-Assisted Root Cause Analyses</h3></div>
      <div className="overflow-x-auto min-h-[500px]">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-[#0b1120] text-slate-400 font-semibold text-[10px] uppercase tracking-wider border-b border-slate-700/50">
            <tr>
              <th className="px-6 py-4">RCA ID & Title</th>
              <th className="px-6 py-4">AI Root Cause Identification</th>
              <th className="px-6 py-4">AI Recommendation</th>
              <th className="px-6 py-4">Confidence</th>
              <th className="px-6 py-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/40">
            {paginated.map(r => (
              <tr key={r.id} className="hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4">
                   <p className="font-mono text-emerald-400 text-xs mb-1">{r.id}</p>
                   <p className="font-medium text-slate-200">{r.title}</p>
                   <p className="text-xs text-slate-500 mt-1">{r.assetName}</p>
                </td>
                <td className="px-6 py-4 text-slate-300 italic">"{r.rootCause}"</td>
                <td className="px-6 py-4 text-slate-300">{r.recommendedAction}</td>
                <td className="px-6 py-4 font-mono text-xs">{r.confidence}%</td>
                <td className="px-6 py-4 text-right">
                   <span className="px-2 py-1 rounded bg-slate-800 text-slate-400 text-xs">{r.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 border-t border-slate-700/50 flex justify-end gap-2">
        <Button variant="outline" size="sm" onClick={() => setPage(p=>Math.max(1, p-1))} className="bg-slate-900 border-slate-700 text-white"><ChevronLeft className="w-4 h-4"/></Button>
        <Button variant="outline" size="sm" onClick={() => setPage(p=>p+1)} className="bg-slate-900 border-slate-700 text-white"><ChevronRight className="w-4 h-4"/></Button>
      </div>
    </Card>
  );
};

const AuditsTab = () => {
  const [page, setPage] = useState(1);
  const limit = 15;
  const paginated = upcomingAudits.sort((a,b) => a.daysRemaining - b.daysRemaining).slice((page-1)*limit, page*limit);

  return (
    <Card className="glass-card animate-in fade-in duration-300">
      <div className="p-4 border-b border-slate-700/50"><h3 className="font-semibold text-white">Upcoming Regulatory & Quality Audits</h3></div>
      <div className="overflow-x-auto min-h-[500px]">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-[#0b1120] text-slate-400 font-semibold text-[10px] uppercase tracking-wider border-b border-slate-700/50">
            <tr>
              <th className="px-6 py-4">Audit Title</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Scheduled Date</th>
              <th className="px-6 py-4">Time Remaining</th>
              <th className="px-6 py-4 text-right">Preparation Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/40">
            {paginated.map(a => (
              <tr key={a.id} className="hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-200">{a.title}</td>
                <td className="px-6 py-4 text-slate-400">{a.category}</td>
                <td className="px-6 py-4 text-slate-400">{a.scheduledDate}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs ${a.daysRemaining <= 14 ? 'bg-red-500/10 text-red-400' : 'bg-slate-800 text-slate-400'}`}>
                    {a.daysRemaining} Days
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  {a.status === 'Ready' ? (
                    <span className="flex items-center justify-end gap-1 text-emerald-400"><CheckCircle2 className="w-4 h-4"/> Ready</span>
                  ) : a.status === 'Action Required' ? (
                    <span className="flex items-center justify-end gap-1 text-red-400"><XCircle className="w-4 h-4"/> Action Required</span>
                  ) : (
                    <span className="flex items-center justify-end gap-1 text-amber-400"><Clock className="w-4 h-4"/> Preparation</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 border-t border-slate-700/50 flex justify-end gap-2">
        <Button variant="outline" size="sm" onClick={() => setPage(p=>Math.max(1, p-1))} className="bg-slate-900 border-slate-700 text-white"><ChevronLeft className="w-4 h-4"/></Button>
        <Button variant="outline" size="sm" onClick={() => setPage(p=>p+1)} className="bg-slate-900 border-slate-700 text-white"><ChevronRight className="w-4 h-4"/></Button>
      </div>
    </Card>
  );
};
