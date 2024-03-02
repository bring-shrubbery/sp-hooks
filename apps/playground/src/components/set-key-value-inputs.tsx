import { Dispatch, SetStateAction, useState } from "react";
import { PlusIcon } from "lucide-react";

import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export const SetKeyValueInputs = ({
  setState,
}: {
  setState: Dispatch<SetStateAction<Record<string, string | string[]>>>
}) => {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <div>
          <Label>Key</Label>
          <Input
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
        </div>

        <div>
          <Label>Value</Label>
          <Input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      </div>

      <Button className="block" onClick={() => setState((s) => ({...s, [key]: value}))}>
        Set
      </Button>
    </div>
  );
};

export const SetKeyValueArrayInputs = ({
  setState,
}: {
  setState: (key: string, value: string[]) => void;
}) => {
  const [key, setKey] = useState("");
  const [v, sv] = useState("");
  const [values, setValues] = useState<string[]>([]);

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <div>
          <Label>Key</Label>
          <Input
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <div className="flex gap-2 items-end">
            <div>
              <Label>Value</Label>
              <Input
                type="text"
                value={v}
                onChange={(e) => sv(e.target.value)}
              />
            </div>
            <Button
              onClick={() => {
                setValues([...values, v]);
                sv("");
              }}
            >
              <PlusIcon size={18} />
            </Button>
          </div>
          <div className="flex gap-1">
            {values.map((node, i) => {
              return <Badge key={i}>{node}</Badge>;
            })}
          </div>
        </div>
      </div>

      <Button className="block" onClick={() => setState(key, values)}>
        Set
      </Button>
    </div>
  );
};
