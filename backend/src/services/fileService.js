import fs from "fs";
import path from "path";

/**
 * Recursively reads a directory and returns its structure with full paths.
 * @param {string} dirPath - The path to read.
 * @returns {object} - JSON structure of the directory.
 */
export const readDirectoryStructure = (dirPath) => {
  try {
    const items = fs.readdirSync(dirPath, { withFileTypes: true });

    return items.map((item) => {
      const itemPath = path.join(dirPath, item.name);
      return {
        name: item.name,
        type: item.isDirectory() ? "directory" : "file",
        path: item.isDirectory() ? null : itemPath, // Only include path for files
        children: item.isDirectory() ? readDirectoryStructure(itemPath) : null,
      };
    });
  } catch (error) {
    throw new Error(`Error reading directory: ${error.message}`);
  }
};
