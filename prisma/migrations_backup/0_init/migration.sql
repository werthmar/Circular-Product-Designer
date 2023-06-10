-- CreateTable
CREATE TABLE `CBMxED` (
    `CBM_id` INTEGER NOT NULL,
    `ED_id` INTEGER NOT NULL,
    `Priority` INTEGER NULL,

    PRIMARY KEY (`CBM_id`, `ED_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Descriptions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(45) NULL,
    `name` VARCHAR(200) NULL,
    `description` VARCHAR(9999) NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LCPxCBM` (
    `LCP_id` INTEGER NOT NULL,
    `CBM_id` INTEGER NOT NULL,
    `Priority` INTEGER NULL,

    PRIMARY KEY (`LCP_id`, `CBM_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LCPxED` (
    `LCP_id` INTEGER NOT NULL,
    `ED_id` INTEGER NOT NULL,
    `Priority` INTEGER NULL,

    PRIMARY KEY (`LCP_id`, `ED_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

