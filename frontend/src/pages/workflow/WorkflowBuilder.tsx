import React from 'react';
import { Button } from '../../components/ui/button';
import { PlayCircle, Plus, Settings, Workflow } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/card';

export const WorkflowBuilder: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col bg-slate-900/50 p-6 md:p-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Workflow className="text-blue-400 w-8 h-8" />
            Workflow Builder
          </h1>
          <p className="text-slate-400 mt-1">Design automated response sequences visually.</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="border-slate-700 text-slate-300 gap-2"><Settings className="w-4 h-4" /> Properties</Button>
          <Button className="bg-blue-600 hover:bg-blue-500 text-white shadow-glow"><PlayCircle className="w-4 h-4 mr-2" /> Save & Activate</Button>
        </div>
      </div>

      <Card className="glass-card flex-1 flex items-center justify-center border-dashed border-2 border-slate-700 bg-slate-800/30">
        <CardContent className="text-center p-10">
          <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-4 border border-slate-700 shadow-xl">
            <Plus className="w-8 h-8 text-blue-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Drag and Drop Workflow Designer</h3>
          <p className="text-slate-400 max-w-md mx-auto mb-6">
            React Flow based designer is ready to be initialized. Add triggers like "Document Uploaded" or "High Risk Prediction" and connect them to actions.
          </p>
          <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700">Initialize Visual Builder</Button>
        </CardContent>
      </Card>
    </div>
  );
};
