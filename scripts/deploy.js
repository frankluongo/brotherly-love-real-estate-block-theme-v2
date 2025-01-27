import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import { zip, COMPRESSION_LEVEL } from "zip-a-folder";

// get the resolved path to the file
const __filename = fileURLToPath(import.meta.url);
// get the name of the directory
const __dirname = path.dirname(__filename);

const dist = process.env.DIST_PATH || path.resolve(__dirname, "../dist");

async function zipIt() {
  try {
    await zip(dist, `${dist}.zip`, { compression: COMPRESSION_LEVEL.high });
    console.log("Zipped!");
  } catch (err) {
    console.error(err);
  }
}

zipIt();
