import intl from "react-intl-universal";

class Narrator {
    static workerFeelings(worker, widthNumbers = false) {
        // quantum {level: '', value: '', text: ''}
        // level in ['very low', 'lower', 'low', 'normal', 'high', 'higher', 'very high']

        let penalties_names = ["workloadPenalty", "difficultyPenalty", "educationPenalty", "collectivePenalty"];
        let penalties = {};

        const drawNum = (number, level = "normal") => {
            if (widthNumbers) {
                return "(" + number + ")";
            }
            return "";
        };

        const formQuantum = (penalty_name, num) => {
            let quantum = { level: "", value: num, text: "" };

            switch (true) {
                case num === -20:
                    quantum.level = "very low";
                    break;
                case num <= -15:
                    quantum.level = "lower";
                    break;
                case num <= -5:
                    quantum.level = "low";
                    break;
                case num < 5:
                    quantum.level = "normal";
                    break;
                case num < 15:
                    quantum.level = "high";
                    break;
                case num < 20:
                    quantum.level = "higher";
                    break;
                case num === 20:
                    quantum.level = "very high";
                    break;
                default:
                    console.log("error case: " + num);
            }

            return quantum;
        };

        const aboutHappiness = () => {
            let num = worker.calcEfficiency();
            switch (true) {
                case num < 20:
                    return intl.get("narrator.happiness.level0", { worker: worker.name, num: drawNum(num) });
                case num < 30:
                    return intl.get("narrator.happiness.level1", { worker: worker.name, num: drawNum(num) });
                case num < 40:
                    return intl.get("narrator.happiness.level2", { worker: worker.name, num: drawNum(num) });
                case num < 50:
                    return intl.get("narrator.happiness.level3", { worker: worker.name, num: drawNum(num) });
                case num < 60:
                    return intl.get("narrator.happiness.level4", { worker: worker.name, num: drawNum(num) });
                case num < 70:
                    return intl.get("narrator.happiness.level5", { worker: worker.name, num: drawNum(num) });
                case num < 80:
                    return intl.get("narrator.happiness.level6", { worker: worker.name, num: drawNum(num) });
                case num < 90:
                    return intl.get("narrator.happiness.level7", { worker: worker.name, num: drawNum(num) });
                case num < 100:
                    return intl.get("narrator.happiness.level8", { worker: worker.name, num: drawNum(num) });
                case num >= 100:
                    return intl.get("narrator.happiness.level9", { worker: worker.name, num: drawNum(num) });
                default:
                    console.log("error case: " + num);
            }
        };

        const aboutSalary = () => {
            if (worker.is_player) return ". ";

            let num = worker.getSalaryMod();

            switch (true) {
                case num < 0.3:
                    return intl.get("narrator.salary.level0");
                case num < 0.5:
                    return intl.get("narrator.salary.level1");
                case num < 0.7:
                    return intl.get("narrator.salary.level2");
                case num < 0.9:
                    return intl.get("narrator.salary.level3");
                case num < 1.1:
                    return intl.get("narrator.salary.level4");
                case num < 1.5:
                    return intl.get("narrator.salary.level5");
                case num >= 1.5:
                    return intl.get("narrator.salary.level6");
                default:
                    console.log("error case: " + num);
            }
        };

        const tellers = {
            workloadPenalty: penalty => {
                switch (penalty.level) {
                    case "very low":
                        return intl.get("narrator.penalty.workload.level0", { num: drawNum(penalty.value) });
                    case "lower":
                        return intl.get("narrator.penalty.workload.level1", { worker: worker.name, num: drawNum(penalty.value) });
                    case "low":
                        return intl.get("narrator.penalty.workload.level2", { worker: worker.name, num: drawNum(penalty.value) });
                    case "normal":
                        return intl.get("narrator.penalty.workload.level3", { worker: worker.name, num: drawNum(penalty.value) });
                    case "high":
                        return intl.get("narrator.penalty.workload.level4", { worker: worker.name, num: drawNum(penalty.value) });
                    case "higher":
                        return intl.get("narrator.penalty.workload.level5", { worker: worker.name, num: drawNum(penalty.value) });
                    case "very high":
                        return intl.get("narrator.penalty.workload.level6", { worker: worker.name, num: drawNum(penalty.value) });
                    default:
                        console.log("error case: " + penalty.level);
                        return " # Error! # ";
                }
            },
            difficultyPenalty: penalty => {
                switch (penalty.level) {
                    case "very low":
                        return intl.get("narrator.penalty.difficulty.level0", { num: drawNum(penalty.value) });
                    case "lower":
                        return intl.get("narrator.penalty.difficulty.level1", { num: drawNum(penalty.value) });
                    case "low":
                        return intl.get("narrator.penalty.difficulty.level2", { num: drawNum(penalty.value) });
                    case "normal":
                        return intl.get("narrator.penalty.difficulty.level3", { num: drawNum(penalty.value) });
                    case "high":
                        return intl.get("narrator.penalty.difficulty.level4", { num: drawNum(penalty.value) });
                    case "higher":
                        return intl.get("narrator.penalty.difficulty.level5", { num: drawNum(penalty.value) });
                    case "very high":
                        return intl.get("narrator.penalty.difficulty.level6", { num: drawNum(penalty.value) });
                    default:
                        console.log("error case: " + penalty.level);
                        return " # Error! # ";
                }
            },
            educationPenalty: penalty => {
                switch (penalty.level) {
                    case "very low":
                        return intl.get("narrator.penalty.education.level0", { worker: worker.name });
                    case "lower":
                        return intl.get("narrator.penalty.education.level1", { worker: worker.name });
                    case "low":
                        return intl.get("narrator.penalty.education.level2", { worker: worker.name });
                    case "normal":
                        return intl.get("narrator.penalty.education.level3", { worker: worker.name });
                    case "high":
                        return intl.get("narrator.penalty.education.level4", { worker: worker.name });
                    case "higher":
                        return intl.get("narrator.penalty.education.level5", { worker: worker.name });
                    case "very high":
                        return intl.get("narrator.penalty.education.level6", { worker: worker.name });
                    default:
                        console.log("error case: " + penalty.level);
                        return " # Error! # ";
                }
            },
            collectivePenalty: penalty => {
                let realCollectivePenalty = () => {
                    switch (penalty.level) {
                        case "very low":
                            return intl.get("narrator.penalty.team.level0");
                        case "lower":
                            return intl.get("narrator.penalty.team.level1");
                        case "low":
                            return intl.get("narrator.penalty.team.level2");
                        case "normal":
                            return intl.get("narrator.penalty.team.level3");
                        case "high":
                            return intl.get("narrator.penalty.team.level4");
                        case "higher":
                            return intl.get("narrator.penalty.team.level5");
                        case "very high":
                            return intl.get("narrator.penalty.team.level6");
                        default:
                            console.log("error case: " + penalty.level);
                            return " # Error! # ";
                    }
                };
                return realCollectivePenalty();
            }
        };

        const aboutStamina = () => {
            let num = worker.stamina;
            switch (true) {
                case num < 100:
                    return intl.get("narrator.stamina.level0");
                case num < 250:
                    return intl.get("narrator.stamina.level1");
                case num < 500:
                    return intl.get("narrator.stamina.level2");
                case num < 1000:
                    return intl.get("narrator.stamina.level3");
                case num < 1500:
                    return intl.get("narrator.stamina.level4");
                case num < 2000:
                    return intl.get("narrator.stamina.level5");
                case num < 2500:
                    return intl.get("narrator.stamina.level6");
                case num < 3000:
                    return intl.get("narrator.stamina.level7");
                case num < 3500:
                    return intl.get("narrator.stamina.level8");
                case num < 4000:
                    return intl.get("narrator.stamina.level9");
                case num < 5000:
                    return intl.get("narrator.stamina.level10");
                case num >= 5000:
                    return intl.get("narrator.stamina.level11");
                default:
                    console.log("error case: " + num);
            }
        };

        penalties_names.forEach(penalty_name => {
            penalties[penalty_name] = formQuantum(penalty_name, worker[penalty_name]());
        });
        //    console.log(penalties);

        let tale = "";
        tale += aboutHappiness();
        tale += aboutSalary() + " ";

        tale += penalties_names.reduce((string, penalty_name) => {
            return string + " " + tellers[penalty_name](penalties[penalty_name]);
        }, "");

        tale += aboutStamina();

        //  console.log(tale); // BUT! FIX repeatable calls
        return tale;
    }
}

export default Narrator;
