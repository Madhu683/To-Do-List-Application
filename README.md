
# To-Do List API

This is a simple to-do list API built using Node.js and Express. It provides basic CRUD (Create, Read, Update, Delete) operations for managing to-do items.

## Features

- Add a new to-do
- Get all to-dos
- Get a to-do by its ID
- Update a to-do by its ID
- Delete a to-do by its ID

## Technologies Used

- Node.js
- Express

## Prerequisites

Before running the application, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or above)
- [npm](https://www.npmjs.com/get-npm) (Node Package Manager)

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/your-username/todo-list-api.git
   ```

2. Navigate into the project directory:

   ```bash
   cd todo-list-api
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

## Running the Application

To start the server, run the following command:

```bash
npm start
```

The server will start on port `5000`. You can access the API at `http://localhost:5000`.

## API Endpoints

### 1. Get All To-Dos

- **URL**: `/todos`
- **Method**: `GET`
- **Response**:
  ```json
  [
    {
      "id": 1,
      "title": "Sample Todo",
      "description": "This is a sample to-do",
      "completed": false
    }
  ]
  ```

### 2. Get To-Do by ID

- **URL**: `/todos/:id`
- **Method**: `GET`
- **Response**:
  ```json
  {
    "id": 1,
    "title": "Sample Todo",
    "description": "This is a sample to-do",
    "completed": false
  }
  ```

### 3. Create a New To-Do

- **URL**: `/todos`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "title": "New Todo",
    "description": "Description of the new to-do",
    "completed": false
  }
  ```
- **Response**:
  ```json
  {
    "id": 2,
    "title": "New Todo",
    "description": "Description of the new to-do",
    "completed": false
  }
  ```

### 4. Update an Existing To-Do

- **URL**: `/todos/:id`
- **Method**: `PUT`
- **Request Body**:
  ```json
  {
    "title": "Updated Todo",
    "description": "Updated description",
    "completed": true
  }
  ```
- **Response**:
  ```json
  {
    "id": 1,
    "title": "Updated Todo",
    "description": "Updated description",
    "completed": true
  }
  ```

### 5. Delete a To-Do

- **URL**: `/todos/:id`
- **Method**: `DELETE`
- **Response**:
  ```text
  Todo successfully deleted
  ```

## Testing the API

You can test the API endpoints using tools like [Postman](https://www.postman.com/) or `curl`. Here are some examples of how to test the API using `curl`:

### Create a New To-Do

```bash
curl -X POST http://localhost:5000/todos -H "Content-Type: application/json" -d '{"title": "Buy groceries", "description": "Milk, Bread, Eggs", "completed": false}'
```

### Get All To-Dos

```bash
curl http://localhost:5000/todos
```

### Get a To-Do by ID

```bash
curl http://localhost:5000/todos/1
```

### Update a To-Do by ID

```bash
curl -X PUT http://localhost:5000/todos/1 -H "Content-Type: application/json" -d '{"title": "Updated Title", "description": "Updated Description", "completed": true}'
```

### Delete a To-Do by ID

```bash
curl -X DELETE http://localhost:5000/todos/1
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
