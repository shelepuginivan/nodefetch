#! /usr/bin/env node

import readline from 'readline'

import {
	getBreakLine, getLibuvVersion,
	getNodeVersion,
	getNpmVersion,
	getNpxVersion, getNvmVersion, getPackages,
	getPnpmVersion,
	getTitle, getTypeScriptVersion, getV8Version,
	getYarnVersion
} from './nodeinfo.js'
import {nodeAsciiLogo} from './ascii.js'
import {BG_COLORS, GREEN, RESET} from './colors.js'



const maxAsciiLogoLineLength = Math.max(...nodeAsciiLogo.map(item => item.length)) + 2
const main = async () => {
	console.clear()
	console.log()

	nodeAsciiLogo.forEach(line => console.log(line))

	const stdoutXOffset = maxAsciiLogoLineLength - GREEN.length - RESET.length

	const colorLine = ' '
		.repeat(maxAsciiLogoLineLength - GREEN.length - RESET.length) + BG_COLORS.map(color => color + '   ').join('') + RESET

	readline.cursorTo(process.stdout, stdoutXOffset, 1)
	process.stdout.write(getTitle())

	readline.cursorTo(process.stdout, stdoutXOffset, 2)
	process.stdout.write(getBreakLine())

	readline.cursorTo(process.stdout, stdoutXOffset, 3)
	process.stdout.write(getNodeVersion())

	getNpmVersion().then(v => {
		readline.cursorTo(process.stdout, stdoutXOffset, 4)
		process.stdout.write(v)
		readline.cursorTo(process.stdout, 0, 17)
	})

	getNpxVersion().then(v => {
		readline.cursorTo(process.stdout, stdoutXOffset, 5)
		process.stdout.write(v)
		readline.cursorTo(process.stdout, 0, 18)
	})

	getNvmVersion().then(v => {
		readline.cursorTo(process.stdout, stdoutXOffset, 6)
		process.stdout.write(v)
		readline.cursorTo(process.stdout, 0, 18)
	})

	getYarnVersion().then(v => {
		readline.cursorTo(process.stdout, stdoutXOffset, 7)
		process.stdout.write(v)
		readline.cursorTo(process.stdout, 0, 18)
	})

	getPnpmVersion().then(v => {
		readline.cursorTo(process.stdout, stdoutXOffset, 8)
		process.stdout.write(v)
		readline.cursorTo(process.stdout, 0, 18)
	})

	getPackages().then(packageLine => {
		readline.cursorTo(process.stdout, stdoutXOffset, 9)
		process.stdout.write(packageLine)
		readline.cursorTo(process.stdout, 0, 18)
	})

	getTypeScriptVersion().then(v => {
		readline.cursorTo(process.stdout, stdoutXOffset, 10)
		process.stdout.write(v)
		readline.cursorTo(process.stdout, 0, 18)
	})

	readline.cursorTo(process.stdout, stdoutXOffset, 11)
	process.stdout.write(getV8Version())

	readline.cursorTo(process.stdout, stdoutXOffset, 12)
	process.stdout.write(getLibuvVersion())

	readline.cursorTo(process.stdout, 0, 16)
	process.stdout.write(colorLine)
}

main()
