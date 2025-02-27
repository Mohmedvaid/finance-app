import path from "path";
import fs from "fs";
import ErrorResponse from "../utils/errorResponse.js";
import { readDirectoryStructure } from "../services/fileService.js";

export const getDirectoryStructure = (req, res, next) => {
  try {
    const dirPath = req.query.path || process.env.FILES_PATH;

    if (!fs.existsSync(dirPath)) {
      return next(new ErrorResponse("Invalid directory path", 400));
    }

    const structure = readDirectoryStructure(dirPath);
    res.json({ path: dirPath, structure });
  } catch (error) {
    next(new ErrorResponse("Something went wrong", 500));
  }
};

/**
 * Controller to handle file downloads
 */
export const downloadFile = (req, res, next) => {
  try {
    const filePath = req.query.path;

    if (!filePath) {
      console.error("❌ Error: File path is missing in request.");
      return next(new ErrorResponse("File path is required", 400));
    }

    // Sanitize the file path to prevent directory traversal attacks
    const baseDir = process.env.FILES_PATH || "/Users/husainvaid/shared-folder";
    const resolvedPath = path.resolve(baseDir, filePath);

    // Check if file is inside the allowed directory
    if (!resolvedPath.startsWith(baseDir)) {
      console.error("❌ Security Alert: Unauthorized file access attempt.");
      return next(new ErrorResponse("Access denied", 403));
    }

    // Check if file exists
    if (!fs.existsSync(resolvedPath)) {
      console.error(`❌ Error: File not found - ${resolvedPath}`);
      return next(new ErrorResponse("File not found", 404));
    }

    // Send file for download
    res.download(resolvedPath, (err) => {
      if (err) {
        console.error("❌ Error while downloading file:", err);
        return next(new ErrorResponse("Error downloading file", 500));
      }
    });
  } catch (error) {
    console.error("❌ Unexpected error in downloadFile:", error);
    next(
      new ErrorResponse("Something went wrong while downloading the file", 500)
    );
  }
};
