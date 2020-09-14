Database Name: weekend-to-do-app

=========

CREATE TABLE "task_list" (
	"id" SERIAL PRIMARY KEY,
	"task_type" VARCHAR(10),
	"task_desc" VARCHAR(100),
	"priority_lvl" VARCHAR (10),
	"due_date" DATE
	);
	
INSERT INTO "task_list" ("task_type", "task_desc", "priority_lvl", "due_date")
	VALUES 
	('Work', 'Test Task', 'Low', '09-12-2020'),
	('Work', 'Test Task 2', 'Medium', '10-02-2020'),
	('Home', 'Test Task 3', 'High', '09-20-2020'),
	('Work', 'Test Task 4', 'Medium', '10-15-2020');