import {exec} from 'child_process'

export const execute = command => new Promise((resolve, reject) => {
	exec(command, (error, stdout, stderr) => {
		if (error) {
			reject(stderr)
		}
		resolve(stdout)
	})
})
