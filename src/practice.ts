import * as fs from 'fs';
import { password, select, Separator } from '@inquirer/prompts';
import * as bcrypt from 'bcrypt';
import { PWS_FILE, readPws } from '.';

export default async function practice() {
	const pws = readPws();

	if (pws.length == 0) {
		console.log("no passwords created!")
		return;
	}

	while (true) {
		const choice = await select({
			message: 'Pick a password',
			choices: [
				{
					name: 'Random',
					value: '_random',
				},
				{
					name: '(Go back)',
					value: '_back',
				},
				new Separator()
			].concat(pws.map(pw => ({
				name: pw.name,
				value: pw.name
			})))
		});

		var pw;

		if (choice == "_back") break;
		else if (choice == "_random") {
			pw = pws[Math.floor(Math.random() * pws.length)];
		} else {
			pw = pws.filter(pw => pw.name == choice)[0];
		}
		// console.log(pw)

		var candidate = "";

		do {
			if (candidate.length > 0) {
				console.log("Try again")
			}
			candidate = await password({ message: "Enter password for: " + pw.name });
		} while (!testPw(candidate, pw.crypt));
		console.log("Correct!")
	}
}

function testPw(candidate: string, crypt: string): boolean {
	const start = new Date();
	const ret = bcrypt.compareSync(candidate, crypt);
	const end = new Date();
	// console.log(end.getTime() - start.getTime());
	return ret;
}