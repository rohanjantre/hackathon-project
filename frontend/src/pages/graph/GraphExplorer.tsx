import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { ReactFlow, Controls, Background, applyNodeChanges, applyEdgeChanges, MiniMap, Panel } from '@xyflow/react';
import type { NodeChange, EdgeChange, Node, Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { graphService } from '../../services/graph';
import { Search, X, Network, Server, FileText, BrainCircuit, Users, Filter, Clock } from 'lucide-react';
import { Button } from '../../components/ui/button';

// Custom Node component styling
const nodeColor = (type: string) => {
  switch (type) {
    case 'Company': return '#f59e0b';
    case 'Plant': return '#10b981';
    case 'Department': return '#06b6d4';
    case 'Asset': return '#3b82f6';
    case 'Document': return '#ef4444';
    case 'Engineer': return '#8b5cf6';
    case 'Maintenance': return '#f97316';
    case 'Inspection': return '#14b8a6';
    case 'Incident': return '#e11d48';
    case 'Compliance': return '#84cc16';
    case 'AI Insight': return '#a855f7';
    default: return '#64748b';
  }
};

const getIcon = (type: string) => {
  switch (type) {
    case 'Asset': return <Server className="w-4 h-4 text-white" />;
    case 'Document': return <FileText className="w-4 h-4 text-white" />;
    case 'Engineer': return <Users className="w-4 h-4 text-white" />;
    case 'AI Insight': return <BrainCircuit className="w-4 h-4 text-white" />;
    default: return <Network className="w-4 h-4 text-white" />;
  }
};

const CustomNode = ({ data }: any) => {
  return (
    <div className="px-4 py-2 shadow-xl rounded-xl border border-slate-700 bg-slate-800 flex items-center gap-3 min-w-[150px] transition-transform hover:scale-105 cursor-pointer">
      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: nodeColor(data.type) }}>
        {getIcon(data.type)}
      </div>
      <div>
        <div className="text-xs font-bold text-white leading-tight">{data.label}</div>
        <div className="text-[10px] text-slate-400 font-mono mt-0.5 uppercase tracking-wider">{data.type}</div>
      </div>
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

export const GraphExplorer: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectedNode, setSelectedNode] = useState<any>(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');

  useEffect(() => {
    loadGraph();
  }, []);

  const loadGraph = async () => {
    try {
      const data = await graphService.getGraph();
      
      // Group by type for concentric layout
      const typeGroups: Record<string, any[]> = {};
      data.nodes.forEach((n: any) => {
        if(!typeGroups[n.type]) typeGroups[n.type] = [];
        typeGroups[n.type].push(n);
      });

      const order = ['Company', 'Plant', 'Department', 'Asset', 'Engineer', 'Maintenance', 'Inspection', 'Document', 'Incident', 'Compliance', 'AI Insight'];
      
      const rfNodes: Node[] = [];
      let currentRadius = 0;
      
      order.forEach((type, index) => {
        const group = typeGroups[type];
        if(!group) return;
        
        currentRadius += (index === 0 ? 0 : Math.max(300, Math.sqrt(group.length) * 55));
        const angleStep = (2 * Math.PI) / group.length;
        
        group.forEach((n, j) => {
          const angle = j * angleStep;
          rfNodes.push({
            id: n.nodeId,
            type: 'custom',
            position: { x: currentRadius * Math.cos(angle), y: currentRadius * Math.sin(angle) },
            data: { label: n.title, type: n.type, fullData: n }
          });
        });
      });

      const rfEdges: Edge[] = data.edges.map((e: any, i: number) => ({
        id: `e-${i}`,
        source: e.source,
        target: e.target,
        label: e.relationship,
        animated: e.relationship.includes('predicts') || e.relationship.includes('affects'),
        style: { stroke: '#475569', strokeWidth: 1.5 },
        labelStyle: { fill: '#94a3b8', fontSize: 9, fontWeight: 600 },
        labelBgStyle: { fill: '#0f172a', color: '#fff', fillOpacity: 0.9, rx: 4, ry: 4 }
      }));

      setNodes(rfNodes);
      setEdges(rfEdges);
    } catch (error) {
      console.error(error);
    }
  };

  const onNodesChange = useCallback((changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)), []);
  const onEdgesChange = useCallback((changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)), []);

  const onNodeClick = async (_: any, node: Node) => {
    try {
      const details = await graphService.getNodeDetails(node.id);
      setSelectedNode(details);
    } catch (error) {
      console.error(error);
    }
  };

  // Derive visible nodes and edges based on state
  const visibleNodes = useMemo(() => {
    return nodes.map(n => {
      const matchesSearch = !searchQuery || n.data.label.toLowerCase().includes(searchQuery.toLowerCase()) || n.data.type.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterType === 'All' || n.data.type === filterType;
      
      let isHighlighted = false;
      if (selectedNode) {
        const selId = selectedNode.node.nodeId;
        if (n.id === selId) isHighlighted = true;
        else if (edges.some(e => (e.source === selId && e.target === n.id) || (e.target === selId && e.source === n.id))) {
          isHighlighted = true;
        }
      } else {
        isHighlighted = true;
      }

      const isVisible = matchesSearch && matchesFilter && isHighlighted;
      return { ...n, style: { opacity: isVisible ? 1 : 0.05, transition: 'opacity 0.3s' }, draggable: isVisible };
    });
  }, [nodes, edges, searchQuery, filterType, selectedNode]);

  const visibleEdges = useMemo(() => {
    return edges.map(e => {
      let isHighlighted = false;
      if (selectedNode) {
        const selId = selectedNode.node.nodeId;
        isHighlighted = e.source === selId || e.target === selId;
      } else {
        isHighlighted = true;
      }
      
      const sourceVisible = visibleNodes.find(n => n.id === e.source)?.style?.opacity === 1;
      const targetVisible = visibleNodes.find(n => n.id === e.target)?.style?.opacity === 1;

      return { 
        ...e, 
        style: { ...e.style, opacity: (isHighlighted && sourceVisible && targetVisible) ? 1 : 0.02, transition: 'opacity 0.3s' },
        animated: isHighlighted && e.animated
      };
    });
  }, [edges, visibleNodes, selectedNode]);

  return (
    <div className="flex-1 flex flex-col h-screen relative bg-slate-950 overflow-hidden">
      {/* Top Bar overlay */}
      <div className="absolute top-0 left-0 right-0 p-4 z-10 flex flex-col md:flex-row justify-between items-start gap-4 pointer-events-none">
        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/60 p-4 rounded-xl pointer-events-auto shadow-2xl flex flex-col gap-2">
          <h1 className="font-bold text-white flex items-center gap-2 text-base"><Network className="w-5 h-5 text-blue-400"/> ForgeMind Knowledge Graph</h1>
          <p className="text-xs text-slate-400">Interactive Enterprise Asset & Relationship Network</p>
        </div>
        
        <div className="flex gap-2 pointer-events-auto">
          <select 
            className="bg-slate-900/90 backdrop-blur-md border border-slate-700/60 text-sm text-slate-200 rounded-xl px-4 py-2 focus:outline-none shadow-xl cursor-pointer"
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
          >
            <option value="All">All Types</option>
            <option value="Asset">Assets</option>
            <option value="Document">Documents</option>
            <option value="Engineer">Engineers</option>
            <option value="Maintenance">Maintenance</option>
            <option value="AI Insight">AI Insights</option>
          </select>
          <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/60 rounded-xl flex items-center shadow-xl w-64 overflow-hidden">
            <Search className="w-4 h-4 ml-3 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search assets, docs, people..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="bg-transparent border-none text-sm text-white px-3 py-2 w-full focus:outline-none focus:ring-0" 
            />
            {searchQuery && <X className="w-4 h-4 mr-3 text-slate-400 cursor-pointer" onClick={() => setSearchQuery('')} />}
          </div>
        </div>
      </div>

      {/* Graph Area */}
      <div className="flex-1 w-full h-full">
        <ReactFlow
          nodes={visibleNodes}
          edges={visibleEdges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          onPaneClick={() => setSelectedNode(null)}
          nodeTypes={nodeTypes}
          fitView
          minZoom={0.05}
          maxZoom={2}
          className="bg-slate-950"
          proOptions={{ hideAttribution: true }}
        >
          <Background color="#1e293b" gap={30} size={2} />
          <Controls className="bg-slate-800 border-slate-700 fill-slate-300" />
          <MiniMap 
            nodeColor={(n: any) => nodeColor(n.data.type)} 
            maskColor="#0f172aAA" 
            style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }} 
          />
        </ReactFlow>
      </div>

      {/* Details Panel Overlay */}
      {selectedNode && (
        <div className="absolute top-4 bottom-4 right-4 w-96 bg-slate-900/95 backdrop-blur-xl border border-slate-700/60 rounded-2xl shadow-2xl z-20 flex flex-col overflow-hidden animate-in slide-in-from-right-8 pointer-events-auto">
          <div className="p-4 border-b border-slate-700/60 flex justify-between items-center bg-slate-800/50">
            <h3 className="font-bold text-white flex items-center gap-2 text-sm">
              <span className="w-3 h-3 rounded-full shadow-[0_0_10px_currentColor]" style={{backgroundColor: nodeColor(selectedNode.node.type), color: nodeColor(selectedNode.node.type)}}></span>
              Node Inspector
            </h3>
            <button onClick={() => setSelectedNode(null)} className="text-slate-400 hover:text-white p-1.5 hover:bg-slate-700 rounded-md transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
            <div>
              <div className="text-xs text-slate-500 font-mono mb-2 flex items-center gap-2">
                <Network className="w-3 h-3"/> {selectedNode.node.nodeId}
              </div>
              <h2 className="text-xl font-bold text-white leading-tight">{selectedNode.node.title}</h2>
              <div className="inline-block mt-3 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider" 
                   style={{backgroundColor: `${nodeColor(selectedNode.node.type)}20`, color: nodeColor(selectedNode.node.type), border: `1px solid ${nodeColor(selectedNode.node.type)}40`}}>
                {selectedNode.node.type}
              </div>
            </div>

            {selectedNode.node.metadata && (
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800 pb-2">Properties & Metadata</h4>
                <div className="space-y-2 pt-1">
                  {Object.entries(selectedNode.node.metadata).map(([k, v]) => (
                    k !== 'id' && k !== 'name' && k !== 'title' && typeof v !== 'object' && (
                    <div key={k} className="flex justify-between items-start text-sm bg-slate-800/40 p-2.5 rounded-md border border-slate-800/60 hover:bg-slate-800/60 transition-colors">
                      <span className="text-slate-500 capitalize">{k.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <span className="text-slate-200 font-medium text-right max-w-[150px] truncate" title={String(v)}>{String(v)}</span>
                    </div>
                  )))}
                </div>
              </div>
            )}

            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800 pb-2 mb-3">Relationships ({selectedNode.edges.length})</h4>
              <div className="space-y-2">
                {selectedNode.edges.map((e: any, i: number) => {
                  const isSource = e.source === selectedNode.node.nodeId;
                  const connectedNodeId = isSource ? e.target : e.source;
                  const connectedNode = nodes.find(n => n.id === connectedNodeId);
                  
                  return (
                    <div key={i} className="p-3 rounded-lg border border-slate-700/60 bg-slate-800/30 text-sm hover:bg-slate-800/80 transition-colors cursor-pointer" onClick={() => onNodeClick(null, connectedNode!)}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-slate-200 truncate max-w-[160px]">{connectedNode?.data?.label || connectedNodeId}</span>
                        <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] uppercase tracking-wider">{e.relationship}</span>
                      </div>
                      <div className="text-slate-500 text-xs flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full" style={{backgroundColor: nodeColor(connectedNode?.data?.type || '')}}></span>
                        {connectedNode?.data?.type} • {isSource ? 'Outbound Link' : 'Inbound Link'}
                      </div>
                    </div>
                  )
                })}
                {selectedNode.edges.length === 0 && (
                  <p className="text-xs text-slate-500 italic p-4 text-center bg-slate-800/30 rounded-lg border border-slate-800/60">No connected nodes found.</p>
                )}
              </div>
            </div>

            <div className="space-y-3">
               <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800 pb-2">Recent Activity Log</h4>
               <div className="space-y-3 pt-1 relative before:absolute before:inset-0 before:ml-3 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-slate-700 before:to-transparent">
                  <div className="relative flex items-start gap-4">
                     <div className="w-6 h-6 rounded-full bg-slate-800 border-2 border-[#0b1120] flex items-center justify-center shrink-0 z-10"><Clock className="w-3 h-3 text-slate-400"/></div>
                     <div>
                        <p className="text-sm text-slate-300">Node accessed via search</p>
                        <p className="text-xs text-slate-500 mt-0.5">Just now</p>
                     </div>
                  </div>
                  <div className="relative flex items-start gap-4">
                     <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 border-2 border-[#0b1120] flex items-center justify-center shrink-0 z-10"><Network className="w-3 h-3"/></div>
                     <div>
                        <p className="text-sm text-slate-300">Relationships synchronized</p>
                        <p className="text-xs text-slate-500 mt-0.5">2 hours ago</p>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
