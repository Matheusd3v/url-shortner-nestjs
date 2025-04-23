-- CreateTable
CREATE TABLE "urls" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "url" VARCHAR(1000) NOT NULL,
    "code" VARCHAR(6) NOT NULL,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "urls_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "urls_uuid_key" ON "urls"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "urls_code_key" ON "urls"("code");
