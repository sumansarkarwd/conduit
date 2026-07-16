create table users (
  id serial primary key,
  username text not null unique,
  email text not null unique,
  password_hash text not null,
  bio text,
  image text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table articles (
  id serial primary key,
  user_id integer not null references users(id) on delete cascade,
  slug text not null unique,
  title text not null,
  description text not null,
  body text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table tags (id serial primary key, name text not null unique);
create table article_tags (article_id integer not null references articles(id) on delete cascade, tag_id integer not null references tags(id) on delete cascade, unique(article_id, tag_id));
create table comments (
  id serial primary key,
  article_id integer not null references articles(id) on delete cascade,
  user_id integer not null references users(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table follows (follower_id integer not null references users(id) on delete cascade, followee_id integer not null references users(id) on delete cascade, unique(follower_id, followee_id));
create table favorites (user_id integer not null references users(id) on delete cascade, article_id integer not null references articles(id) on delete cascade, unique(user_id, article_id));
