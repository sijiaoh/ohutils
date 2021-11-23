import execa from 'execa';

export const exec = async (command: string) => {
  const [c, ...a] = command.split(' ');
  if (!c) throw new Error('Failed to exec: ' + command);
  await execa(c, a, {env: process.env, stdio: 'inherit'});
};
