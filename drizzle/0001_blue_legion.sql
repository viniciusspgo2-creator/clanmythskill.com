CREATE TABLE `stream_access_attempts` (
	`key` text PRIMARY KEY NOT NULL,
	`window_start` integer NOT NULL,
	`attempts` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `stream_access_codes` (
	`id` text PRIMARY KEY NOT NULL,
	`code_hash` text NOT NULL,
	`label` text NOT NULL,
	`suffix` text NOT NULL,
	`created_at` text NOT NULL,
	`expires_at` text,
	`revoked_at` text,
	`last_used_at` text,
	`use_count` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `stream_access_codes_code_hash_unique` ON `stream_access_codes` (`code_hash`);--> statement-breakpoint
CREATE TABLE `stream_access_sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`code_id` text NOT NULL,
	`token_hash` text NOT NULL,
	`created_at` text NOT NULL,
	`expires_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `stream_access_sessions_token_hash_unique` ON `stream_access_sessions` (`token_hash`);