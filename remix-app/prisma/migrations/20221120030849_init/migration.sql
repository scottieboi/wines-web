-- CreateTable
CREATE TABLE "box" (
    "boxno" INTEGER NOT NULL,
    "cuid" TEXT NOT NULL,
    "size" TEXT,

    CONSTRAINT "box_pkey" PRIMARY KEY ("boxno")
);

-- CreateTable
CREATE TABLE "location" (
    "id" SERIAL NOT NULL,
    "cuid" TEXT NOT NULL,
    "wineid" INTEGER,
    "no" INTEGER,
    "box" INTEGER,
    "cellarversion" SMALLINT,

    CONSTRAINT "PK_location" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "region" (
    "id" SERIAL NOT NULL,
    "cuid" TEXT NOT NULL,
    "region" TEXT,

    CONSTRAINT "PK_region" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vineyard" (
    "id" SERIAL NOT NULL,
    "cuid" TEXT NOT NULL,
    "vineyard" TEXT,

    CONSTRAINT "PK_vineyard" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "winelist" (
    "id" SERIAL NOT NULL,
    "cuid" TEXT NOT NULL,
    "vintage" SMALLINT,
    "winename" TEXT,
    "winetypeid" INTEGER,
    "percentalcohol" REAL,
    "pricepaid" DECIMAL(7,2),
    "yearbought" SMALLINT,
    "bottlesize" SMALLINT,
    "notes" TEXT,
    "rating" SMALLINT,
    "drinkrangefrom" SMALLINT,
    "drinkrangeto" SMALLINT,
    "regionid" INTEGER,
    "vineyardid" INTEGER,

    CONSTRAINT "PK_winelist" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "winetype" (
    "id" SERIAL NOT NULL,
    "cuid" TEXT NOT NULL,
    "winetype" TEXT,

    CONSTRAINT "PK_winetype" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "location_box_fk" ON "location"("box");

-- CreateIndex
CREATE INDEX "location_wineid_fk" ON "location"("wineid");

-- CreateIndex
CREATE INDEX "winelist_regionid_fk" ON "winelist"("regionid");

-- CreateIndex
CREATE INDEX "winelist_vineyardid_fk" ON "winelist"("vineyardid");

-- CreateIndex
CREATE INDEX "winelist_winetypeid_fk" ON "winelist"("winetypeid");

-- AddForeignKey
ALTER TABLE "location" ADD CONSTRAINT "location_box_fkey" FOREIGN KEY ("box") REFERENCES "box"("boxno") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "location" ADD CONSTRAINT "location_wineid_fkey" FOREIGN KEY ("wineid") REFERENCES "winelist"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "winelist" ADD CONSTRAINT "winelist_regionid_fkey" FOREIGN KEY ("regionid") REFERENCES "region"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "winelist" ADD CONSTRAINT "winelist_vineyardid_fkey" FOREIGN KEY ("vineyardid") REFERENCES "vineyard"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "winelist" ADD CONSTRAINT "winelist_winetypeid_fkey" FOREIGN KEY ("winetypeid") REFERENCES "winetype"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;
