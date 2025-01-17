import { Migration } from '@mikro-orm/migrations';

export class Migration20250115090132 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table if not exists "my-custom" ("id" text not null, "name" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "my-custom_pkey" primary key ("id"));');
    this.addSql('CREATE INDEX IF NOT EXISTS "IDX_my-custom_deleted_at" ON "my-custom" (deleted_at) WHERE deleted_at IS NULL;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "my-custom" cascade;');
  }

}
