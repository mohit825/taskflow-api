# Notes

### Ticket 001

- Used `Pool` instead of `client` in pg, because pool can be used for multiple connections.

### Ticket 002

- UUID is recommened appraoch for storing as ids because it will give us uniquness among the ids.
- SERIAL and BIGSERIAL is not exactly a data type but used for incrementing a sequence in data. It's older now and modern way is to use IDENTITY.

-IDENTITY deos the same thing as serial but a modern and cleaner way which prevent manual id insertion.

- CONSTRAINTS are the rule enforced to the table, which can have PRIMARY KEY which tells us the uniquness among the data and which will be non-nullable, and similarly FOREIGN KEY is something which tells us the column which is PRIMARY KEY to other table and used to make relation in table.

- TIMESTAMPTZ converts the time to UTC and when queried back it converts to time as per database, this also factors day-light savings as well.

### Ticket 003

- Will create Controller, Service and route for user.

- The request will start from app.js --> then go to specific routes --> then express router will guide it through --> specific controller

- If we have to pass parameters to our queries, it will be good to use parameterized query since it avoid sql injection vulnerabilities.

- `Returning *` in pg will return the current added row in the query (for INSERT), but can be used with SELeCT, UPDATE, DELETE instread of `*` we can add specfic column too

### Ticket 004 Validation

- Added `zod` as Input validation library.

- Used middleware for validating inputs.
