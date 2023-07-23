# Architecture

<!-- ![3-Tier Client Server Architecture](https://docs.aws.amazon.com/images/whitepapers/latest/serverless-multi-tier-architectures-api-gateway-lambda/images/image2.png "3-Tier Client Server Architecture")
Fig.: 3-Tier Client Server Architecture -->
<figure>
  <img
  src="https://docs.aws.amazon.com/images/whitepapers/latest/serverless-multi-tier-architectures-api-gateway-lambda/images/image2.png"
  alt="3-Tier Client Server Architecture">
  <figcaption>3-Tier Client Server Architecture</figcaption>
</figure>

# Stack

- Frontend: React
- Backend: Django REST
- Database: PostgreSQL

# API Documentation

## Authentication

### `POST` Login

| API Endpoint              | HTTP Method | Response Code |
| ------------------------- | :---------: | :-----------: |
| [budgetbuddy.com/login]() |   `POST`    |      200      |
|                           |             |               |

##### Request Body

```json
{
  "username": "user",
  "password": "pass"
}
```

##### Response Body

```json
{
  "token": "string"
}
```

### `GET` Logout

| API Endpoint               | HTTP Method | Response Code |
| -------------------------- | :---------: | :-----------: |
| [budgetbuddy.com/logout]() |    `GET`    |      200      |
|                            |             |               |

##### Request Body

```json

```

##### Response Body

```json

```

## Accounts

### `POST` Add Account

| API Endpoint             | HTTP Method | Response Code |
| ------------------------ | :---------: | :-----------: |
| [api/user/account/add]() |   `POST`    |      201      |
|                          |             |               |

##### Request Body

```json
{
  "account_name": "cash",
  "account_type": "other banking",
  "bank_name": "",
  "balance": 100,
  "date": "15/10/2020"
}
```

##### Response Body

```json
{
  "status": "success"
}
```

### `PUT` Update Account

| API Endpoint                               | HTTP Method | Response Code |
| ------------------------------------------ | :---------: | :-----------: |
| [api/user/account/update/{account_name}]() |    `PUT`    |      200      |
|                                            |             |               |

##### Request Body

```json
{
  "account_name": "cash",
  "account_type": "other banking",
  "bank_name": "",
  "balance": 100,
  "date": "15/10/2020"
}
```

##### Response Body

```json
{
  "status": "success"
}
```

### `DELETE` Delete Account

| API Endpoint                               | HTTP Method | Response Code |
| ------------------------------------------ | :---------: | :-----------: |
| [api/user/account/delete/{account_name}]() |  `DELETE`   |      200      |
|                                            |             |               |

##### Request Body

```json
{
  "account_name": "cash"
}
```

##### Response Body

```json
{
  "status": "success"
}
```

### `GET` Accounts' Details

| API Endpoint          | HTTP Method | Response Code |
| --------------------- | :---------: | :-----------: |
| [api/user/accounts]() |    `GET`    |      200      |
|                       |             |               |

##### Request Body

```json

```

##### Response Body

```json
{
  "account_categories": [
    {
      "category_name": "cash-check",
      "accounts": [
        {
          "acc_name": "ICCU checking",
          "balance": [
            {
              "type": "saving goals",
              "amount": 100
            },
            {
              "type": "available",
              "amount": 50
            }
          ]
        }
      ]
    }
  ]
}
```

## Spending Plan

### `GET` spending list

| API Endpoint                   | HTTP Method | Response Code |
| ------------------------------ | :---------: | :-----------: |
| [api/user/planned-spending/]() |    `GET`    |      200      |
|                                |             |               |

##### Request Body

```json

```

##### Response Body

```json
{
  "list": [
    {
      "name": "grocery",
      "total_amount": 1000,
      "spent": 500
    }
  ]
}
```

### `POST` spending details

| API Endpoint                         | HTTP Method | Response Code |
| ------------------------------------ | :---------: | :-----------: |
| [api/user/planned-spending/{type}]() |   `POST`    |      200      |
|                                      |             |               |

##### Request Body

```json
{
  "type": "grocery"
}
```

##### Response Body

```json
{
  "left": 1000,
  "history": [
    {
      "account": "walmart",
      "date": "10/10/2023",
      "payee": "abc",
      "amount": 10
    }
  ]
}
```

### `POST` add spending plan

| API Endpoint                      | HTTP Method | Response Code |
| --------------------------------- | :---------: | :-----------: |
| [api/user/planned-spending/add]() |   `POST`    |      200      |
|                                   |             |               |

##### Request Body

```json
{
  "name": "grocery",
  "amount": 1000
}
```

##### Response Body

```json
{
  "status": "success"
}
```

### `PUT` edit spending plan

| API Endpoint                              | HTTP Method | Response Code |
| ----------------------------------------- | :---------: | :-----------: |
| [api/user/planned-spending/edit/{name}]() |    `PUT`    |      200      |
|                                           |             |               |

##### Request Body

```json
{
  "name": "grocery",
  "amount": 1000
}
```

##### Response Body

```json
{
  "status": "success"
}
```

### `PUT` delete spending plan

| API Endpoint                                | HTTP Method | Response Code |
| ------------------------------------------- | :---------: | :-----------: |
| [api/user/planned-spending/delete/{name}]() |    `PUT`    |      200      |
|                                             |             |               |

##### Request Body

```json
{
  "name": "grocery"
}
```

##### Response Body

```json
{
  "status": "success"
}
```

## Transaction

### `POST` Add a transaction

| API Endpoint                 | HTTP Method | Response Code |
| ---------------------------- | :---------: | :-----------: |
| [api/user/transaction/add]() |   `POST`    |      201      |
|                              |             |               |

##### Request Body

```json
{
  "account": "cash",
  "date": "10/10/2022",
  "payee": " ",
  "amount": " ",
  "category": " ",
  "tags": [],
  "description": []
}
```

##### Response Body

```json
{
  "status": "success"
}
```

### `PUT` Edit a transaction

| API Endpoint                        | HTTP Method | Response Code |
| ----------------------------------- | :---------: | :-----------: |
| [api/user/transaction/edit1/{id}]() |    `PUT`    |      200      |
|                                     |             |               |

##### Request Body

```json
{
  "id": "122"
  "account": "cash",
  "date": "10/10/2022",
  "payee": " ",
  "amount": " ",
  "category": " ",
  "tags": [],
  "description": []
}
```

##### Response Body

```json
{
  "status": "success"
}
```

### `PUT` Edit multiple transaction

| API Endpoint                       | HTTP Method | Response Code |
| ---------------------------------- | :---------: | :-----------: |
| [api/user/transaction/edit/{id}]() |    `PUT`    |      200      |
|                                    |             |               |

##### Request Body

```json
{
  "id": [],
  "type": "tags",
  "New name": []
}
```

##### Response Body

```json
{
  "status": "success"
}
```

### `DELETE` Delete a transaction

| API Endpoint                          | HTTP Method | Response Code |
| ------------------------------------- | :---------: | :-----------: |
| [api/user/transaction/delete1/{id}]() |  `DELETE`   |      200      |
|                                       |             |               |

##### Request Body

```json
{
  "id": "122"
}
```

##### Response Body

```json
{
  "status": "success"
}
```

### `DELETE` Delete multiple transaction

| API Endpoint                         | HTTP Method | Response Code |
| ------------------------------------ | :---------: | :-----------: |
| [api/user/transaction/delete/{id}]() |  `DELETE`   |      200      |
|                                      |             |               |

##### Request Body

```json
{
  "id": []
}
```

##### Response Body

```json
{
  "status": "success"
}
```

## Recurring Transactions

### `POST` creating recurrent transactions

| API Endpoint                           | HTTP Method | Response Code |
| -------------------------------------- | :---------: | :-----------: |
| [api/user/recurrent-transaction/add]() |   `POST`    |      201      |
|                                        |             |               |

##### Request Body

```json
{
  "name": "test",
  "recurring amount": 20,
  "next date": "10/10/2023",
  "frequency": "twice a month",
  "end date": "10/10/2024",
  "account": "cash",
  "category": "test",
  "tags": [],
  "type": "bill"
}
```

##### Response Body

```json
{
  "status": "success"
}
```

### `PUT` Editing a reccuring transaction

| API Endpoint                                   | HTTP Method | Response Code |
| ---------------------------------------------- | :---------: | :-----------: |
| [api/user/recurrent-transaction/edit/{name}]() |    `PUT`    |      200      |
|                                                |             |               |

##### Request Body

```json
{
  "name": "test",
  "amount": 100,
  "date": "10/10/2023"
}
```

##### Response Body

```json
{
  "status": "success"
}
```

### `DELETE` Deleting a reccurring transaction

| API Endpoint                                     | HTTP Method | Response Code |
| ------------------------------------------------ | :---------: | :-----------: |
| [api/user/recurrent-transaction/delete/{name}]() |  `DELETE`   |      200      |
|                                                  |             |               |

##### Request Body

```json
{
  "name": "test"
}
```

##### Response Body

```json
{
  "status": "success"
}
```

### `POST` End a recurring series

| API Endpoint                                  | HTTP Method | Response Code |
| --------------------------------------------- | :---------: | :-----------: |
| [api/user/recurrent-transaction/end/{name}]() |   `POST`    |      200      |
|                                               |             |               |

##### Request Body

```json
{
  "name": "test"
}
```

##### Response Body

```json
{
  "status": "success"
}
```

## Watchlist

### `POST` Create a watch list

| API Endpoint                  | HTTP Method | Response Code |
| ----------------------------- | :---------: | :-----------: |
| [api/user/watchlist/create]() |   `POST`    |      201      |
|                               |             |               |

##### Request Body

```json
{
  "type": "by category",
  "name": "Dinning Out",
  "categories": ["resturant", "fast food"],
  "setTarget": "true",
  "amount": 100
}
```

##### Response Body

```json
{
  "status": "success"
}
```

### `PUT` Update watchlist

| API Endpoint                         | HTTP Method | Response Code |
| ------------------------------------ | :---------: | :-----------: |
| [api/user/watchlist/update/{name}]() |    `PUT`    |      200      |
|                                      |             |               |

##### Request Body

```json
{
  "type": "by category",
  "name": "Dinning Out",
  "categories": ["resturant", "fast food"],
  "setTarget": "true",
  "amount": 100
}
```

##### Response Body

```json
{
  "status": "success"
}
```

### `DELETE` Delete a watchlist

| API Endpoint                         | HTTP Method | Response Code |
| ------------------------------------ | :---------: | :-----------: |
| [api/user/watchlist/delete/{name}]() |  `DELETE`   |      200      |
|                                      |             |               |

##### Request Body

```json
{
  "name": "Dinning Out"
}
```

##### Response Body

```json
{
  "status": "success"
}
```

### `GET` Watchlist

| API Endpoint           | HTTP Method | Response Code |
| ---------------------- | :---------: | :-----------: |
| [api/user/watchlist]() |    `GET`    |      200      |
|                        |             |               |

##### Request Body

```json

```

##### Response Body

```json
{
  "watchlist": [
    {
      "name": "extras",
      "spent so far": 42,
      "projected": 87,
      "target": 100
    }
  ]
}
```

### `POST` Watchlist Details

| API Endpoint                  | HTTP Method | Response Code |
| ----------------------------- | :---------: | :-----------: |
| [api/user/watchlist/{name}]() |   `POST`    |      200      |
|                               |             |               |

##### Request Body

```json
{
  "name": "Dinning Out"
}
```

##### Response Body

```json
{
  "name": "Dinning Out",
  "spent so far": 46,
  "projected": 94,
  "target": 100,
  "history": [
    {
      "date": "10/10/2020",
      "payee": "sonic",
      "category": "fast food",
      "tags": [],
      "amount": 200
    }
  ]
}
```

## Goals

### `POST` Creating a goal

| API Endpoint             | HTTP Method | Response Code |
| ------------------------ | :---------: | :-----------: |
| [api/user/goal/create]() |   `POST`    |      201      |
|                          |             |               |

##### Request Body

```json
{
  "name": "Hawaii Vacation",
  "goal amount": 10000,
  "saved so far": 500,
  "account": "ICCU Savings",
  "target date": "10/10/2029",
  "monthly contribution": 200
}
```

##### Response Body

```json
{
  "status": "success"
}
```

### `PUT` Editing a goal

| API Endpoint                  | HTTP Method | Response Code |
| ----------------------------- | :---------: | :-----------: |
| [api/user/goal/edit/{name}]() |   `POST`    |      200      |
|                               |             |               |

##### Request Body

```json
{
  "name": "Hawaii Vacation",
  "goal amount": 10000,
  "saved so far": 500,
  "account": "ICCU Savings",
  "target date": "10/10/2029",
  "monthly contribution": 200
}
```

##### Response Body

```json
{
  "status": "success"
}
```

### `DELETE` Deleting a goal

| API Endpoint                    | HTTP Method | Response Code |
| ------------------------------- | :---------: | :-----------: |
| [api/user/goal/delete/{name}]() |  `DELETE`   |      200      |
|                                 |             |               |

##### Request Body

```json
{
  "name": "Hawaii Vacation"
}
```

##### Response Body

```json
{
  "status": "success"
}
```

## Upcoming

### `GET` Upcoming transactions

| API Endpoint          | HTTP Method | Response Code |
| --------------------- | :---------: | :-----------: |
| [api/user/upcoming]() |    `GET`    |      200      |
|                       |             |               |

##### Request Body

```json

```

##### Response Body

```json
{
  "list": [
    {
      "name": "rent",
      "amount": 2000,
      "date": "23/12/2023"
    }
  ]
}
```

## Report

### `POST` Report

| API Endpoint               | HTTP Method | Response Code |
| -------------------------- | :---------: | :-----------: |
| [api/user/report/{type}]() |   `POST`    |      200      |
|                            |             |               |

##### Request Body

```json
{
  "type": "spending"
}
```

##### Response Body

```json
{
  "list": [
    {
      "date": "10/10/2023",
      "payee": "amazon",
      "category": "extras",
      "amount": 100
    }
  ]
}
```

## Tax Return

### `GET` Tax Return

| API Endpoint      | HTTP Method | Response Code |
| ----------------- | :---------: | :-----------: |
| [api/user/tax/]() |    `GET`    |      200      |
|                   |             |               |

##### Request Body

```json

```

##### Response Body

```json
{
  "personal": {
    "name": "Sumonta Tanvir Pappu",
    "father-name": "Farhan Nandy",
    "mother-name": "Amita Mahmuda",
    "dob": "1999-10-11",
    "mobile": "01978962345",
    "address": "217, West Chankharpul, Dhaka - 1218"
  },
  "ids": {
    "nid": "1310534678",
    "tiin": "1824567891",
    "utin": "890787653464",
    "vat-reg-no": "1234567899876"
  },
  "income-info": {
    "profession": "University Teacher",
    "organisation": "Brac University",
    "designation": "Lecturer",
    "salary": 1000,
    "allowance": 100,
    "bonus": 50
  }
}
```

### `POST` Tax Return Update

| API Endpoint             | HTTP Method | Response Code |
| ------------------------ | :---------: | :-----------: |
| [api/user/tax/update/]() |   `POST`    |      200      |
|                          |             |               |

##### Request Body

```json
{
  "personal": {
    "name": "Farhan Tanvir Pappu",
    "father-name": "Sumonta Nandy",
    "mother-name": "Amita Mahmuda",
    "dob": "1999-10-11",
    "mobile": "01978962345",
    "address": "248, West Nakhalpara, Dhaka - 1215"
  },
  "ids": {
    "nid": "1310534678",
    "tiin": "1824567891",
    "utin": "890787653464",
    "vat-reg-no": "1234567899876"
  },
  "income-info": {
    "profession": "University Teacher",
    "organisation": "Brac University",
    "designation": "Lecturer",
    "salary": 1000,
    "allowance": 100,
    "bonus": 50
  }
}
```

##### Response Body

```json
{
    "personal":
        {
            "name": "Farhan Tanvir Pappu",
            "father-name": "Sumonta Nandy",
            "mother-name": "Amita Mahmuda",
            "dob": "1999-10-11",
            "mobile": "01978962345",
            "address": "248, West Nakhalpara, Dhaka - 1215"
        },
    "ids":
        {
            "nid": "1310534678",
            "tiin": "1824567891",
            "utin": "890787653464",
            "vat-reg-no": "1234567899876"
        },
    "income-info":
        {
            "profession": "University Teacher",
            "organisation": "Brac University",
            "designation": "Lecturer",
            "salary": 1000,
            "allowance": 100,
            "bonus": 50
        } "bonus": 50
}
```
