import {index,integer,sqliteTable,text} from 'drizzle-orm/sqlite-core';
export const content = sqliteTable('content',{key:text('key').primaryKey(),value:text('value').notNull()});
export const posts = sqliteTable('posts',{slug:text('slug').primaryKey(),data:text('data').notNull()});
export const visits = sqliteTable('visits',{id:text('id').primaryKey(),day:text('day').notNull()});
export const pageviews = sqliteTable('pageviews',{day:text('day').primaryKey(),total:integer('total').notNull().default(0)});
export const streamAccessCodes=sqliteTable('stream_access_codes',{
 id:text('id').primaryKey(),codeHash:text('code_hash').notNull().unique(),label:text('label').notNull(),suffix:text('suffix').notNull(),createdAt:text('created_at').notNull(),expiresAt:text('expires_at'),revokedAt:text('revoked_at'),lastUsedAt:text('last_used_at'),useCount:integer('use_count').notNull().default(0),
});
export const streamAccessSessions=sqliteTable('stream_access_sessions',{
 id:text('id').primaryKey(),codeId:text('code_id').notNull(),tokenHash:text('token_hash').notNull().unique(),createdAt:text('created_at').notNull(),expiresAt:text('expires_at').notNull(),
});
export const streamAccessAttempts=sqliteTable('stream_access_attempts',{
 key:text('key').primaryKey(),windowStart:integer('window_start').notNull(),attempts:integer('attempts').notNull().default(0),
},table=>[index('stream_access_attempts_window_idx').on(table.windowStart)]);
