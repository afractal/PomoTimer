// export type NoTask = {
//     kind: 'none'
// };

// export type ValidTask = {
//     kind: 'valid';
//     name: string;
//     estimatedPomodori: number;
//     completedPomodori: number;
// }

// export type Task = ValidTask | NoTask;

export type Task = {
    name: string;
    estimatedPomodori: number;
    completedPomodori: number;
};
