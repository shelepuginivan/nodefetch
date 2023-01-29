import {readFile} from 'fs/promises'
import path from 'path'

import {execute} from './execute.js'
import {HOSTNAME, USERNAME} from './osinfo.js'
import {BOLD, GREEN, RESET} from './colors.js'
import {LIBUV_VERSION, NODE_VERSION, V8_VERSION} from './consts.js'

export const getTitle = () => `${GREEN}${BOLD}${USERNAME}${RESET}@${GREEN}${BOLD}${HOSTNAME}${RESET}`

export const getBreakLine = () => '-'.repeat((USERNAME + '@' + HOSTNAME).length)

export const getNodeVersion = () => `${GREEN}${BOLD}Node${RESET}: ${NODE_VERSION}`

export const getNpmVersion = async () => {
	try {
		const npmVersion = await execute('npm -v')
		return `${GREEN}${BOLD}NPM ver${RESET}: ${npmVersion.trim()}`
	} catch {
		return `${GREEN}${BOLD}NPM ver${RESET}: npm not installed`
	}
}

export const getNpxVersion = async () => {
	try {
		const npmVersion = await execute('npx -v')
		return `${GREEN}${BOLD}NPX ver${RESET}: ${npmVersion.trim()}`
	} catch {
		return `${GREEN}${BOLD}NPX ver${RESET}: npx not installed`
	}
}

export const getNvmVersion = async () => {
	try {
		const nvmVersion = await execute('nvm -v')
		return `${GREEN}${BOLD}NVM ver${RESET}: ${nvmVersion.trim()}`
	} catch {
		return `${GREEN}${BOLD}NVM ver${RESET}: nvm not installed`
	}
}

export const getYarnVersion = async () => {
	try {
		const yarnVersion = await execute('yarn -v')
		return `${GREEN}${BOLD}Yarn ver${RESET}: ${yarnVersion.trim()}`
	} catch {
		return `${GREEN}${BOLD}Yarn ver${RESET}: yarn not installed`
	}
}

export const getPnpmVersion = async () => {
	try {
		const pnpmVersion = await execute('pnpm -v')
		return `${GREEN}${BOLD}PNPM ver${RESET}: ${pnpmVersion.trim()}`
	} catch {
		return `${GREEN}${BOLD}PNPM ver${RESET}: pnpm not installed`
	}
}

const getNpmPackageAmount = async () => {
	try {
		const npmGlobalList = await execute('npm list -g')
		const packageAmount = npmGlobalList.trim().split('\n').length - 1
		return packageAmount > 0 ? `${packageAmount} (npm)` : ''
	} catch {
		return ''
	}
}

const getYarnPackageAmount = async () => {
	try {
		const yarnGlobalDir = await execute('yarn global dir')
		const yarnPackageJSON = await readFile(path.join(yarnGlobalDir.trim(), 'package.json'))
		const yarnPackages = JSON.parse(yarnPackageJSON.toString('utf-8'))
		const packages = yarnPackages.dependencies
		const packageAmount = Object.keys(packages).length
		return packageAmount > 0 ? `${packageAmount} (yarn)` : ''
	} catch (e) {
		return ''
	}
}

const getPnpmPackageAmount = async () => {
	try {
		const pnpmGlobalPackages = await execute('pnpm list -g --depth 0')
		const packageAmount = pnpmGlobalPackages.trim().split('\n').length - 5
		return packageAmount > 0 ? `${packageAmount} (pnpm)` : ''
	} catch {
		return ''
	}
}

export const getPackages = async () => {
	const npmPackages = await getNpmPackageAmount()
	const yarnPackages = await getYarnPackageAmount()
	const pnpmPackages = await getPnpmPackageAmount()

	const packagesString = (npmPackages + '  ' + yarnPackages + '  ' + pnpmPackages).split('  ').join(', ')
	return `${GREEN}${BOLD}Packages${RESET}: ${packagesString}`
}

export const getTypeScriptVersion = async () => {
	try {
		const tscVersion = await execute('tsc -v')
		const version = tscVersion.trim().split(' ')[1]
		return `${GREEN}${BOLD}TypeScript${RESET}: ${version}`
	} catch {
		return ''
	}
}

export const getV8Version = () => `${GREEN}${BOLD}V8${RESET}: ${V8_VERSION}`

export const getLibuvVersion = () => `${GREEN}${BOLD}Libuv${RESET}: ${LIBUV_VERSION}`
