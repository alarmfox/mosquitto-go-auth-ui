-- CreateTable
CREATE TABLE "client" (
    "id" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "acl" (
    "id" SERIAL NOT NULL,
    "path" TEXT NOT NULL,
    "permission" SMALLINT NOT NULL,
    "clientId" TEXT NOT NULL,

    CONSTRAINT "acl_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "acl" ADD CONSTRAINT "acl_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
