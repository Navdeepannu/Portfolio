/**
 * Thin compatibility layer over the centralized registry helpers in
 * `@/lib/registry`. Several showcase components import package-manager types and
 * install commands from here; the actual registry URL logic lives in one place
 * (`@/lib/registry`) so the production domain only needs to change there.
 */
export {
  type PackageManagerId,
  REGISTRY_NAMESPACE,
  getRegistryItemUrl,
  getRegistryNamespaceRef,
  getRegistryNamespaceUrlTemplate,
  getRegistryConfigSnippet,
  getDirectInstallCommands,
  getNamespaceInstallCommands,
  // Default install method shown in the UI = the official @navui namespace.
  getNamespaceInstallCommands as getInstallCommands,
} from '@/lib/registry'
