import React, { useEffect, useState, useMemo } from 'react';
import { Button } from '../../components/ui/button';
import { FileText, UploadCloud, Search, CheckCircle2, Clock, Filter, LayoutGrid, RotateCw, FolderOpen, LayoutTemplate, LineChart as LineChartIcon, FileBarChart, Settings, FolderClosed, Download, Trash2, Eye } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/card';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from 'recharts';

import { documents } from '../../mock/documents.mock';

type TabType = 'overview' | 'upload' | 'processing' | 'categories' | 'templates' | 'insights' | 'reports' | 'settings';

export const DocumentDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  
  // Dashboard Stats
  const stats = {
    total: documents.length,
    processing: documents.filter(d => d.status === 'Pending Review').length,
    indexed: documents.filter(d => d.status === 'Active').length
  };

  const tabs = [
    { id: 'overview', icon: LayoutGrid, label: 'Overview' },
    { id: 'upload', icon: UploadCloud, label: 'Upload' },
    { id: 'processing', icon: RotateCw, label: 'Processing' },
    { id: 'categories', icon: FolderOpen, label: 'Categories' },
    { id: 'templates', icon: LayoutTemplate, label: 'Templates' },
    { id: 'insights', icon: LineChartIcon, label: 'Insights' },
    { id: 'reports', icon: FileBarChart, label: 'Reports' },
    { id: 'settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <div className="flex-1 bg-[#0b1120] p-6 space-y-8 min-h-screen">
      {/* Tab Navigation */}
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
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Document Intelligence Center</h1>
            <p className="text-slate-400 mt-1 text-sm">Manage, process, and query your industrial knowledge base.</p>
          </div>
        </div>
        <Button onClick={() => setActiveTab('upload')} className="gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-lg shadow-blue-500/20">
          <UploadCloud className="w-4 h-4" /> Upload Document
        </Button>
      </div>

      {/* Conditional Rendering of Tabs */}
      {activeTab === 'overview' && <OverviewTab stats={stats} documents={documents} />}
      {activeTab === 'upload' && <UploadTab />}
      {activeTab === 'processing' && <ProcessingTab />}
      {activeTab === 'categories' && <CategoriesTab />}
      {activeTab === 'templates' && <TemplatesTab />}
      {activeTab === 'insights' && <InsightsTab />}
      {activeTab === 'reports' && <ReportsTab />}
      {activeTab === 'settings' && <SettingsTab />}

    </div>
  );
};

// --- TABS COMPONENTS ---

