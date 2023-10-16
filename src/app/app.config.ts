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
  startDate : new Date(2023, 9, 10,2,30,0),
  endDate   : new Date(2023, 9, 15, 23,30,0)
};
