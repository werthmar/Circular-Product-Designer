-- CreateTable
CREATE TABLE `cbmxed` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `CBM_id` INTEGER NOT NULL,
    `ED_id` INTEGER NOT NULL,
    `Priority` INTEGER NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    PRIMARY KEY (`id`, `CBM_id`, `ED_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cdp_definitions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `gestaltungsprinzipien` VARCHAR(400) NULL,
    `definitionen` VARCHAR(9999) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `descriptions` (
    `id` INTEGER NOT NULL,
    `type` TEXT NULL,
    `name` TEXT NULL,
    `description` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `edxcdp` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ed_id` INTEGER NULL,
    `cdp_id` INTEGER NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lcpxcbm` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `LCP_id` INTEGER NULL,
    `CBM_id` INTEGER NULL,
    `Priority` INTEGER NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lcpxed` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `LCP_id` INTEGER NULL,
    `ED_id` INTEGER NULL,
    `Priority` INTEGER NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

