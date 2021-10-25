const projectCwd = process.env.PROJECT_CWD as string;
if (!projectCwd) throw new Error('Do not exec script directly.');

export {projectCwd};
