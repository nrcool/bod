import chalk from 'chalk';
import cp from 'child_process';
import consola from 'consola';

const log = (log: string): void => {
  consola.log(log);
};

const info = (info: string): void => {
  consola.info(chalk.blue(info));
};

const success = (success: string): void => {
  consola.success(chalk.green(success));
};

const error = (error: string | Error): void => {
  consola.error(error);
};

const cmd = (cmd: string): void => {
  console.info(`    ${chalk.bgGreen.black('[exec]')}: ${cmd}`);
};

const isFlag = (args: string[], flag: string): boolean =>
  Boolean(args.length) && args.some(arg => arg === flag);

const checkGitStatus = (): void => {
  info('Check git status ...');
  const gitStatus = execPipe('git status --porcelain').toString();

  if (gitStatus.trim() !== '') {
    info('Please commit your changes before running this script!');
    info('Exiting because `git status` is not empty:');
    log('');
    log(gitStatus);
    log('');
    process.exit(1);
  }
};

const exec = (command: string, cwd?: string): Buffer => {
  cmd(command);
  return cp.execSync(command, {
    shell: '/usr/bin/bash',
    stdio: 'inherit',
    cwd: cwd ?? process.cwd(),
  });
};

const execPipe = (command: string, cwd?: string): Buffer => {
  cmd(command);
  return cp.execSync(command, {
    shell: '/usr/bin/bash',
    stdio: 'pipe',
    cwd: cwd ?? process.cwd(),
  });
};

export {
  log,
  info,
  success,
  error,
  cmd,
  isFlag,
  checkGitStatus,
  exec,
  execPipe,
};
