create type acc_status as enum('PENDING', 'ACTIVE', 'BLOCKED');

create table users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid () NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  display_name VARCHAR(50) check (length(display_name) > 2) NOT NULL,
  acc_status acc_status DEFAULT 'PENDING',
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  deleted_at timestamptz NULL
) 