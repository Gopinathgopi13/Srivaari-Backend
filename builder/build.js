import esbuild from "esbuild";

function createBuildSettings(options) {
  return {
    bundle: true,
    platform: "node",
    //drop: ['console', 'debugger'],
    minify: true,
    ...options,
  };
}

esbuild
  .build(
    createBuildSettings({
      entryPoints: ["src/server.js"],
      outfile: "dist/index.js",
    })
  )
  .catch(() => process.exit(1));
esbuild
  .build(
    createBuildSettings({
      entryPoints: ["prisma/seed.js"],
      outfile: "dist/seed.cjs",
    })
  )
  .catch(() => process.exit(1));
