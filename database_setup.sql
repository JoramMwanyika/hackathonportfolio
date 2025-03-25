-- Create the portfolio database
CREATE DATABASE IF NOT EXISTS portfolio_db;

-- Use the portfolio database
USE portfolio_db;

-- Create contacts table for storing form submissions
CREATE TABLE IF NOT EXISTS contacts (
id INT(11) AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100) NOT NULL,
email VARCHAR(100) NOT NULL,
subject VARCHAR(255) NOT NULL,
message TEXT NOT NULL,
submission_date DATETIME NOT NULL
);

-- Create users table for admin access (if needed)
CREATE TABLE IF NOT EXISTS users (
id INT(11) AUTO_INCREMENT PRIMARY KEY,
username VARCHAR(50) NOT NULL UNIQUE,
password VARCHAR(255) NOT NULL,
email VARCHAR(100) NOT NULL,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create projects table to store project information
CREATE TABLE IF NOT EXISTS projects (
id INT(11) AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(255) NOT NULL,
description TEXT NOT NULL,
problem TEXT,
solution TEXT,
technologies VARCHAR(255),
image_url VARCHAR(255),
github_url VARCHAR(255),
demo_url VARCHAR(255),
created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create skills table to store skill information
CREATE TABLE IF NOT EXISTS skills (
id INT(11) AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100) NOT NULL,
category VARCHAR(50) NOT NULL,
proficiency INT(3) NOT NULL,
icon VARCHAR(50)
);

-- Insert sample projects
INSERT INTO projects (title, description, problem, solution, technologies, image_url, github_url, demo_url) VALUES
('Automated Patient Appointment System', 'An automated system for managing patient appointments and follow-ups', 'Managing patient appointments manually can lead to scheduling conflicts, missed appointments, and administrative inefficiencies.', 'I created an automated system that handles appointment scheduling, follow-up communications, and patient feedback collection.', 'Zapier,Airtable,Make,Google Forms', 'assets/project1.jpg', 'https://github.com/Joram-tech/patient-appointment-system', 'https://www.youtube.com/watch?v=C2XsWDOzPCg'),
('Addiction Solver App', 'A comprehensive platform to support individuals in managing their addictions', 'Addiction is a prevalent issue affecting many individuals worldwide, leading to various health, social, and economic problems.', 'An addiction solver app built using the Flask framework provides a comprehensive and accessible platform to support individuals in managing their addictions.', 'Python,Flask,SQLite,HTML/CSS,JavaScript', 'assets/project2.jpg', 'https://github.com/Joram-tech/addiction-solver', 'https://www.youtube.com/watch?v=9sxwePMDj5U'),
('Workflow Automation System', 'A system that automates data synchronization, task management, and customer communications', 'Organizations often struggle with inefficient manual processes that consume valuable time and resources.', 'I developed a comprehensive workflow automation system that integrates multiple platforms including NetSuite, ClickUp, and ActiveCampaign.', 'Make.com,Zapier,REST APIs,JavaScript,Google Sheets', 'assets/project3.jpg', 'https://github.com/Joram-tech/workflow-automation', NULL);

-- Insert skills
INSERT INTO skills (name, category, proficiency, icon) VALUES
('Python', 'Programming Languages', 85, 'fab fa-python'),
('HTML/CSS', 'Programming Languages', 80, 'fab fa-html5'),
('JavaScript', 'Programming Languages', 70, 'fab fa-js'),
('SQL', 'Programming Languages', 75, 'fas fa-database'),
('Java', 'Programming Languages', 65, 'fab fa-java'),
('Flask', 'Frameworks & Libraries', 75, 'fas fa-flask'),
('SQLAlchemy', 'Frameworks & Libraries', 70, 'fas fa-database'),
('Zapier', 'Automation Tools', 90, 'fas fa-robot'),
('Make.com', 'Automation Tools', 90, 'fas fa-cogs'),
('Airtable', 'Automation Tools', 85, 'fas fa-table'),
('REST APIs', 'Other Technologies', 80, 'fas fa-exchange-alt'),
('Git', 'Other Technologies', 75, 'fab fa-git-alt');

-- Create a view to get all projects with their technologies as an array
CREATE VIEW project_details AS
SELECT 
p.id,
p.title,
p.description,
p.problem,
p.solution,
p.technologies,
p.image_url,
p.github_url,
p.demo_url,
p.created_at,
p.updated_at
FROM 
projects p;

-- Create a view to get skills by category
CREATE VIEW skills_by_category AS
SELECT 
category,
JSON_ARRAYAGG(
    JSON_OBJECT(
        'id', id,
        'name', name,
        'proficiency', proficiency,
        'icon', icon
    )
) as skills
FROM 
skills
GROUP BY 
category;