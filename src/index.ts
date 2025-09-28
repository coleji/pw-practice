import { select } from '@inquirer/prompts';
import * as fs from 'fs';
import store from './store';
import practice from './practice';

const DATA_DIR = "data"
export const PWS_FILE = DATA_DIR + "/pws.txt"

export function readPws() {
	return fs.readFileSync(PWS_FILE, 'utf-8')
			.split("\n")
			.map(line => line.split("\t"))
			.filter(line => line.length == 2)
			.map(line => ({
				name: line[0], 
				crypt: line[1]
			}));
}

async function main() {
	if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);
	if (!fs.existsSync(PWS_FILE)) fs.writeFileSync(PWS_FILE, "");
	
	while (true) {
		const answer = await select({
			message: 'Practice or Store?',
			choices: [
				{
					name: 'practice',
					value: 'practice',
				},
				{
					name: 'store',
					value: 'store',
				},
				{
					name: 'exit',
					value: "exit"
				}
			],
		});

		if (answer == 'store') await store();
		else if (answer == 'practice') await practice();
		else if (answer == 'exit') break;
	}
}

main();