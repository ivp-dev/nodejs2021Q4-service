import { CamelCaseNamingConvention, createMapper } from '@automapper/core';
import { classes } from '@automapper/classes';
import { taskToDtoProfile } from './task-to-dto.profile';

export const mapper = createMapper({
  name: 'automapper',
  pluginInitializer: classes,
  namingConventions: {
    source: new CamelCaseNamingConvention(),
    destination: new CamelCaseNamingConvention(),
  },
});

mapper.addProfile(taskToDtoProfile);
