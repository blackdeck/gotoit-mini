import _ from "lodash";

import { achievements } from "./knowledge/achievements";

export function tick(state) {
    _.each(achievements, (achievement, key) => {
        if (state.data.achieved[key] === true) return;
        if (achievement.rule(state)) {
            state.data.achieved[key] = true;
            state.data.helpers.addAction(
                `${achievement.name} ${achievement.rank} achievement unlocked!`,
                { timeOut: 3000, extendedTimeOut: 2000 },
                "success"
            );
        }
    });

    return state;
}
