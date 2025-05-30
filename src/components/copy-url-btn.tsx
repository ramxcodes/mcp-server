import { ScriptCopyBtn } from "@/components/magicui/script-copy-btn";

export function ScriptCopyBtnDemo() {
  const customCommandMap = {
    npm: "https://mcp.ramx.in/mcp",
  };
  return (
    <ScriptCopyBtn
      showMultiplePackageOptions={false}
      codeLanguage="shell"
      lightTheme="nord"
      darkTheme="vitesse-dark"
      commandMap={customCommandMap}
    />
  );
}
