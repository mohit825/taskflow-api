create type acc_status as enum("PENDING", "ACTIVE", "BLOCKED")

create table users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(250) NOT NULL,
    username check(length(name) > 2 ) VARCHAR(50) NOT NULL ,
    acc_status acc_status DEFAULT 'PENDING'
    created_at timestamptz default now()
    updated_at timestamptz default now()
    deleted_at timestamptz default now()
) 