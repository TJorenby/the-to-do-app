Database Name: to_do_app

=========

CREATE TABLE "task_list" ( dfgfgdfsgsdger
	"id" SERIAL PRIMARY KEY,
	"task_type" VARCHAR(10),
	"task_desc" VARCHAR(100),
	"priority_lvl" VARCHAR (10),
	"due_date" DATE
	);
	
INSERT INTO "task_list" ("task_type", "task_desc", "priority_lvl", "due_date")
	VALUES 
	('Work', 'Test Task', 'Low', '09-12-2020'),
	('Home', 'Test Task 2', 'Medium', '10-15-2020');