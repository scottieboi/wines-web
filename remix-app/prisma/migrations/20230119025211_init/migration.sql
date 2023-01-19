-- CreateTable
CREATE TABLE "box" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "size" TEXT,
    "description" TEXT,
    "userid" TEXT NOT NULL,

    CONSTRAINT "PK_box" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "location" (
    "id" TEXT NOT NULL,
    "number" INTEGER,
    "cellarversion" SMALLINT,
    "boxid" TEXT NOT NULL,
    "wineid" TEXT NOT NULL,

    CONSTRAINT "PK_location" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "region" (
    "id" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "userid" TEXT,

    CONSTRAINT "PK_region" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vineyard" (
    "id" TEXT NOT NULL,
    "vineyard" TEXT NOT NULL,
    "userid" TEXT,

    CONSTRAINT "PK_vineyard" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "winelist" (
    "id" TEXT NOT NULL,
    "vintage" SMALLINT,
    "winename" TEXT,
    "percentalcohol" REAL,
    "pricepaid" DECIMAL(7,2),
    "yearbought" SMALLINT,
    "bottlesize" SMALLINT,
    "notes" TEXT,
    "rating" SMALLINT,
    "drinkrangefrom" SMALLINT,
    "drinkrangeto" SMALLINT,
    "regionid" TEXT,
    "vineyardid" TEXT,
    "winetypeid" TEXT,
    "userid" TEXT NOT NULL,

    CONSTRAINT "PK_winelist" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "winetype" (
    "id" TEXT NOT NULL,
    "winetype" TEXT NOT NULL,
    "userid" TEXT,

    CONSTRAINT "PK_winetype" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "username" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,

    CONSTRAINT "PK_user" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "box_userid_fk" ON "box"("userid");

-- CreateIndex
CREATE INDEX "location_boxid_fk" ON "location"("boxid");

-- CreateIndex
CREATE INDEX "location_wineid_fk" ON "location"("wineid");

-- CreateIndex
CREATE UNIQUE INDEX "region_region_key" ON "region"("region");

-- CreateIndex
CREATE INDEX "region_userid_fk" ON "region"("userid");

-- CreateIndex
CREATE UNIQUE INDEX "vineyard_vineyard_key" ON "vineyard"("vineyard");

-- CreateIndex
CREATE INDEX "vineyard_userid_fk" ON "vineyard"("userid");

-- CreateIndex
CREATE INDEX "winelist_regionid_fk" ON "winelist"("regionid");

-- CreateIndex
CREATE INDEX "winelist_vineyardid_fk" ON "winelist"("vineyardid");

-- CreateIndex
CREATE INDEX "winelist_winetypeid_fk" ON "winelist"("winetypeid");

-- CreateIndex
CREATE INDEX "winelist_userid_fk" ON "winelist"("userid");

-- CreateIndex
CREATE UNIQUE INDEX "winetype_winetype_key" ON "winetype"("winetype");

-- CreateIndex
CREATE INDEX "winetype_userid_fk" ON "winetype"("userid");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- AddForeignKey
ALTER TABLE "box" ADD CONSTRAINT "box_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "location" ADD CONSTRAINT "location_boxid_fkey" FOREIGN KEY ("boxid") REFERENCES "box"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "location" ADD CONSTRAINT "location_wineid_fkey" FOREIGN KEY ("wineid") REFERENCES "winelist"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "region" ADD CONSTRAINT "region_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "vineyard" ADD CONSTRAINT "vineyard_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "winelist" ADD CONSTRAINT "winelist_regionid_fkey" FOREIGN KEY ("regionid") REFERENCES "region"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "winelist" ADD CONSTRAINT "winelist_vineyardid_fkey" FOREIGN KEY ("vineyardid") REFERENCES "vineyard"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "winelist" ADD CONSTRAINT "winelist_winetypeid_fkey" FOREIGN KEY ("winetypeid") REFERENCES "winetype"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "winelist" ADD CONSTRAINT "winelist_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "winetype" ADD CONSTRAINT "winetype_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;
