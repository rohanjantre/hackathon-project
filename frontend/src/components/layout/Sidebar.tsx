import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Home, Box, FileText, Sparkles, Network, Activity, 
  ShieldCheck, Settings, Users, Link as LinkIcon, 
  ChevronLeft, Workflow, HelpCircle, LogOut 
} from 'lucide-react';
import { Button } from '../ui/button';

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  return (
    <aside className={`bg-[#0f172a] border-r border-slate-800 flex flex-col h-full shrink-0 transition-all duration-300 ease-in-out ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className="p-4">
        <Button 
          onClick={() => navigate('/decision')}
          title="Command Center"
          className={`w-full bg-[#1e293b] hover:bg-[#334155] text-white flex items-center transition-all ${isCollapsed ? 'justify-center px-0 py-6' : 'justify-start gap-3 py-6 px-4'}`}
        >
          <Home className="w-5 h-5 text-blue-400 shrink-0" />
          {!isCollapsed && <span className="font-bold text-sm tracking-wide whitespace-nowrap overflow-hidden">Command Center</span>}
        </Button>
      </div>

      <div className={`flex-1 overflow-y-auto custom-scrollbar py-2 space-y-6 text-sm ${isCollapsed ? 'px-2' : 'px-3'}`}>
        <div>
          {!isCollapsed && <p className="px-3 mb-2 text-[10px] font-bold tracking-widest text-slate-500 uppercase whitespace-nowrap">Core Operations</p>}
          <nav className="space-y-1">
            <NavLink to="/assets" title="Assets" className={({isActive}) => `flex items-center gap-3 py-2 rounded-lg transition-all overflow-hidden ${isCollapsed ? 'justify-center px-0' : 'px-3'} ${isActive ? 'bg-blue-600/20 text-blue-400' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}>
              <Box className="w-4 h-4 shrink-0" /> {!isCollapsed && <span className="whitespace-nowrap">Assets</span>}
            </NavLink>
            <NavLink to="/documents" title="Documents" className={({isActive}) => `flex items-center gap-3 py-2 rounded-lg transition-all overflow-hidden ${isCollapsed ? 'justify-center px-0' : 'px-3'} ${isActive ? 'bg-blue-600/20 text-blue-400' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}>
              <FileText className="w-4 h-4 shrink-0" /> {!isCollapsed && <span className="whitespace-nowrap">Documents</span>}
            </NavLink>
            <NavLink to="/copilot" title="AI Copilot" className={({isActive}) => `flex items-center gap-3 py-2 rounded-lg transition-all overflow-hidden ${isCollapsed ? 'justify-center px-0' : 'px-3'} ${isActive ? 'bg-blue-600/20 text-blue-400' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}>
              <Sparkles className="w-4 h-4 shrink-0" /> {!isCollapsed && <span className="whitespace-nowrap">AI Copilot</span>}
            </NavLink>
            <NavLink to="/graph" title="Knowledge Graph" className={({isActive}) => `flex items-center gap-3 py-2 rounded-lg transition-all overflow-hidden ${isCollapsed ? 'justify-center px-0' : 'px-3'} ${isActive ? 'bg-blue-600/20 text-blue-400' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}>
              <Network className="w-4 h-4 shrink-0" /> {!isCollapsed && <span className="whitespace-nowrap">Knowledge Graph</span>}
            </NavLink>
          </nav>
        </div>

        <div>
          {!isCollapsed && <p className="px-3 mb-2 text-[10px] font-bold tracking-widest text-slate-500 uppercase whitespace-nowrap">AI & Operations</p>}
          <nav className="space-y-1">
            <NavLink to="/predictive" title="Predictive AI" className={({isActive}) => `flex items-center gap-3 py-2 rounded-lg transition-all overflow-hidden ${isCollapsed ? 'justify-center px-0' : 'px-3'} ${isActive ? 'bg-blue-600/20 text-blue-400' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}>
              <Activity className="w-4 h-4 shrink-0" /> {!isCollapsed && <span className="whitespace-nowrap">Predictive AI</span>}
            </NavLink>
            <NavLink to="/compliance" title="Compliance" className={({isActive}) => `flex items-center gap-3 py-2 rounded-lg transition-all overflow-hidden ${isCollapsed ? 'justify-center px-0' : 'px-3'} ${isActive ? 'bg-blue-600/20 text-blue-400' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}>
              <ShieldCheck className="w-4 h-4 shrink-0" /> {!isCollapsed && <span className="whitespace-nowrap">Compliance</span>}
            </NavLink>
            <NavLink to="/workflow" title="Workflow" className={({isActive}) => `flex items-center gap-3 py-2 rounded-lg transition-all overflow-hidden ${isCollapsed ? 'justify-center px-0' : 'px-3'} ${isActive ? 'bg-blue-600/20 text-blue-400' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}>
              <Workflow className="w-4 h-4 shrink-0" /> {!isCollapsed && <span className="whitespace-nowrap">Workflow</span>}
            </NavLink>
          </nav>
        </div>

        <div>
          {!isCollapsed && <p className="px-3 mb-2 text-[10px] font-bold tracking-widest text-slate-500 uppercase whitespace-nowrap">Administration</p>}
          <nav className="space-y-1">
            <NavLink to="/platform" title="Platform Admin" className={({isActive}) => `flex items-center gap-3 py-2 rounded-lg transition-all overflow-hidden ${isCollapsed ? 'justify-center px-0' : 'px-3'} ${isActive ? 'bg-blue-600/20 text-blue-400' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}>
              <Settings className="w-4 h-4 shrink-0" /> {!isCollapsed && <span className="whitespace-nowrap">Platform Admin</span>}
            </NavLink>
            <NavLink to="/platform/users" title="Users & Roles" className={({isActive}) => `flex items-center gap-3 py-2 rounded-lg transition-all overflow-hidden ${isCollapsed ? 'justify-center px-0' : 'px-3'} ${isActive ? 'bg-blue-600/20 text-blue-400' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}>
              <Users className="w-4 h-4 shrink-0" /> {!isCollapsed && <span className="whitespace-nowrap">Users & Roles</span>}
            </NavLink>
            <NavLink to="/platform/integrations" title="Integrations" className={({isActive}) => `flex items-center gap-3 py-2 rounded-lg transition-all overflow-hidden ${isCollapsed ? 'justify-center px-0' : 'px-3'} ${isActive ? 'bg-blue-600/20 text-blue-400' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}>
              <LinkIcon className="w-4 h-4 shrink-0" /> {!isCollapsed && <span className="whitespace-nowrap">Integrations</span>}
            </NavLink>
          </nav>
        </div>

        <div>
          {!isCollapsed && <p className="px-3 mb-2 text-[10px] font-bold tracking-widest text-slate-500 uppercase whitespace-nowrap">System</p>}
          <nav className="space-y-1">
            <NavLink to="/settings" title="Settings" className={({isActive}) => `flex items-center gap-3 py-2 rounded-lg transition-all overflow-hidden ${isCollapsed ? 'justify-center px-0' : 'px-3'} ${isActive ? 'bg-blue-600/20 text-blue-400' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}>
              <Settings className="w-4 h-4 shrink-0" /> {!isCollapsed && <span className="whitespace-nowrap">Settings</span>}
            </NavLink>
            <NavLink to="/support" title="Support" className={({isActive}) => `flex items-center gap-3 py-2 rounded-lg transition-all overflow-hidden ${isCollapsed ? 'justify-center px-0' : 'px-3'} ${isActive ? 'bg-blue-600/20 text-blue-400' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}>
              <HelpCircle className="w-4 h-4 shrink-0" /> {!isCollapsed && <span className="whitespace-nowrap">Support</span>}
            </NavLink>
            <button onClick={() => {
                localStorage.removeItem('token');
                navigate('/login');
              }} 
              title="Logout"
              className={`flex items-center py-2 rounded-lg transition-all text-slate-400 hover:text-red-400 hover:bg-red-500/10 w-full overflow-hidden ${isCollapsed ? 'justify-center px-0' : 'gap-3 px-3 text-left'}`}
            >
              <LogOut className="w-4 h-4 shrink-0" /> {!isCollapsed && <span className="whitespace-nowrap">Logout</span>}
            </button>
          </nav>
        </div>
      </div>

      <div className="p-4 border-t border-slate-800 flex justify-center">
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`flex items-center text-sm text-slate-400 hover:text-white transition-colors w-full ${isCollapsed ? 'justify-center' : 'gap-2'}`}
        >
          <ChevronLeft className={`w-4 h-4 shrink-0 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} /> 
          {!isCollapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  );
};
