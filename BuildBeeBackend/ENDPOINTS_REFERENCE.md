# API Endpoints Reference

Base URL: `http://localhost:4005/api`

## Students API

| Endpoint | Method | Parameters | Request Body | Description |
|----------|---------|------------|--------------|-------------|
| `/students` | GET | - | - | Get all students |
| `/students/:id` | GET | `id`: Student ID | - | Get student by ID |
| `/students` | POST | - | ```json
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
``` | Create new student |
| `/students/:id` | PUT | `id`: Student ID | Same as POST | Update student |
| `/students/:id` | DELETE | `id`: Student ID | - | Delete student |
| `/students/:id/groups` | GET | `id`: Student ID | - | Get student's groups |

## Groups API

| Endpoint | Method | Parameters | Request Body | Description |
|----------|---------|------------|--------------|-------------|
| `/groups` | GET | - | - | Get all groups |
| `/groups/:id` | GET | `id`: Group ID | - | Get group by ID |
| `/groups` | POST | - | ```json
{
  "name": "string",
  "description": "string",
  "level": "Beginner|Intermediate|Advanced",
  "ageRange": {
    "min": number,
    "max": number
  }
}
``` | Create new group |
| `/groups/:id` | PUT | `id`: Group ID | Same as POST | Update group |
| `/groups/:id` | DELETE | `id`: Group ID | - | Delete group |
| `/groups/:id/students` | GET | `id`: Group ID | - | Get group's students |
| `/groups/:id/sessions` | GET | `id`: Group ID | - | Get group's sessions |
| `/groups/:id/students` | POST | `id`: Group ID | ```json
{
  "studentId": "string"
}
``` | Add student to group |
| `/groups/:id/students/:studentId` | DELETE | `id`: Group ID<br>`studentId`: Student ID | - | Remove student from group |

## Sessions API

| Endpoint | Method | Parameters | Request Body | Description |
|----------|---------|------------|--------------|-------------|
| `/sessions` | GET | - | - | Get all sessions |
| `/sessions/:id` | GET | `id`: Session ID | - | Get session by ID |
| `/sessions` | POST | - | ```json
{
  "name": "string",
  "date": "ISO datetime",
  "duration": number,
  "location": "string",
  "description": "string",
  "status": "upcoming|completed",
  "groupId": "string"
}
``` | Create new session |
| `/sessions/:id` | PUT | `id`: Session ID | Same as POST | Update session |
| `/sessions/:id` | DELETE | `id`: Session ID | - | Delete session |
| `/sessions/:id/attendance` | GET | `id`: Session ID | - | Get session attendance |
| `/sessions/:id/attendance` | POST | `id`: Session ID | ```json
{
  "attendance": ["studentId1", "studentId2"]
}
``` | Mark session attendance |
| `/sessions/upcoming` | GET | - | - | Get upcoming sessions |
| `/sessions/completed` | GET | - | - | Get completed sessions |

## Programs API

| Endpoint | Method | Parameters | Request Body | Description |
|----------|---------|------------|--------------|-------------|
| `/programs` | GET | - | - | Get all programs |
| `/programs/:id` | GET | `id`: Program ID | - | Get program by ID |
| `/programs` | POST | - | ```json
{
  "name": "string",
  "description": "string",
  "duration": "string"
}
``` | Create new program |
| `/programs/:id` | PUT | `id`: Program ID | Same as POST | Update program |
| `/programs/:id` | DELETE | `id`: Program ID | - | Delete program |

## Query Parameters

Some GET endpoints support additional query parameters:

### Students
- `/students`
  - `level`: Filter by student level
  - `sort`: Sort by field (e.g., `firstName`, `lastName`)
  - `limit`: Number of results to return
  - `page`: Page number for pagination

### Groups
- `/groups`
  - `level`: Filter by group level
  - `sort`: Sort by field (e.g., `name`)
  - `limit`: Number of results to return
  - `page`: Page number for pagination

### Sessions
- `/sessions`
  - `status`: Filter by status
  - `date`: Filter by date
  - `sort`: Sort by field (e.g., `date`, `name`)
  - `limit`: Number of results to return
  - `page`: Page number for pagination

### Programs
- `/programs`
  - `sort`: Sort by field (e.g., `name`, `duration`)
  - `limit`: Number of results to return
  - `page`: Page number for pagination

## Response Format

All endpoints return responses in the following format:

### Success Response
```json
{
  "success": true,
  "data": {
    // Response data here
  }
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error message"
  }
}
```

## HTTP Status Codes

- `200`: Success
- `201`: Created
- `400`: Bad Request
- `404`: Not Found
- `500`: Server Error

## Examples

### Create a Student
```bash
curl -X POST http://localhost:4005/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "birthDate": "2010-01-01",
    "level": "Débutant"
  }'
```

### Get Students with Filtering
```bash
curl "http://localhost:4005/api/students?level=Débutant&sort=firstName&limit=10&page=1"
```

### Mark Session Attendance
```bash
curl -X POST http://localhost:4005/api/sessions/[sessionId]/attendance \
  -H "Content-Type: application/json" \
  -d '{
    "attendance": ["studentId1", "studentId2"]
  }'
```
