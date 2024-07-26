import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast, useToast } from "@/components/ui/use-toast";
import { useCallback, useState } from "react";
type Props = { setScripts: any; scripts: string[] };

export default function ScriptsContent({ setScripts, scripts }: Props) {
  return (
    <div className="m-32 mx-auto mb-20 mt-10 flex w-full items-center justify-center gap-28 rounded-2xl bg-card px-8 py-5">
      <Scripts scripts={scripts} setScripts={setScripts} />
      <ScriptTextArea setScripts={setScripts} scripts={scripts} />
    </div>
  );
}

function Scripts({ scripts, setScripts }: Props) {
  const deleteScript = (index: number) => {
    const newScripts = [...scripts];
    newScripts.splice(index, 1);
    setScripts(newScripts);
  };
  return (
    <div className="w-5/12">
      {scripts.map((scripts, index) => {
        return (
          <div className="mt-4 flex items-center justify-between rounded-lg bg-[#34405480] p-4">
            <p className="text-white">{scripts}</p>
            <Button variant="destructive" onClick={() => deleteScript(index)}>
              Delete
            </Button>
          </div>
        );
      })}
    </div>
  );
}

function ScriptTextArea({ setScripts, scripts }: Props) {
  const [script, setScript] = useState("");
  const { toast } = useToast();

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText("[name]");
  }, []);

  const saveScript = useCallback(() => {
    if (script) {
      setScripts([...scripts, script]);
      setScript(""); // Clear the textarea after saving
    }
  }, [script, setScripts]);
  return (
    <div className="w-5/12">
      <Textarea
        placeholder="Hi [name] how's it going?..."
        className="h-56 w-full resize-y bg-card text-white !outline-none"
        value={script}
        onChange={(e) => setScript(e.currentTarget.value)}
      />

      <div className="mt-4 flex w-full justify-between">
        <Button
          className="!bg-[#6C48F7]"
          variant="destructive"
          onClick={() => {
            toast({
              title: "Copied to clipboard!",
            });
            copyToClipboard();
          }}
        >
          First Name
        </Button>
        <Button disabled={!script} onClick={saveScript}>
          Save
        </Button>
      </div>
    </div>
  );
}
