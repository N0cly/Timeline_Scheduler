import { SchedulerProConfig, ProjectModelConfig } from '@bryntum/schedulerpro';

export const projectConfig: Partial<ProjectModelConfig> = {
  // Empty project config
};

export const schedulerProConfig: Partial<SchedulerProConfig> = {
  columns : [
    {
      text : 'Name',
      field : 'name',
      width : 160
    }
  ],
  startDate : new Date(2022, 4, 4,0,0,1),
  endDate   : new Date(2022, 5, 17, 23,59,59)
};
