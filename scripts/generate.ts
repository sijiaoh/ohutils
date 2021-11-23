import {program} from 'commander';
import {exec} from './exec';

const generateCommandData = [
  {
    name: 'env',
    description: 'src/generated/clientEnv and src/generated/serverEnv',
    action: async () => {
      await exec('yarn execScript scripts/generateEnv');
    },
  },
  {
    name: 'prisma',
    description: 'prisma generate',
    action: async () => {
      await exec('yarn prisma generate');
    },
  },
  {
    name: 'indexes',
    description: 'yarn ts-index-generator src/**/*.ts',
    action: async () => {
      await exec('yarn ts-index-generator src/**/*.ts');
    },
  },
  {
    name: 'graphql',
    description: 'graphql schema and source codes',
    action: async () => {
      const commands = [
        'yarn execScript scripts/generateGraphqlSchema',
        'yarn graphql-codegen --errors-only --config=lib/default-queries.codegen.json',
        'yarn graphql-codegen --errors-only --config=lib/src.codegen.json',
      ];
      for (let i = 0; i < commands.length; i++) {
        const command = commands[i];
        if (!command) continue;
        await exec(command);
      }
    },
  },
];

program.description('Generate files.');

generateCommandData.forEach(({name, description, action}) => {
  program.command(name).description(description).action(action);
});

program
  .command('all')
  .description('Execute all generate subcommands.')
  .action(async () => {
    for (let i = 0; i < generateCommandData.length; i++) {
      const datum = generateCommandData[i];
      if (!datum) continue;
      await datum.action();
    }
  });

program.parse();
