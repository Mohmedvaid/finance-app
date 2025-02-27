import express from "express";
import {
  getDirectoryStructure,
  downloadFile,
} from "../controllers/fileController.js";

const router = express.Router();

router.get("/structure", getDirectoryStructure);
router.get("/download", downloadFile); // New route for downloading files

export default router;
