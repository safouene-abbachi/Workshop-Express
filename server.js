const express = require("express");
const app = express();

app.use(express.json());

const courses = [
  { id: 1, name: "course 1" },
  { id: 2, name: "course 2" },
  { id: 3, name: "course 3" },
];

app.get("/", (req, res) => {
  res.send("hello world !!!");
});
// getting all courses
app.get("/api/courses", (req, res) => {
  res.send(courses);
});
// getting course by id
app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((el) => el.id == req.params.id);
  if (!course) res.status(404).send("courses not found");
  res.send(course);
});

//Adding nex Coursed
app.post("/api/courses", (req, res) => {
  const newCourse = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(newCourse);
  res.send(newCourse);
});
// Editting a course by id
app.put("/api/courses/:id", (req, res) => {
  const course = courses.find((el) => el.id == req.params.id);
  if (!course) res.status(404).send("courses not found");
  course.name = req.body.name;
  res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find((el) => el.id == req.params.id);
  if (!course) res.status(404).send("courses not found");
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is running on port ${port} ...`);
});
