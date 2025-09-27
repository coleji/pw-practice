import { input, password } from '@inquirer/prompts';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs'
import { PWS_FILE, readPws } from '.';

const WORK_FACTOR = 14;

export default async function store() {
	const pws = readPws();
	var name: string, pw1: string, pw2: string;

	while (true) {
		name = await input({ message: 'Enter pw name' });

		if (pws.filter(pw => pw.name == name).length > 0) {
			console.log("name already in use");
			continue;
		}
		
		if (name.startsWith("_") || name.indexOf("\t") > -1 || name.indexOf("\n") > -1) {
			console.log("name is invalid");
			continue;
		}

		break;
	}

	while (true) {
		pw1 = await password({ message: "Enter password" });
		pw2 = await password({ message: "Enter password again" });

		if (pw1 != pw2) {
			console.log("pws dont match");
			continue;
		}
		
		break;
	}

	const start = new Date();
	fs.appendFileSync(PWS_FILE, `${name}\t${bcrypt.hashSync(pw1, WORK_FACTOR)}\n`);
	const end = new Date();
	// console.log(end.getTime() - start.getTime());\
}