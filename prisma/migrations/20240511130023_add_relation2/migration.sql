-- DropForeignKey
ALTER TABLE `useronbooks` DROP FOREIGN KEY `UserOnBooks_bookId_fkey`;

-- DropForeignKey
ALTER TABLE `useronbooks` DROP FOREIGN KEY `UserOnBooks_userId_fkey`;

-- AddForeignKey
ALTER TABLE `Useronbooks` ADD CONSTRAINT `Useronbooks_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Book`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Useronbooks` ADD CONSTRAINT `Useronbooks_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
