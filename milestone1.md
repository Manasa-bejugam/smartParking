# Milestone 1 Report - ParkEase
**Infosys Springboard Internship - Java Tech Domain**

---

## Introduction

This is my first milestone report out of four for the Infosys Springboard internship. Even though my domain is Java Tech, this milestone focused on learning web development fundamentals using Node.js and JavaScript. I understand we'll be moving to Java in later milestones, but starting with these basics helped me understand how web applications work.

For this milestone, I built "ParkEase", a Smart Parking System to practice the concepts they taught us.

---

## Project Overview

I created a modern web application for managing parking spaces. It's not a complete project - just a learning exercise to understand backend and frontend development basics.

**What it does:**
- Users can register and login
- Different views for regular users and admins
- Shows parking slot availability
- Admin can see all registered users

I chose this idea because finding parking is a common problem, and it gave me a chance to work with databases, authentication, and user interfaces.

---

## What I Learned

### Backend Development

**Node.js & Express**: This was my first time doing backend development. I learned how to:
- Set up a server
- Create API endpoints
- Handle HTTP requests and responses
- Organize code into routes and controllers

**MongoDB**: I used MongoDB to store user data and parking slot information. I learned about:
- Creating database schemas
- CRUD operations (Create, Read, Update, Delete)
- Connecting to a database from my application

**Authentication**: I implemented login/signup using JWT tokens and bcrypt for password hashing. This taught me about:
- How user sessions work
- Why we hash passwords
- Protecting routes that need authentication

### Frontend Development

**HTML/CSS/JavaScript**: I built the user interface with basic web technologies:
- Created forms for login and registration
- Styled pages with CSS (used a modern blue/green parking theme)
- Used JavaScript to connect with my backend APIs
- Learned about async/await for API calls

---

## Challenges I Faced

**Understanding Backend Structure**: At first, I didn't know how to organize my code. I learned to separate routes, models, and middleware into different files.

**JWT Tokens**: I was confused about how to send tokens with requests. I figured out I need to store the token after login and include it in headers for protected routes.

**Connecting Frontend and Backend**: Getting my HTML pages to talk to the Node.js server took some trial and error. I learned about CORS and how to make fetch requests properly.

**Debugging Errors**: I made a lot of mistakes - typos, wrong endpoints, forgetting to hash passwords. Reading error messages carefully helped me fix issues.

---

## What I Built

### Backend
- User registration and login endpoints
- Protected routes for user and admin dashboards
- Database models for users and parking slots
- Middleware for authentication and role checking

### Frontend
- Login page
- Registration page
- User dashboard (shows parking slots and vehicle info)
- Admin dashboard (shows all users and statistics)

The design is simple but professional - I used glassmorphism effects and appropriate parking colors (blue/green) with a clean layout.

---

## Reflection

This milestone taught me the basics of full-stack development. I now understand how servers work, how to store data in databases, and how to build user interfaces that interact with backends.

Some key takeaways:
- Breaking down problems into smaller tasks makes them manageable
- Security is important (hashing passwords, validating input)
- Organization matters - keeping code clean and modular
- Debugging is part of learning

I know this is just a basic project and there's a lot more to learn. I'm looking forward to the next milestones where we'll probably work with Java and build more complex applications.

---

## Next Steps

For future milestones, I want to:
- Learn Java backend development (since that's my actual domain)
- Understand Spring framework
- Build more complete applications
- Work on real-world projects

This was a good starting point to understand web development fundamentals before moving to Java technologies.

---

**Milestone**: 1 of 4  
**Domain**: Java Tech  
**Technologies Used**: Node.js, Express, MongoDB, HTML, CSS, JavaScript  
**Date**: December 2025
