# Budget-Buddy
A helpful buddy that will make user stay updated and focused on his finances!

## Database Configuration

1. In Windows Terminal, start the PostgreSQL server. First, find the PostgreSQL database directory path, e.g.: `C:\Program Files\PostgreSQL\15\data`. Then open the terminal and execute this command:
```powershell
pg_ctl -D "<path>" start
```
***Note: <> are not to be used while writing command, they are used just to signify the variables***
* To stop the server
```powershell
pg_ctl -D "<path>" stop
```
* To restart the server
```powershell
pg_ctl -D "<path>" restart
```

2. Activate the postgreSQL shell, e.g.: `psql -U postgres`
```powershell
psql -U <username>
```
***Enter your password when prompted.***

3. Create new database, e.g.:  `CREATE DATABASE budgetbuddy;`
```powershell
CREATE DATABASE <dbname>;
```

4. Create a database user, e.g.: ` CREATE USER bbadmin WITH PASSWORD 'bbadmin';` 
```powershell
 CREATE USER <username> WITH PASSWORD '<password>';
```
Then grant privileges to it, e.g.: `GRANT ALL ON DATABASE budgetbuddy TO bbadmin;`
```powershell
GRANT ALL ON DATABASE <dbname> TO <username>;
```

5. Exit the shell
```powershell
\q
```

6. Connect to the New Database, e.g.: `psql -U bbadmin -h localhost -d budgetbuddy`
```powershell
psql -U <username> -h localhost -d <dbname>
```
***Enter your password when prompted.*** \
***Note: unable to connect to server for Postgres =>***
***win key+R > services.msc > postgresql-x64 > start***

7. Check the connection:
```powershell
\conninfo
```

## Acknowledgement
- [How to build a CRUD API using Python Flask and SQLAlchemy ORM with PostgreSQL](https://medium.com/@yahiaqous/how-to-build-a-crud-api-using-python-flask-and-sqlalchemy-orm-with-postgresql-7869517f8930)