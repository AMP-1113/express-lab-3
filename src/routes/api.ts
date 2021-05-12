import express from "express";
import {assignments, overallAverage} from "../models/assignment-db"
const routes = express.Router();

routes.get("/api/assignments", (req, res) => {
    res.json(assignments);
    res.status(200);
});

routes.get("/api/summary", (req, res) => {
    res.json({overallAverage: overallAverage(assignments), assignments});
    res.status(200);
});

export default routes;