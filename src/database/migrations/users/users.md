# User table

- `id` column will be UUID for better id geenration which can't be tracked incremently, would be unique and will be treated as primary key

- `email` column will support character count upto 50 chars and will be unique and not nullable.

- `password_hash` will store hased password with have max of 250 chars and not nullable can be duplicated among users.

- `display_name` will be not nullable but will have min for 3 chars and max will be 50.

- `status` will be an enum with default as 'PENDING'

- `created_at` , `updated_at` and `deleted_at` will be a timestamp, these are inserted by system directly.

- A UUID column can accept a UUID value directly. `gen_random_uuid()` is used as the database default so PostgreSQL generates the UUID automatically when the application doesn't provide one..