const OverviewTab = ({ stats, documents }: { stats: any, documents: any[] }) => {
  const [search, setSearch] = useState('');
  const filtered = useMemo(() => documents.filter(d => d.title.toLowerCase().includes(search.toLowerCase()) || d.category.toLowerCase().includes(search.toLowerCase())).slice(0, 50), [search, documents]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 3 KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-[#111827] border-slate-800/60 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0 mt-1"><FileText className="w-6 h-6" /></div>
              <div className="flex flex-col">
                <p className="text-sm font-medium text-slate-400">Total Documents</p>
                <p className="text-3xl font-bold text-white mt-1">{stats.total}</p>
                <p className="text-xs text-slate-500 mt-1">All time</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#111827] border-slate-800/60 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0 mt-1"><Clock className="w-6 h-6" /></div>
              <div className="flex flex-col">
                <p className="text-sm font-medium text-slate-400">Processing Queue</p>
                <p className="text-3xl font-bold text-white mt-1">{stats.processing}</p>
                <p className="text-xs text-slate-500 mt-1">In progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#111827] border-slate-800/60 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 mt-1"><CheckCircle2 className="w-6 h-6" /></div>
              <div className="flex flex-col">
                <p className="text-sm font-medium text-slate-400">AI Indexed & Ready</p>
                <p className="text-3xl font-bold text-white mt-1">{stats.indexed}</p>
                <p className="text-xs text-slate-500 mt-1">Ready to use</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search manuals, SOPs, OCR content..."
            className="w-full bg-[#111827] border border-slate-800/60 text-slate-200 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-500"
          />
        </div>
        <Button variant="outline" className="gap-2 bg-[#111827] border-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white">
          <Filter className="w-4 h-4 text-slate-400" /> Filters
        </Button>
      </div>

      <div className="bg-[#111827] rounded-xl border border-slate-800/60 overflow-hidden shadow-md">
        <div className="overflow-x-auto max-h-[500px] overflow-y-auto custom-scrollbar">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-[#0b1120] border-b border-slate-800/60 text-slate-400 font-semibold text-xs sticky top-0 z-10 uppercase">
              <tr>
                <th className="px-6 py-4">Document Title</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Upload Date</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              {filtered.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-800/50 transition-colors group">
                  <td className="px-6 py-4 font-medium text-slate-200 flex items-center gap-3">
                    <FileText className="w-4 h-4 text-blue-400 shrink-0" />
                    {doc.title}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-slate-800/60 border border-slate-700/50 rounded-md text-[10px] uppercase font-bold tracking-wider">{doc.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider flex w-fit items-center gap-1.5 border ${
                      doc.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                      doc.status === 'Archived' ? 'bg-slate-500/10 text-slate-400 border-slate-500/20' :
                      'bg-amber-500/10 text-amber-500 border-amber-500/20'
                    }`}>
                      {doc.status === 'Active' ? <CheckCircle2 className="w-3 h-3" /> : doc.status === 'Archived' ? <FolderClosed className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      {doc.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-xs">{doc.uploadDate}</td>
                  <td className="px-6 py-4">
                    <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300 opacity-0 group-hover:opacity-100 transition-opacity gap-1"><Eye className="w-4 h-4"/> View</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const UploadTab = () => (
  <Card className="bg-[#111827] border-slate-800/60 shadow-md animate-in fade-in duration-300">
    <CardContent className="p-12 text-center">
      <div className="max-w-md mx-auto border-2 border-dashed border-slate-700/60 rounded-xl p-10 hover:bg-slate-800/30 transition-colors cursor-pointer group">
        <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
          <UploadCloud className="w-8 h-8 text-blue-500" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Drag & Drop Documents</h3>
        <p className="text-sm text-slate-400 mb-6">Support for PDF, DOCX, Images, and CAD drawings. AI will automatically OCR and index content.</p>
        <Button className="bg-blue-600 hover:bg-blue-500 text-white shadow-glow">Browse Files</Button>
      </div>
    </CardContent>
  </Card>
);

const ProcessingTab = () => {
  const processingDocs = documents.filter(d => d.status === 'Pending Review');
  return (
    <Card className="bg-[#111827] border-slate-800/60 shadow-md animate-in fade-in duration-300">
      <div className="p-4 border-b border-slate-800/60 flex items-center justify-between">
        <h3 className="font-semibold text-white flex items-center gap-2"><RotateCw className="w-4 h-4 text-amber-500 animate-spin" /> OCR & AI Processing Queue</h3>
        <span className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded-md">{processingDocs.length} in queue</span>
      </div>
      <div className="p-4 space-y-4">
        {processingDocs.slice(0, 10).map(doc => (
          <div key={doc.id} className="flex items-center justify-between p-4 bg-slate-900 border border-slate-800 rounded-lg">
            <div className="flex items-center gap-4">
              <FileText className="w-8 h-8 text-amber-500/50" />
              <div>
                <p className="font-medium text-slate-200">{doc.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-slate-500 bg-slate-800 px-2 rounded">{doc.category}</span>
                  <span className="text-[10px] text-amber-500 font-mono flex items-center gap-1">Extracting Entities...</span>
                </div>
              </div>
            </div>
            <div className="w-32 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full animate-pulse" style={{width: `${Math.random() * 60 + 20}%`}}></div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

const CategoriesTab = () => {
  const categoryCounts = documents.reduce((acc, doc) => {
    acc[doc.category] = (acc[doc.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-in fade-in duration-300">
      {Object.entries(categoryCounts).map(([cat, count]) => (
        <Card key={cat} className="bg-[#111827] border-slate-800/60 hover:border-blue-500/50 hover:bg-slate-800/50 transition-all cursor-pointer shadow-md group">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 group-hover:text-blue-400 transition-colors text-slate-400">
              <FolderOpen className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-white text-lg">{cat}</h3>
            <p className="text-slate-400 text-sm mt-1">{count} Documents</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const TemplatesTab = () => {
  const templates = ['ISO Audit Standard', 'Safety Inspection V4', 'Asset Commissioning', 'Daily Shift Handover', 'Incident RCA Form', 'Vendor Evaluation'];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-300">
      {templates.map(t => (
        <Card key={t} className="bg-[#111827] border-slate-800/60 shadow-md">
          <CardContent className="p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0">
              <LayoutTemplate className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-medium text-white">{t}</h3>
              <p className="text-xs text-slate-400 mt-1 mb-3">Official corporate template with auto-fill fields.</p>
              <Button size="sm" variant="outline" className="h-7 text-xs border-slate-700 bg-slate-900 text-slate-300 hover:bg-indigo-600 hover:text-white hover:border-indigo-600">Use Template</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const InsightsTab = () => {
  const pieData = [
    { name: 'Reports', value: 85, color: '#3b82f6' },
    { name: 'SOPs', value: 65, color: '#10b981' },
    { name: 'Manuals', value: 45, color: '#f59e0b' },
    { name: 'Drawings', value: 30, color: '#8b5cf6' },
    { name: 'Certificates', value: 75, color: '#ec4899' },
  ];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in duration-300">
      <Card className="bg-[#111827] border-slate-800/60 shadow-md">
        <div className="p-4 border-b border-slate-800/60"><h3 className="font-semibold text-white">Documents by Category</h3></div>
        <CardContent className="p-4 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={70} outerRadius={100} paddingAngle={5} dataKey="value">
                {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
              </Pie>
              <RechartsTooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }} />
              <Legend wrapperStyle={{ color: '#94a3b8' }} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className="bg-[#111827] border-slate-800/60 shadow-md">
        <div className="p-4 border-b border-slate-800/60"><h3 className="font-semibold text-white">AI Query Utilization</h3></div>
        <CardContent className="p-4 h-80 flex items-center justify-center">
          <div className="text-center text-slate-400">
            <LineChartIcon className="w-16 h-16 mx-auto mb-4 opacity-20" />
            <p>Gathering enough telemetry for semantic search utilization...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const ReportsTab = () => (
  <Card className="bg-[#111827] border-slate-800/60 shadow-md animate-in fade-in duration-300">
    <div className="p-4 border-b border-slate-800/60 flex justify-between items-center">
      <h3 className="font-semibold text-white">Generated Reports</h3>
      <Button size="sm" className="bg-blue-600 hover:bg-blue-500 text-white gap-2"><FileBarChart className="w-4 h-4"/> New Report</Button>
    </div>
    <div className="p-4 space-y-3">
      {[1,2,3,4].map(i => (
        <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-slate-900 border border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-red-500/10 text-red-400 flex items-center justify-center"><Download className="w-4 h-4"/></div>
            <div>
              <p className="text-sm font-medium text-slate-200">Knowledge Base Audit - Q{5-i} 2026</p>
              <p className="text-xs text-slate-500">PDF • Generated by Admin • 2.4 MB</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white"><Download className="w-4 h-4"/></Button>
        </div>
      ))}
    </div>
  </Card>
);

const SettingsTab = () => (
  <Card className="bg-[#111827] border-slate-800/60 shadow-md max-w-2xl animate-in fade-in duration-300">
    <div className="p-4 border-b border-slate-800/60"><h3 className="font-semibold text-white">Document Settings</h3></div>
    <CardContent className="p-6 space-y-6 text-sm text-slate-300">
      <div className="flex justify-between items-center pb-4 border-b border-slate-800/60">
        <div>
          <p className="font-medium text-white mb-1">Automatic OCR Processing</p>
          <p className="text-xs text-slate-500">Extract text and metadata from scanned PDFs and Images.</p>
        </div>
        <div className="w-10 h-5 bg-blue-600 rounded-full relative cursor-pointer"><div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5"></div></div>
      </div>
      <div className="flex justify-between items-center pb-4 border-b border-slate-800/60">
        <div>
          <p className="font-medium text-white mb-1">Strict Compliance Mode</p>
          <p className="text-xs text-slate-500">Require approval workflow for all SOP and Policy uploads.</p>
        </div>
        <div className="w-10 h-5 bg-blue-600 rounded-full relative cursor-pointer"><div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5"></div></div>
      </div>
      <div className="flex justify-between items-center pb-4 border-b border-slate-800/60">
        <div>
          <p className="font-medium text-white mb-1">AI Semantic Indexing</p>
          <p className="text-xs text-slate-500">Enable deep learning vectorization for natural language Copilot queries.</p>
        </div>
        <div className="w-10 h-5 bg-blue-600 rounded-full relative cursor-pointer"><div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5"></div></div>
      </div>
      <div>
        <Button variant="destructive" className="bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/20 gap-2"><Trash2 className="w-4 h-4"/> Purge Cache</Button>
      </div>
    </CardContent>
  </Card>
);
