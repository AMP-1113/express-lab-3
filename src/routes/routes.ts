import express from "express";
import Assignment from "../models/assignment";
import {assignments, pushAssignment, readAssignmentById, deleteAssignment, updateAssignment, overallAverage} from "../models/assignment-db"

const routes = express.Router();

routes.get("/", (req, res) => {
    const average = overallAverage(assignments);
    const stringAverage: string = average.toFixed(1)
    res.render("homepage", {assignments, stringAverage});
});

routes.get("/add", (req, res) => {
    res.render("assignment-form");
});

routes.post("/add", (req, res) => {
    let assignment: Assignment = {
        name: req.body.name,
        score: parseInt(req.body.score),
        total: parseInt(req.body.total),
        completed: !!req.body.completed
    }
    pushAssignment(assignment)
    res.render("assignment-result", {assignment});
});

// Delete
routes.get("/:id/delete", (req, res) => {
    const id = parseInt(req.params.id);
    const assignment = readAssignmentById(id)
    if (assignment) {
        deleteAssignment(id);
        res.render('delete-confirmation', { name: assignment.name });
    } else {
      res.status(404).render('error/not-found');
    }
});

// Edit (show)
routes.get("/edit", (req, res) => {
    const id: number = parseInt(req.query.id as string);
    const assignment = readAssignmentById(id);
    if (assignment) {
        console.log(assignment.id);
      res.render('edit-assignment', { assignment });
    } else {
      res.status(404).render('error/not-found');
    }
  });

// Handle form submit
routes.post('/edit', (req, res) => {
    const assignment: Assignment = {
        id: parseInt(req.body.id),
        name: req.body.name,
        score: parseInt(req.body.score),
        total: parseInt(req.body.total),
        completed: !!req.body.completed,
    }
    if(updateAssignment(assignment)) {
      res.render('edit-confirmation', {assignment});
    } else {
      res.status(404).render('error/not-found');
    }
  });


export default routes;