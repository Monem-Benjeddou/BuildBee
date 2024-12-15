# API Endpoints Documentation

Base URL: `http://localhost:4005/api`

## Students Endpoints

### Get All Students
- **GET** `/students`
- Returns a list of all students
- Response: Array of student objects

### Get Student by ID
- **GET** `/students/:id`
- Returns a specific student by ID
- Response: Single student object

### Create Student
- **POST** `/students`
- Creates a new student
- Request Body:
```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "phone": "string",
  "birthDate": "YYYY-MM-DD",
  "level": "Débutant|Intermédiaire|Avancé",
  "avatar": "string (URL)",
  "groupIds": ["string"]
}
```

### Update Student
- **PUT** `/students/:id`
- Updates an existing student
- Request Body: Same as Create Student

### Delete Student
- **DELETE** `/students/:id`
- Deletes a student

### Get Student's Groups
- **GET** `/students/:id/groups`
- Returns all groups a student belongs to

## Groups Endpoints

### Get All Groups
- **GET** `/groups`
- Returns a list of all groups

### Get Group by ID
- **GET** `/groups/:id`
- Returns a specific group

### Create Group
- **POST** `/groups`
- Creates a new group
- Request Body:
```json
{
  "name": "string",
  "description": "string",
  "level": "Beginner|Intermediate|Advanced",
  "ageRange": {
    "min": "number",
    "max": "number"
  }
}
```

### Update Group
- **PUT** `/groups/:id`
- Updates an existing group

### Delete Group
- **DELETE** `/groups/:id`
- Deletes a group

### Get Group's Students
- **GET** `/groups/:id/students`
- Returns all students in a group

### Get Group's Sessions
- **GET** `/groups/:id/sessions`
- Returns all sessions for a group

### Add Student to Group
- **POST** `/groups/:id/students`
- Adds a student to a group
- Request Body:
```json
{
  "studentId": "string"
}
```

### Remove Student from Group
- **DELETE** `/groups/:id/students/:studentId`
- Removes a student from a group

## Sessions Endpoints

### Get All Sessions
- **GET** `/sessions`
- Returns a list of all sessions

### Get Session by ID
- **GET** `/sessions/:id`
- Returns a specific session

### Create Session
- **POST** `/sessions`
- Creates a new session
- Request Body:
```json
{
  "name": "string",
  "date": "ISO datetime",
  "duration": "number",
  "location": "string",
  "description": "string",
  "status": "upcoming|completed",
  "groupId": "string"
}
```

### Update Session
- **PUT** `/sessions/:id`
- Updates an existing session

### Delete Session
- **DELETE** `/sessions/:id`
- Deletes a session

### Get Session Attendance
- **GET** `/sessions/:id/attendance`
- Returns attendance for a session

### Mark Session Attendance
- **POST** `/sessions/:id/attendance`
- Marks attendance for a session
- Request Body:
```json
{
  "attendance": ["studentId1", "studentId2"]
}
```

### Get Upcoming Sessions
- **GET** `/sessions/upcoming`
- Returns all upcoming sessions

### Get Completed Sessions
- **GET** `/sessions/completed`
- Returns all completed sessions

## Programs Endpoints

### Get All Programs
- **GET** `/programs`
- Returns a list of all programs

### Get Program by ID
- **GET** `/programs/:id`
- Returns a specific program

### Create Program
- **POST** `/programs`
- Creates a new program
- Request Body:
```json
{
  "name": "string",
  "description": "string",
  "duration": "string"
}
```

### Update Program
- **PUT** `/programs/:id`
- Updates an existing program

### Delete Program
- **DELETE** `/programs/:id`
- Deletes a program

## Testing the API

You can test these endpoints using tools like Postman or curl. Here's an example curl command to get all students:

```bash
curl http://localhost:4005/api/students
```

For POST requests, include the Content-Type header and request body:

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"firstName":"John","lastName":"Doe","email":"john@example.com","phone":"1234567890","birthDate":"2010-01-01","level":"Débutant"}' \
  http://localhost:4005/api/students
```
