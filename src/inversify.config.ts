import { Container } from 'inversify';
import { TYPES } from './types';

import { TaskBoardComponent } from './components/taskboard-component';

const container = new Container();
container.bind<PomoTimer.ITaskBoard>(TYPES.ITaskBoard).to(TaskBoardComponent);

export { container };
