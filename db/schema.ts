import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
export const content = sqliteTable('content',{key:text('key').primaryKey(),value:text('value').notNull()});
export const posts = sqliteTable('posts',{slug:text('slug').primaryKey(),data:text('data').notNull()});
export const visits = sqliteTable('visits',{id:text('id').primaryKey(),day:text('day').notNull()});
export const pageviews = sqliteTable('pageviews',{day:text('day').primaryKey(),total:integer('total').notNull().default(0)});
