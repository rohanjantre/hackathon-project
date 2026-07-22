import React from 'react';
import { Settings, Shield, Bell, Zap } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';

export const SystemSettings: React.FC = () => {
  return (
    <div className="flex-1 bg-slate-900/50 p-6 md:p-10 space-y-8 max-w-5xl mx-auto w-full">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <Settings className="text-blue-400 w-6 h-6" />
          System Settings
        </h1>
        <p className="text-slate-400 mt-1">Configure global application behaviors and security policies.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 font-semibold transition-colors">
            <Settings className="w-4 h-4" /> General
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800/50 transition-colors">
            <Shield className="w-4 h-4" /> Security
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800/50 transition-colors">
            <Zap className="w-4 h-4" /> AI Configuration
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800/50 transition-colors">
            <Bell className="w-4 h-4" /> Notifications
          </button>
        </div>

        <div className="col-span-2 space-y-6">
          <Card className="glass-card">
            <div className="p-4 border-b border-slate-700/50">
              <h3 className="font-bold text-white">General Settings</h3>
            </div>
            <CardContent className="p-6 space-y-6">
              <div>
                <label className="text-sm font-semibold text-slate-300 block mb-2">Default Timezone</label>
                <select className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500">
                  <option>UTC (Coordinated Universal Time)</option>
                  <option>EST (Eastern Standard Time)</option>
                  <option>CET (Central European Time)</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-300 block mb-2">Data Retention Period (Days)</label>
                <input type="number" defaultValue={365} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500" />
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-800/40 rounded-lg border border-slate-700/50">
                <div>
                  <h4 className="text-white font-semibold">Maintenance Mode</h4>
                  <p className="text-sm text-slate-400">Lock the application for all non-admin users.</p>
                </div>
                <div className="w-12 h-6 bg-slate-700 rounded-full relative cursor-pointer">
                  <div className="w-5 h-5 bg-slate-400 rounded-full absolute top-0.5 left-0.5"></div>
                </div>
              </div>
              
              <Button className="bg-blue-600 hover:bg-blue-500 text-white">Save Changes</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
