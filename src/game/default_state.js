import _ from "lodash";

var default_state = {
    data: {
        game_speed: 1000,
        game_speed_multiplier: 1,
        game_paused: true,
        stage: "menu",
        epoch: "1",
        current_game_date: new Date(),
        game_unixtime: 1,
        started_tick: 0,
        date: {
            tick: 0,
            hour: 0,
            day: 0,
            week: 0,
            month: 0,
            year: 0,
            is_working_time: false
        },
        priceControls: {
            ipo_market: 0,
            fs: 0,
            lri: 0,
            mrm: 0,
            btc: 0
        },
        activePriceHandlers: [],
        language: "en",
        soundEnable: true,
        content: "Mail",
        context: {},

        money: 0,
        btc: 0,
        current_btc_price: 10000,

        fs: 0,
        lri: 0,
        mrm: 0,
        current_fs_price: 10,
        current_lri_price: 10,
        current_mrm_price: 10,

        taken_loans: [],
        old_loans: [],
        early_payed_loans: 0,

        office_things: {
            coffeemaker: false,
            lunch: false,
            gadget: 0
        },

        candidates: {
            agency: []
        },

        offered_projects: [],
        npc_offered_projects: [],

        rumor: 0,
        meetup: 0,
        reputation: 0,
        demo: 0,

        hiring_agency_state: {},
        sales_agency_state: {},

        workers: [],
        workers_roles: { player: { design: true, manage: true, program: true } },

        projects: [],
        projects_end_reports: [],
        projects_archive_reports: [],
        simplified_reports_max_stats: { design: 0, manage: 0, program: 0 },
        simplified_reports: [],
        projects_known_technologies: ["overtime", "creativity"],
        projects_technologies: [],
        projects_default_technologies: [],
        projects_unlocked_platforms: ["desktop"],
        project_team_selector: null,
        project_team_modal_selector: null,
        top_projects_finished: 0,
        hovered_projects_id: [],
        hovered_workers_id: [],

        wasRecentlyHackathon: false,

        relations: {},

        helpers: {},

        attainments: [],

        achieved: {},

        animation_items: [],

        timelineScale: [],
        timelineEvents: [],

        on_tick_effects: [],
        exchange_statistics: {
            btc: { buffer: 0, values: [], previous_price: [], change: 0, price_history: [], redrawChart: false },
            fs: { buffer: 0, values: [], previous_price: [], change: 0, price_history: [], redrawChart: false },
            lri: { buffer: 0, values: [], previous_price: [], change: 0, price_history: [], redrawChart: false },
            mrm: { buffer: 0, values: [], previous_price: [], change: 0, price_history: [], redrawChart: false }
        },
        exchange_history: {
            btc: [],
            fs: [],
            lri: [],
            mrm: []
        },
        exchange_const: {
            btc: { time_const: 5000, size_const: 0.1 },
            fs: { time_const: 4000, size_const: 0.03 },
            lri: { time_const: 5000, size_const: 0.05 },
            mrm: { time_const: 5200, size_const: 0.055 }
        },
        exchange_market: {
            period: Math.floor(Math.random() * 336),
            timer: 0,
            step: 1
        },
        exchange_history_buffer: [],
        exchange_unlocked_shares: [],
        fs_unlock: false,
        lri_unlock: false,
        mrm_unlock: false,
        company0_done: 0,
        company1_done: 0,
        company2_done: 0,
        btc_unlock: false,
        max_stat: 1,
        max_candidates_stat: 1,
        max_stats_projects_offered: 1,
        mailbox: {},
        currentLocale: "en",
        kothik_avatar: {},
        last_kothik_finished: true,
        training_complete: false
    },

    is_animation_fresh: false
};
export default default_state;

export const getDefaultState = () => {
    let state = _.cloneDeep(default_state);
    _.each(state.data.simplified_reports, report => {
        _.each({ design: report.design, manage: report.manage, program: report.program }, (val, key) => {
            if (state.data.simplified_reports_max_stats[key] < val) state.data.simplified_reports_max_stats[key] = val;
        });
    });
    return state;
};
