import {program} from 'commander';

program
  .argument('<secrets>')
  .description('Use to mask secrets in github actions.')
  .action((secrets: string) => {
    const lines = secrets.split('\n');

    lines.map(line => {
      const [, secret] = line.split('=');
      if (!secret) return;
      console.log(`::add-mask::${secret}`);
    });
  });

program.parse();
