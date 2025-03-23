import { ReactFlow, Background, Controls, MiniMap } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { MindMapNode } from "./components/mind-map-node";
import { Sidebar } from "./components/sidebar";
import { Header } from "./components/header";
import { useAtom } from "jotai";
import {
  nodesAtom,
  edgesAtom,
  nodesChangeAtom,
  edgesChangeAtom,
  connectAtom,
  selectedNodeAtom,
} from "./store/mind-map-store";

// カスタムノードタイプを定義
const nodeTypes = {
  mindMapNode: MindMapNode,
};

function App() {
  // Jotaiを使って状態を管理
  const [nodes] = useAtom(nodesAtom);
  const [edges] = useAtom(edgesAtom);
  const [, setSelectedNode] = useAtom(selectedNodeAtom);
  const [, onNodesChange] = useAtom(nodesChangeAtom);
  const [, onEdgesChange] = useAtom(edgesChangeAtom);
  const [, onConnect] = useAtom(connectAtom);

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 h-full bg-[url('/grass-texture.png')] bg-repeat">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            minZoom={0.5}
            maxZoom={2}
            nodesDraggable={true}
            elementsSelectable={true}
            snapToGrid={true}
            snapGrid={[15, 15]}
            onNodeClick={(_, node) => {
              setSelectedNode({
                id: node.id,
                data: node.data,
                position: node.position,
              });
            }}
            onPaneClick={() => setSelectedNode(null)}
            proOptions={{ hideAttribution: true }}
          >
            <Background color="#a1a1aa" gap={16} size={1} />
            <Controls className="bg-white/80 p-1 rounded-md border-2 border-amber-500" />
            <MiniMap
              nodeColor={(n) => {
                if (n.id === "root") return "#f97316";
                return "#10b981";
              }}
              maskColor="rgba(255, 255, 255, 0.5)"
              className="bg-white/80 rounded-md border-2 border-amber-500"
            />
          </ReactFlow>
        </div>
        <Sidebar />
      </div>
    </div>
  );
}

export default App;
