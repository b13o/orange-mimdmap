import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Pen, Plus, RefreshCw, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  addChildNodeAtom,
  deleteNodeAtom,
  updateNodeLabelAtom,
  resetMindMapAtom,
  selectedNodeAtom,
} from "@/store/mind-map-store";
import { useAtom } from "jotai";
import { useState } from "react";

// 共通のボタンスタイルを関数化
const getButtonStyle = (type: "blue" | "red" | "green") =>
  cn(
    "flex items-center gap-1 border-2 font-pixel",
    type === "blue" && "border-blue-800 bg-blue-600 hover:bg-blue-700",
    type === "red" && "border-red-800 bg-red-600 hover:bg-red-700",
    type === "green" && "border-emerald-800 bg-green-600 hover:bg-green-700"
  );

export function Header() {
  const [selectedNode] = useAtom(selectedNodeAtom);
  const [, addChildNode] = useAtom(addChildNodeAtom);
  const [, updateNodeLabel] = useAtom(updateNodeLabelAtom);
  const [, deleteNode] = useAtom(deleteNodeAtom);
  const [, resetMindMap] = useAtom(resetMindMapAtom);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const [newLabel, setNewLabel] = useState("");

  const handleUpdateLabel = () => {
    if (selectedNode && newLabel.trim()) {
      updateNodeLabel({ nodeId: selectedNode.id, newLabel });
    }
    setIsEditDialogOpen(false);
  };
  return (
    <header className="bg-amber-500 border-b-4 border-amber-600 p-2 flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="font-pixel text-white text-2xl font-bold ml-12">
          Orange Mind-Map 🍊
        </h1>
      </div>

      <div className="py-2 px-4 rounded-md border-2 border-amber-500 flex items-center gap-2">
        <Button
          onClick={() => selectedNode && addChildNode(selectedNode)}
          disabled={!selectedNode}
          className={getButtonStyle("green")}
        >
          子要素の追加
          <Plus className="w-4 h-4" />
        </Button>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogTrigger asChild>
            <Button disabled={!selectedNode} className={getButtonStyle("blue")}>
              編集
              <Pen className="w-4 h-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-amber-100">
            <DialogHeader>
              <DialogTitle>✏️ 内容を更新：</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-4 items-center gap-2 mt-2">
              <Input
                id="node-label"
                defaultValue={(selectedNode?.data.label as string) || ""}
                className="col-span-3 bg-white"
                onChange={(e) => setNewLabel(e.target.value)}
                aria-label="ノードラベル"
              />
              <Button onClick={handleUpdateLabel}>保存</Button>
            </div>
          </DialogContent>
        </Dialog>

        <Button
          onClick={() => selectedNode && deleteNode(selectedNode.id)}
          disabled={!selectedNode}
          className={getButtonStyle("red")}
        >
          削除
          <Trash className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex gap-2">
        <Dialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="destructive"
              size="sm"
              className="font-pixel text-xs flex items-center gap-1 border-2 border-red-800 bg-red-600 hover:bg-red-600"
            >
              すべてリセット
              <RefreshCw className="w-4 h-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] space-y-2 bg-amber-100">
            <DialogTitle>🧹 初期状態にリセットしますか？</DialogTitle>
            <Button
              onClick={() => {
                resetMindMap();
                setIsResetDialogOpen(false);
              }}
            >
              削除
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
}
