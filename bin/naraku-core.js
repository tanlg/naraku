#!/usr/bin/env node
'use strict';
const { argv, env } = process;
const { spawnSync } = require('child_process');

// 将传入的命令行参数转换为对象，和并入子进程的 process.env 中
const customizeEnv = process.argv.reduce((args, arg) => {
  const [key, value] = arg.split(/=/);
  return value ? { ...args, [key]: value } : args;
}, {});

console.log(customizeEnv);

switch (argv[2]) {
  case 'start':
  case 'build':
    spawnSync('node', [require.resolve('../scripts/' + argv[2])], {
      stdio: 'inherit',
      env: { ...env, ...customizeEnv }
    });
    break;
  default:
    console.log(`Unknown script ${argv[2]}.`);
}
