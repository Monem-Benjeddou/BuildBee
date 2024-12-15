# Student Management System API

A Node.js and MongoDB-based API for managing students, groups, sessions, and programs.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd student-management-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a .env file in the root directory with the following content:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/student-management
NODE_ENV=development
```

4. Make sure MongoDB is running on your local machine.

5. Start the application:
```bash
# Development mode with nodemon
npm run dev

# Production mode
npm start
```

The API will be available at `http://localhost:5000`.

## API Endpoints

### Students
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get student by ID
- `POST /api/students` - Create new student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student
- `GET /api/students/:id/groups` - Get groups for a student

### Groups
- `GET /api/groups` - Get all groups
- `GET /api/groups/:id` - Get group by ID
- `POST /api/groups` - Create new group
- `PUT /api/groups/:id` - Update group
- `DELETE /api/groups/:id` - Delete group
- `GET /api/groups/:id/students` - Get students in a group
- `GET /api/groups/:id/sessions` - Get sessions for a group
- `POST /api/groups/:id/students` - Add student to group
- `DELETE /api/groups/:id/students/:studentId` - Remove student from group

### Sessions
- `GET /api/sessions` - Get all sessions
- `GET /api/sessions/:id` - Get session by ID
- `POST /api/sessions` - Create new session
- `PUT /api/sessions/:id` - Update session
- `DELETE /api/sessions/:id` - Delete session
- `GET /api/sessions/:id/attendance` - Get attendance for a session
- `POST /api/sessions/:id/attendance` - Mark attendance for a session
- `GET /api/sessions/upcoming` - Get upcoming sessions
- `GET /api/sessions/completed` - Get completed sessions

### Programs
- `GET /api/programs` - Get all programs
- `GET /api/programs/:id` - Get program by ID
- `POST /api/programs` - Create new program
- `PUT /api/programs/:id` - Update program
- `DELETE /api/programs/:id` - Delete program

## Models

### Student
```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "phone": "string",
  "birthDate": "string (YYYY-MM-DD)",
  "level": "string (Débutant|Intermédiaire|Avancé)",
  "avatar": "string (URL)",
  "groupIds": "string[]"
}
```

### Group
```json
{
  "name": "string",
  "description": "string",
  "level": "string (Beginner|Intermediate|Advanced)",
  "ageRange": {
    "min": "number",
    "max": "number"
  },
  "studentIds": "string[]",
  "sessionIds": "string[]"
}
```

### Session
```json
{
  "name": "string",
  "date": "string (ISO datetime)",
  "duration": "number (minutes)",
  "location": "string",
  "description": "string",
  "status": "string (upcoming|completed)",
  "groupId": "string",
  "attendance": "string[] (student IDs)"
}
```

### Program
```json
{
  "name": "string",
  "description": "string",
  "duration": "string"
}
```
