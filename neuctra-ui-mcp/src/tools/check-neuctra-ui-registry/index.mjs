import { createHash } from "node:crypto";
import { z } from "zod";

export function registerCheckNeuctraUiRegistryTool(server, data) {
  const registry = data.registry ?? {};
  const fingerprint = createHash("sha256")
    .update(JSON.stringify({
      version: registry.version,
      componentCount: registry.componentCount,
      components: registry.components,
      search: registry.search,
    }))
    .digest("hex")
    .slice(0, 16);

  const local = {
    version: registry.version ?? null,
    package: registry.package ?? null,
    generatedAt: registry.generatedAt ?? null,
    componentCount: registry.componentCount ?? registry.components?.length ?? 0,
    searchVersion: registry.search?.version ?? null,
    componentRules: registry.search?.componentRules?.length ?? 0,
    designRules: Object.keys(registry.search?.designRules ?? {}).length,
    localExtensions: registry.localExtensions
      ? {
          enabled: registry.localExtensions.enabled ?? false,
          addedCount: registry.localExtensions.addedCount ?? 0,
          addedModules: registry.localExtensions.addedModules ?? 0,
          upstreamSynced: registry.localExtensions.upstreamSynced ?? false,
        }
      : null,
    fingerprint,
  };

  server.registerTool(
    "check-neuctra-ui-registry",
    {
      title: "Check Neuctra UI registry freshness",
      description:
        "Report the local Neuctra UI registry version and optionally compare it with a user-supplied upstream version. Read-only: never syncs, modifies files, or bumps versions.",
      inputSchema: {
        upstreamVersion: z.string().optional().describe("Known upstream registry version to compare against, for example 1.0.18."),
        expectedVersion: z.string().optional().describe("Optional pinned expected version. Used when upstreamVersion is absent."),
      },
    },
    async ({ upstreamVersion, expectedVersion }) => {
      const compareTo = upstreamVersion ?? expectedVersion ?? null;
      const status = !compareTo
        ? "unknown"
        : compareTo === local.version
          ? "current"
          : "needs-review";

      return {
        content: [{
          type: "text",
          text: JSON.stringify({
            tool: "check-neuctra-ui-registry",
            local,
            comparison: {
              comparedTo: compareTo,
              status,
              note: status === "needs-review"
                ? "Local registry differs from the supplied version. Review changes before deciding to sync; this tool never syncs."
                : status === "current"
                  ? "Local registry matches the supplied version."
                  : "No comparison version supplied.",
            },
            nextAction: status === "needs-review"
              ? "Review upstream changes manually. Do not run sync-registry unless intended."
              : "Continue using the pinned registry.",
          }, null, 2),
        }],
      };
    },
  );
}
