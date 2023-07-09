-- CreateTable
CREATE TABLE `cliente` (
    `expediente_cliente` INTEGER NOT NULL,
    `name_cliente` VARCHAR(191) NOT NULL,
    `password_cliente` VARCHAR(191) NULL,
    `status_cliente` BOOLEAN NULL,

    PRIMARY KEY (`expediente_cliente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `provedor` (
    `id_prov` INTEGER NOT NULL,
    `name_prov` VARCHAR(191) NOT NULL,
    `stand_prov` VARCHAR(191) NULL,
    `status_prov` BOOLEAN NULL,
    `tel_prov` VARCHAR(191) NULL,
    `email_prov` VARCHAR(191) NULL,

    PRIMARY KEY (`id_prov`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categoria` (
    `category_id` INTEGER NOT NULL,
    `name_category` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `producto` (
    `id_product` INTEGER NOT NULL,
    `name_product` VARCHAR(191) NOT NULL,
    `descrip_product` VARCHAR(191) NULL,
    `ingredientes_product` VARCHAR(191) NULL,
    `precio_product` DOUBLE NOT NULL,
    `status_product` BOOLEAN NOT NULL,
    `category_id1` INTEGER NOT NULL,
    `offers_product` DECIMAL(65, 30) NULL,
    `id_prov1` INTEGER NOT NULL,

    PRIMARY KEY (`id_product`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ticket` (
    `id_pedido` INTEGER NOT NULL,
    `producto_pedido` VARCHAR(191) NOT NULL,
    `total_precio_predido` DOUBLE NOT NULL,
    `status_pedido` VARCHAR(191) NULL,
    `fecha_pedido` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_pedido`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `compra` (
    `id_compra` INTEGER NOT NULL,
    `expediente_cliente1` INTEGER NOT NULL,
    `id_product2` INTEGER NOT NULL,
    `id_prov2` INTEGER NOT NULL,
    `id_pedido1` INTEGER NOT NULL,

    UNIQUE INDEX `compra_id_compra_key`(`id_compra`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `producto` ADD CONSTRAINT `producto_category_id1_fkey` FOREIGN KEY (`category_id1`) REFERENCES `Categoria`(`category_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `producto` ADD CONSTRAINT `producto_id_prov1_fkey` FOREIGN KEY (`id_prov1`) REFERENCES `provedor`(`id_prov`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `compra` ADD CONSTRAINT `compra_expediente_cliente1_fkey` FOREIGN KEY (`expediente_cliente1`) REFERENCES `cliente`(`expediente_cliente`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `compra` ADD CONSTRAINT `compra_id_product2_fkey` FOREIGN KEY (`id_product2`) REFERENCES `producto`(`id_product`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `compra` ADD CONSTRAINT `compra_id_prov2_fkey` FOREIGN KEY (`id_prov2`) REFERENCES `provedor`(`id_prov`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `compra` ADD CONSTRAINT `compra_id_pedido1_fkey` FOREIGN KEY (`id_pedido1`) REFERENCES `ticket`(`id_pedido`) ON DELETE RESTRICT ON UPDATE CASCADE;
