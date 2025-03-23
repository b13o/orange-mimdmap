import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Type } from "lucide-react";
import { addTextBlockAtom } from "@/store/mind-map-store";
import { useAtom } from "jotai";

// テキストブロック作成コンポーネント
const TextBlockCreator = () => {
  const [text, setText] = useState<string>("");
  const [, onAddBlock] = useAtom(addTextBlockAtom);

  const handleAddTextBlock = () => {
    if (text.trim()) {
      onAddBlock(text);
      setText("");
    }
  };

  return (
    <div className="bg-white rounded-lg p-3 border-2 border-amber-500">
      <h3 className="font-pixel text-sm text-amber-800 mb-2 flex items-center">
        <Type className="w-4 h-4 mr-1" /> アイデア
      </h3>
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="ideas here..."
        className="border-2 border-amber-300 h-20 text-sm mb-2 font-pixel"
      />
      <Button
        onClick={handleAddTextBlock}
        className="w-full bg-emerald-500 hover:bg-emerald-600 font-pixel text-xs"
        disabled={!text.trim()}
      >
        追加する
      </Button>
    </div>
  );
};

// 使い方コンポーネント
const Instructions = () => (
  <div className="bg-white rounded-lg p-3 border-2 border-amber-500">
    <h3 className="font-pixel text-sm text-amber-800 mb-2">使い方</h3>
    <ol className="text-xs space-y-2 text-amber-800 list-disc pl-5">
      <li>ブロックをクリックして選択</li>
      <li>ブロックをドラッグして移動</li>
      <li>新規ブロックはサイドバーで作成</li>
      <li>ブロックをつなげてマインドマップを構築しましょう！</li>
      <li>ダブルクリックでズームできますよ😎</li>
    </ol>
  </div>
);

// メインのサイドバーコンポーネント
export function Sidebar() {
  return (
    <div className="w-64 h-full bg-amber-100 border-l-4 border-amber-500 flex flex-col overflow-auto">
      <div className="p-4 bg-amber-200 border-b-4 border-amber-500">
        <h2 className="font-pixel text-lg text-amber-800 mb-2">
          新規ブロックを追加
        </h2>
      </div>

      <div className="p-4 flex flex-col gap-4">
        <TextBlockCreator />
        <Separator className="bg-amber-500 h-0.5" />
        <Instructions />
      </div>
    </div>
  );
}
