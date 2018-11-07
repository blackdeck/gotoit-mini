import React, { Component } from "react";
import _ from "lodash";
import intl from "react-intl-universal";
import { IntlProvider } from "react-intl";
import { hot } from "react-hot-loader";
import { game_name } from "./game/app_config";

import { getDefaultState } from "./game/default_state";
var greenworks = require("greenworks");

export var getData = () => {
    return {};
};

class App extends Component {
    constructor(props) {
        super(props);

        this.playGame = this.playGame.bind(this);
        this.pauseGame = this.pauseGame.bind(this);
        this.setGameSpeed = this.setGameSpeed.bind(this);
        this.setGameDate = this.setGameDate.bind(this);
        this.newGame = this.newGame.bind(this);
        this.brutalSet = this.brutalSet.bind(this);
        this.brutalGet = this.brutalGet.bind(this);
        this.checkState = this.checkState.bind(this);
        this.loadGame = this.loadGame.bind(this);
        this.mountLocalStorageItem = this.mountLocalStorageItem.bind(this);
        let app_state = getDefaultState();

        app_state.data.helpers["playGame"] = this.playGame;
        app_state.data.helpers["pauseGame"] = this.pauseGame;
        app_state.data.helpers["setGameSpeed"] = this.setGameSpeed;
        app_state.data.helpers["setGameDate"] = this.setGameDate;
        app_state.data.helpers["newGame"] = this.newGame;
        app_state.data.helpers["loadGame"] = this.loadGame;
        app_state.data.helpers["mountLocalStorageItem"] = this.mountLocalStorageItem;

        app_state.data.helpers["brutalSet"] = this.brutalSet;
        app_state.data.helpers["brutalGet"] = this.brutalGet;
        app_state.data.helpers["checkState"] = this.checkState;

        this.state = app_state;
        getData = () => {
            return this.state.data;
        };
    }

    setStatedebounce = _.throttle(state => {
        let current_save_number = localStorage.getItem(game_name + "_current_save_number");
        this.setState(state, () => {
            localStorage.setItem(game_name + "_save_" + current_save_number, JSON.stringify(state));
        });
    }, 600);

    UNSAFE_componentWillMount() {
        this.mountLocalStorageItem();
    }

    mountLocalStorageItem() {
        let helpers = this.state.data.helpers;
        let current_save = localStorage.getItem(game_name + "_current_save_number");

        let loaded_app_state = JSON.parse(localStorage.getItem(game_name + "_save_" + current_save));
        if (loaded_app_state) {
            _.each(loaded_app_state.data.timelineScale, (time, id) => {
                //2018-06-17T02:29:38.299Z
                loaded_app_state.data.timelineScale[id] = (() => {
                    let date = time ? new Date(time) : new Date();
                    return date;
                })();
            });

            _.each(loaded_app_state.data.timelineEvents, (item, id) => {
                loaded_app_state.data.timelineEvents[id].time = (() => {
                    let { time = "" } = item;
                    let date = time ? new Date(time) : new Date();
                    return date;
                })();
            });

            _.each(loaded_app_state.data.projects, project => {
                loaded_app_state.data.projects_technologies[project.id] = {};
            });

            loaded_app_state.data.helpers = helpers;
            loaded_app_state.data.stage = "game";
            console.log("App " + game_name + " componentDidMount with state", loaded_app_state);
            this.setStatedebounce(loaded_app_state);
        }
    }

    componentDidMount() {
        let locale = this.state.data.language ? this.state.data.language : "en";
        this.setState({ initDone: true });
        if (!this.state.data.game_paused) this.playGame();
        document.addEventListener("contextmenu", function(e) {
            //e.preventDefault();
            e.target.click();
        });

        let openMenu = {};
        openMenu.do = this.openMenu;
        document.addEventListener("keydown", function(e) {
            if (e.key === "Escape") openMenu.do();
        });

        if (greenworks.init()) console.log("Steam API has been initalized.");
    }

    componentWillUnmount() {
        this.pauseGame();
    }

    brutalGet() {
        return this.state;
    }

    brutalSet(state) {
        this.setStatedebounce(state);
    }

    checkState() {
        this.setStatedebounce({ data: this.state.data });
    }

    playGame() {
        clearInterval(this.timerID);
        const data = this.state.data;
        data.game_paused = false;
        this.timerID = setInterval(() => this.tick(true), Math.floor(this.state.data.game_speed / this.state.data.game_speed_multiplier));
        this.setStatedebounce({ data: data });
    }
    pauseGame() {
        const data = this.state.data;
        data.game_paused = true;
        clearInterval(this.timerID);
        this.setStatedebounce({ data: data });
        //this.animation.clear();
    }

    setGameSpeed(speed) {
        const data = this.state.data;
        this.pauseGame();
        data.game_speed_multiplier = speed;
        this.playGame();
        this.setStatedebounce({ data: data });
    }

    setGameDate(date) {
        const data = this.state.data;
        data.current_game_date = date;
        this.setStatedebounce({ data: data });
    }

    loadGame(selected_slot) {
        const data = this.state.data;
        console.log("loaded item", localStorage.getItem(game_name + "_save_" + selected_slot));
        localStorage.setItem(game_name + "_current_save_number", selected_slot);
        data.stage = "menu";
        clearInterval(this.timerID);
        data.game_paused = false;
        this.timerID = setInterval(() => this.tick(true), Math.floor(this.state.data.game_speed / this.state.data.game_speed_multiplier));
        this.setStatedebounce({ data: data });
        this.mountLocalStorageItem();
    }

    newGame() {
        this.pauseGame();
        let current_save_number = localStorage.getItem(game_name + "_current_save_number");
        if (!current_save_number) {
            let helpers = this.state.data.helpers;
            let new_state = getDefaultState();
            new_state.data.office.name = intl.get(new_state.data.office.name);
            new_state.data.helpers = helpers;
            new_state.data.stage = "start";
            this.setStatedebounce(new_state);
        } else {
            localStorage.setItem(game_name + "_save_" + current_save_number, null);
            let helpers = this.state.data.helpers;
            let new_state = getDefaultState();
            new_state.data.helpers = helpers;
            new_state.data.stage = "start";
            this.setStatedebounce(new_state);
        }
    }
    componentDidCatch(error, info) {
        alert("catch!");
        console.log(error);
        console.log(info);
    }
    render() {
        let locale = this.state.data.language ? this.state.data.language : "en";
        return (
            <IntlProvider locale={locale}>
                <div id="app">
                    <span>There is an app we are getting module export error in</span>
                </div>
            </IntlProvider>
        );
    }
}
// webpack Hot Module Replacement API
// if (module.hot) {
//   console.info('hot');
// }
//
// setConfig({ logLevel: "debug" });
export default hot(module)(App);
