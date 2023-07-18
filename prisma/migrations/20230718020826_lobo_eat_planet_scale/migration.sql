-- CreateTable
CREATE TABLE `Cliente` (
    `expediente_cliente` INTEGER NOT NULL,
    `name_cliente` VARCHAR(191) NOT NULL,
    `password_cliente` VARCHAR(191) NULL,
    `status_cliente` BOOLEAN NULL,

    PRIMARY KEY (`expediente_cliente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Provedor` (
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
CREATE TABLE `Producto` (
    `id_product` INTEGER NOT NULL,
    `name_product` VARCHAR(191) NOT NULL,
    `descrip_product` VARCHAR(191) NULL,
    `ingredientes_product` VARCHAR(191) NULL,
    `precio_product` DOUBLE NOT NULL,
    `status_product` BOOLEAN NOT NULL,
    `category_id1` INTEGER NOT NULL,
    `offers_product` INTEGER NULL,

    PRIMARY KEY (`id_product`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ticket` (
    `id_pedido` INTEGER NOT NULL,
    `producto_pedido` VARCHAR(191) NOT NULL,
    `total_precio_predido` DOUBLE NOT NULL,
    `status_pedido` VARCHAR(191) NULL,
    `fecha_pedido` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_pedido`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Compra` (
    `id_compra` INTEGER NOT NULL,
    `expediente_cliente1` INTEGER NOT NULL,
    `id_product2` INTEGER NOT NULL,
    `id_prov2` INTEGER NOT NULL,
    `id_pedido1` INTEGER NOT NULL,

    INDEX `expediente_cliente1`(`expediente_cliente1`),
    INDEX `id_product2`(`id_product2`),
    INDEX `id_prov2`(`id_prov2`),
    INDEX `id_pedido1`(`id_pedido1`),
    PRIMARY KEY (`id_compra`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
