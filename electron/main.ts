import Database from "./database";
import AppWindow from "./window";

// Load or initialize collections
Database.instance.loadCollections();

// Create window
const win = new AppWindow();

