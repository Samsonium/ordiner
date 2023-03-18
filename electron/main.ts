import Database from "./database";
import AppWindow from "./window";

// Get database instance first time to create singleton instance
Database.instance;

// Create window
const win = new AppWindow();

