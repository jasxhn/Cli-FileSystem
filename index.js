import * as readline from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import fs from 'node:fs/promises';
import path from 'node:path';
import chalk from 'chalk';

const rl = readline.createInterface({
    input: stdin,
    output: stdout,
});

const baseDir = process.cwd();

async function menu() {
    while (true) {
        console.log(chalk.blue.bold(`\n📁 File System Manager\n`));

        const options = [
            'Create Folder',
            'Create File',
            'Write in File',
            'Delete File',
            'Delete Folder',
            'List Items',
            'Exit',
        ];

        options.forEach((opt, i) =>
            console.log(chalk.yellow(`${i + 1}. `) + chalk.white(opt))
        );

        const choice = await rl.question('\nSelect option: ');

        try {
            switch (choice.trim()) {
                case '1':
                    await createFolder();
                    break;
                case '2':
                    await createFile();
                    break;
                case '3':
                    await writeFileContent();
                    break;
                case '4':
                    await deleteFile();
                    break;
                case '5':
                    await deleteFolder();
                    break;
                case '6':
                    await listItems();
                    break;
                case '7':
                    console.log(chalk.green('Exiting...'));
                    rl.close();
                    return;
                default:
                    console.log(chalk.red('Invalid option'));
            }
        } catch (err) {
            console.log(chalk.red(`Error: ${err.message}`));
        }
    }
}

async function createFolder() {
    const name = await rl.question('Enter folder name: ');
    const dirPath = path.join(baseDir, name);

    await fs.mkdir(dirPath, { recursive: true });
    console.log(chalk.green('Folder created'));
}

async function createFile() {
    const name = await rl.question('Enter file name: ');
    const filePath = path.join(baseDir, name);

    await fs.writeFile(filePath, '');
    console.log(chalk.green('File created'));
}

async function writeFileContent() {
    const name = await rl.question('Enter file name: ');
    const content = await rl.question('Enter content: ');
    const filePath = path.join(baseDir, name);

    await fs.writeFile(filePath, content);
    console.log(chalk.green('Content written to file'));
}

async function deleteFile() {
    const name = await rl.question('Enter file name: ');
    const filePath = path.join(baseDir, name);

    await fs.unlink(filePath);
    console.log(chalk.green('File deleted'));
}

async function deleteFolder() {
    const name = await rl.question('Enter folder name: ');
    const dirPath = path.join(baseDir, name);

    await fs.rm(dirPath, { recursive: true, force: true });
    console.log(chalk.green('Folder deleted'));
}

async function listItems() {
    const items = await fs.readdir(baseDir);

    console.log(chalk.cyan('\nItems in current directory:\n'));
    items.forEach(item => console.log(' - ' + item));
}

menu();