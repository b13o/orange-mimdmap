import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

export default function App() {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [textareaValue, setTextareaValue] = useState("");

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">shadcn/ui 確認</h1>
      <div className="space-y-6">
        <div>
          <Button variant="default">ボタン</Button>
        </div>
        <Separator />
        <div>
          <Input
            placeholder="テキストを入力してください"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="mb-2"
          />
          <p className="text-sm">入力値: {inputValue}</p>
        </div>
        <Separator />
        <div>
          <Textarea
            placeholder="長文を入力してください"
            value={textareaValue}
            onChange={(e) => setTextareaValue(e.target.value)}
            className="mb-2"
          />
          <p className="text-sm">入力値: {textareaValue}</p>
        </div>
        <Separator />
        <div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>ダイアログを開く</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>ダイアログの確認</DialogTitle>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  キャンセル
                </Button>
                <Button onClick={() => setOpen(false)}>確認</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
