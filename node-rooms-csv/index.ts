import { Room } from "./types/types";
const fs = require("fs");

// Calling the readFileSync() method
// to read 'input.txt' file
const data = fs.readFileSync("./node-rooms-csv/json/rooms.json");
const dataJson = JSON.parse(data);

// Order by price all data
dataJson.sort((a: Room, b: Room) => a.priceNight.localeCompare(b.priceNight));
// Display the file data
console.log(dataJson);

// Extract the headers of our keys object
const headers = Object.keys(dataJson[0]).join(",");
const rows = dataJson.map((obj: Room) => Object.values(obj).join(","));

const dataCsv = [headers, ...rows].join("\n");

// Write the file.csv
fs.writeFileSync("./node-rooms-csv/rooms.csv", dataCsv);
