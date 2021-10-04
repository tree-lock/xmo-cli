import pkg from '../utils/pkg.js';
import clone from '../utils/clone.js';
import fs from 'fs-extra';
import path from 'path';

/**
 * @param {"Gitee" | "Github"} git
 */
const initDockerFile = async (git) => {
  await fs.remove('.docker');
  await fs.remove('Dockerfile');
  await clone.xmoClone('template', git, '.docker');
  await fs.move(
    path.join(process.cwd(), '.docker/Dockerfile'),
    path.join(process.cwd(), 'Dockerfile'),
    {
      overwrite: true,
    }
  );
};

const addDockerScript = async () => {
  const pack = await pkg.get();
  const scripts = pack.scripts ?? {};
  scripts['docker:deploy'] = 'sh ./.docker/deploy.sh';
  await pkg.write(pack);
};

export default {
  dockerScript: addDockerScript,
  dockerFile: initDockerFile,
};
