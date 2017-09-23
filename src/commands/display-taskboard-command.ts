import { TaskBoardComponent } from '../components/taskboard-component';

export const displayTaskboardCommand = async (taskboadComponent: TaskBoardComponent) => {
    await taskboadComponent.showTaskboard();
};



