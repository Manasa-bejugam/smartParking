# Smart Parking System - Milestone 3 & 4 Report

## Project Overview
This report details the successful implementation of Milestones 3 and 4 for the Smart Parking System. These milestones focus on real-time tracking, payment simulation, advanced slot management, and administrative oversight. The system is designed to be robust, secure, and user-friendly.

---

## 🎯 Milestone 3: Real-Time Timer & Payment

### 1. Parking Timer Functionality
**Objective:** Track parking duration accurately in real-time.
-   **How it Works:**
    -   When a vehicle checks into a slot, the system records the exact `startTime`.
    -   A background job (running on the Node.js server) continuously monitors active bookings.
    -   Upon checkout (or auto-release), the `endTime` is recorded, and the total duration is calculated in minutes/hours.
-   **Key Feature:** Auto-release logic ensures that if a booking expires without action, the slot becomes available again, preventing "zombie" bookings.

### 2. Payment Simulation
**Objective:** Calculate fees and simulate a payment gateway.
-   **How it Works:**
    -   **Fee Calculation:** The backend calculates the fee based on the duration:
        -   First 1 hour: Fixed base rate.
        -   Additional hours: Hourly rate applied.
    -   **Checkout Process:** Before confirming checkout, the user is presented with a "Payment Summary" showing the total parking time and cost.
    -   **Dummy Gateway:** A simulated "Processing Payment..." flow provides immediate feedback (Success/Failure) without needing real credit card details, making it perfect for testing.

---

## 🛡️ Milestone 4: Admin Controls & Management

### 3. Slot Management Panel
**Objective:** Give admins full control over parking infrastructure.
-   **Features Added:**
    -   **Add Slots with Location:** Admins can now create slots and specify their exact location (e.g., "Level 2, Section A"). This is crucial for large parking complexes.
    -   **Delete Slots:** Remove outdated or temporarily closed slots with a single click.
    -   **Real-time Availability:** The panel clearly shows which slots are "Available" (Green) or "Booked" (Red).

### 4. Booking Overview & Analytics
**Objective:** Monitor usage and generate insights.
-   **Features Added:**
    -   **Split History View:**
        -   **Current Bookings:** See who is parked *right now*.
        -   **History:** View a log of all past completions and cancellations.
    -   **Visual Analytics:** Integrated charts displaying revenue trends and booking volume over the last 7 days.
    -   **Java Integration:** We utilize a **Java Spring Boot** microservice to process heavy analytics data (like finding the "Peak Hour"), demonstrating a microservices architecture.

### 5. Secure Admin Access (Bonus Security Layer)
**Objective:** Protect administrative functions.
-   **How it Works:**
    -   **Invite Token System:** Instead of a simple password, registering as an Admin requires a special **JWT Invite Token**.
    -   **Token Generation:** The Super Admin runs a script (`node generateInvite.js`) to generate a unique, time-sensitive token.
    -   **Validation:** The registration process cryptographically verifies this token. If valid, the Admin account is created. This ensures only authorized personnel can gain admin access.

---

## 🚀 How to Run the Project

### Prerequisites
-   Node.js & npm
-   Java JDK (17 or higher) & Maven
-   MongoDB

### Step-by-Step Guide

1.  **Start the Backend (Node.js)**
    ```bash
    cd backend
    node server.js
    ```
    *Server runs on port 5000.*

2.  **Start the Analytics Service (Java)**
    ```bash
    cd parking-validator
    mvn spring-boot:run
    ```
    *Service runs on port 8080.*

3.  **Start the Frontend (React)**
    ```bash
    cd myapp2/myapp
    npm start
    ```
    *App opens at `http://localhost:3000`.*

### Creating an Admin Account
To test the Admin features, generate an invite token:
1.  Open a new terminal.
2.  Run: `node backend/generateInvite.js`
3.  Copy the generated **Token**.
4.  Go to the Register page, select **Admin**, and paste the token.

---

**Student Developer:** [Your Name]
**Date:** December 31, 2024
**Project:** Smart Parking System Internship
