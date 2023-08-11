import "frida-il2cpp-bridge";
import { DisableVMProtect } from "./VMProtect.js"

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

;(async () => {
  while (Process.findModuleByName("UserAssembly.dll") == null) {
    console.log("UserAssembly.dll isn't loaded, waiting for a sec.")
    await sleep(1000)
  }

  console.log("Waiting 5 sec for game initialize.")
  await sleep(5000)

  DisableVMProtect()
  console.log("Disabled vm protect.")

  const ua: Module | null = Process.findModuleByName("UserAssembly.dll")

  if (ua == null) return
  
})

