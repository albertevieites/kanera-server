<h1 align="center">Kanera</h1>

**Kanera** is a money budgeting app which helps users to manage their income and expenses, visually showing them how wisely they are doing with their finances.

## Server Side Routes:
**http://localhost:5005/api**

|**METHOD**    |    **URL**           |    **PARAM**     |   **BODY**       |   **DESCRIPTION**  |
|--------------|----------------------|------------------|------------------|--------------------|
|`GET`         |  `/api/expenses`     |      n/a         |      n/a         |  Gets all expenses |
|`POST`        |  `/api/expenses`     |      n/a         | `date, name, category, method, amount` | Create a new expense |
|`GET`         | `/api/expenses/:id`  |      `id`        |      n/a         | Get specific expense |
|`DELETE`      | `/api/expenses/:id`  |      `id`        |      n/a         |  Delete specific expense |
|`PATCH`       | `/api/expenses/:id`  |      `id`        | `date, name, category, method, amount` | Edit and updated specific expense |
|`GET`         |  `/api/income`       |      n/a         |      n/a         |  Gets all income |
|`POST`        |  `/api/income`       |      n/a         | `date, type, amount` | Create a new income |
|`GET`         | `/api/income/:id`    |      `id`        |      n/a         | Get specific income |
|`DELETE`      | `/api/income/:id`    |      `id`        |      n/a         |  Delete specific income |
|`PATCH`       | `/api/income/:id`    |      `id`        | `date, type, amount` | Edit and updated specific income |