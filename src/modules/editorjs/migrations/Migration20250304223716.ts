import { Migration } from '@mikro-orm/migrations';

export class Migration20250304223716 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "editorjs" ("id" text not null, "content" jsonb not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "editorjs_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_editorjs_deleted_at" ON "editorjs" (deleted_at) WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "editorjs" cascade;`);
  }

}
