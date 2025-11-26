import { useState, useCallback } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { TriggerSheet } from './TriggerSheet';
import { PriceTrigger } from '../nodes/triggers/PriceTrigger';
import { Timer } from '../nodes/triggers/Timer';
 

const nodeTypes = {
    "price": PriceTrigger,
    "timer": Timer
}

export type NodeKind = "price" | "timer" | "hyperliquid" | "backpack"
interface NodeType {
    type: NodeKind,
    data: {
        kind: "action" | "trigger",
        metadata?: any
    },
    id: string, position: { x: number, y: number }
}

interface Edge { 
    id: string, 
    source: string, 
    target: string 
}
 
export default function CreateWorkflow() {
  const [nodes, setNodes] = useState<NodeType[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
 
  const onNodesChange = useCallback(
    (changes: any) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes: any) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  const onConnect = useCallback(
    (params: any) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );
 
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
        {JSON.stringify(nodes)}
        {!nodes.length && <TriggerSheet onSelect={(type: NodeKind, metadata: any) => {
            setNodes([...nodes, {
                id: Math.random.toString(),
                type,
                data: {
                    kind: "trigger",
                    metadata,
                },
                position: { x: 0, y: 0 }
            }])
        }} />}
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      />
    </div>
  );
}