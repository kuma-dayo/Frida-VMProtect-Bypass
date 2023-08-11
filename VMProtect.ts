// https://github.com/yubie-re/vmp-virtualprotect-bypass/blob/main/src/vp-patch.hpp
export function DisableVMProtect() {
  const NtQuerySection = Module.findExportByName("ntdll.dll", "NtQuerySection")
  if (!NtQuerySection) throw new Error("NtQuerySection not found")

  const ntQuerySectionPtr = new NativeFunction(NtQuerySection, "uint32", ["pointer"])

  const callCode = ntQuerySectionPtr.add(4).readU8() - 1
  const restore = Memory.alloc(5)
  restore.writeByteArray([0x4c, 0x8b, 0xd1, 0xb8, callCode])
  const ntProtectVirtualMemoryPtr = Module.findExportByName("ntdll.dll", "NtProtectVirtualMemory")
  if (!ntProtectVirtualMemoryPtr) throw new Error("NtProtectVirtualMemory not found")

  Memory.protect(ntProtectVirtualMemoryPtr, 5, "rwx")
  Memory.copy(ntProtectVirtualMemoryPtr, restore, 5)
  Memory.protect(ntProtectVirtualMemoryPtr, 5, "rx")
}