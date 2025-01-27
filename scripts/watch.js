import "dotenv/config";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// get the resolved path to the file
const __filename = fileURLToPath(import.meta.url);
// get the name of the directory
const __dirname = path.dirname(__filename);

// We're currently in the scripts directory.
// We need to go up one level to get to the root of the project:
const src = path.resolve(__dirname, "../src");
// The dist directory is stored in an environment variable:
const dist = process.env.DIST_PATH || path.resolve(__dirname, "../dist");

// Watch the src directory for changes:
fs.watch(src, { recursive: true }, (eventType, filename) => {
  if (filename === ".DS_Store") return;
  console.log(eventType, filename);
  // When a change takes place, copy that file over to the dist directory:
  fs.copyFile(
    path.resolve(src, filename),
    path.resolve(dist, filename),
    (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Copied ${filename} to dist`);
      }
    }
  );
});
