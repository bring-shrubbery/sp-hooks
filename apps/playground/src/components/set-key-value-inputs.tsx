import { useState } from "react";
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

export const SetKeyValueInputs = ({ setState }: { setState: (key: string, value: string) => void}) => {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");

  return <div className="space-y-2">
  <div className="flex gap-2">
    <div>
      <Label>Key</Label>
      <Input type="text" value={key} onChange={(e) => setKey(e.target.value)} />
    </div>

    <div>
      <Label>Value</Label>
      <Input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
    </div>

  </div>

  <Button className="block" onClick={() => setState(key, value)}>Set</Button>
</div>
}