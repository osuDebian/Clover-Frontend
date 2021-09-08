<template>
<div>
    <section class="leaderboard-section">
        <div class="leaderboard-header">
            <div class="header-image"></div>
            <div class="leaderboard-selectors">
                <ul class="leaderboard-mods-selector">
                    <li>
                        <a :class="select_relax == 'vanilla' ? 'active' : ''" v-on:click="select_relax = 'vanilla'">Vanilla</a>
                    </li>
                    <li>
                        <a :class="select_relax == 'relax' ? 'active' : ''" v-on:click="select_relax = 'relax'">Relax</a>
                    </li>
                </ul>
                <ul class="leaderboard-type-selector">
                    <li>
                        <a :class="select_type == 'performance' ? 'active' : ''" v-on:click="select_type = 'performance'">Performance</a>
                    </li>
                    <li>
                        <a :class="select_type == 'score' ? 'active' : ''"  v-on:click="select_type = 'score'">Score</a>
                    </li>
                </ul>
                <ul class="leaderboard-mode-selector">
                    <li>
                        <a :class="select_mode == 'osu' ? 'active' : ''" v-on:click="select_mode = 'osu'">
                            <i class="faa fa-extra-mode-osu expert"></i> osu!
                        </a>
                    </li>
                    <li>
                        <a :class="select_mode == 'taiko' ? 'active' : ''" v-on:click="select_mode = 'taiko'">
                            <i class="faa fa-extra-mode-taiko expert"></i> Taiko
                        </a>
                    </li>
                    <li>
                        <a :class="select_mode == 'catch' ? 'active' : ''" v-on:click="select_mode = 'catch'">
                            <i class="faa fa-extra-mode-fruits expert"></i> Catch the Beat
                        </a>
                    </li>
                    <li>
                        <a :class="select_mode == 'mania' ? 'active' : ''" v-on:click="select_mode = 'mania'">
                            <i class="faa fa-extra-mode-mania expert"></i> Mania
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </section>
    <section>
        <div class="leaderboard-body">
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th>Accuracy</th>
                        <th>Play Count</th>
                        <th>Performance</th>
                        <th>Score</th>
                        <!-- <th>SS</th>
                        <th>S</th>
                        <th>A</th> -->
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(score, index) in data" v-bind:key="index.id">
                        <td>{{ index + 1 }}</td>
                        <td>
                            <a :href="'https://debian.moe/u/' + score.id">{{ score.username }}</a>
                        </td>
                        <td>{{ score.accuracy.toFixed(2) }}</td>
                        <td>{{ score.playcount }}</td>
                        <td>{{ score.pp }}</td>
                        <td>{{ score.score }}</td>
                        <!-- <td></td>
                        <td></td>
                        <td></td> -->
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</div>
</template>

<script>
export default {
    name: 'Leaderboard',
    props: {
        relax: {
            type: String,
            default: "vanilla"
        },
        type: {
            type: String,
            default: "performance"
        },
        mode: {
            type: String,
            default: "osu"
        },
    },
    metaInfo: {
        // if no subcomponents specify a metaInfo.title, this title will be used
        title: 'Leaderboard',
        // all titles will be injected into this template
        titleTemplate: '[BETA] %s | Debian!'
    },
    data(){
        return {
            tab: 'leaderboard',
            select_relax: this.$route.params.relax,
            select_type: this.$route.params.type,
            select_mode: this.$route.params.mode,
            page: this.$route.query.page,
            load: true,
            data: [],
        }
    },
    watch: {
        select_relax() { this.getAllData(); },
        select_type() { this.getAllData(); },
        select_mode() { this.getAllData(); },
        page() { this.getAllData(); },
    },
    created() {
        this.getAllData();
    },
    methods: {
        checkparams(){
            var vm = this;
            if (vm.page == null) {
                vm.page = 0;
            }
        },
        convertURL(){
            var vm = this
            var result = ""
            result += "/leaderboard/"
            switch (vm.select_relax) {
                case "vanilla":
                    result += "vanilla/"
                    break;
                case "relax":
                    result += "relax/"
                    break;
                default:
                    result += "vanilla/"
                    break;
            }
            switch (vm.select_mode) {
                case "osu":
                    result += "osu/"
                    break;
                case "taiko":
                    result += "taiko/"
                    break;
                case "catch":
                    result += "catch/"
                    break;
                case "mania":
                    result += "mania/"
                    break;
                default:
                    result += "osu/"
                    break;
            }
            switch (vm.select_type) {
                case "performance":
                    result += "performance"
                    break;
                case "score":
                    result += "score"
                    break;
                default:
                    result += "performance"
                    break;
            }
            if (vm.page !== 0) {
                result += "?page=" + (vm.page)
            }
            return result
        },
        convertRelax(){
            var vm = this
            switch (vm.select_relax) {
                case "vanilla":
                    return 0
                case "relax":
                    return 1
                default:
                    return 0
            }
        },
        convertMode(){
            var vm = this
            switch (vm.select_mode) {
                case "osu":
                    return 0
                case "taiko":
                    return 1
                case "catch":
                    return 2
                case "mania":
                    return 3
                default:
                    return 0
            }
        },
        convertType(){
            var vm = this
            switch (vm.select_type) {
                case "performance":
                    return 0
                case "score":
                    return 1
                default:
                    return 0
            }
        },
        async getAllData() {
            var vm = this;
            vm.load = true;
            vm.checkparams();
            var url = vm.convertURL();
            window.history.replaceState('', document.title, url);
            await vm.$axios({
                url: 'https://api.debian.moe/leaderboard',
                method: 'get',
                params: {
                    "m": vm.convertMode(),
                    "r": vm.convertRelax(),
                    "type": vm.convertType(),
                    "p": vm.page + 1
                }
            }) 
            .then(response => {
                vm.data = response.data;
            })
        },
    }
}
</script>

<style>
section.leaderboard-section { background-color: #fff; }
section.leaderboard-section > .leaderboard-header { background-image: linear-gradient(to right, rgba(0, 0, 0, 0.82), rgba(0, 0, 0, 0.6)), url('https://assets.ppy.sh/beatmaps/707032/covers/cover@2x.jpg?1622784772'); background-position: center; background-size: cover; display: flex; position: relative; flex-direction: column; padding: 20px 0;}
.leaderboard-header > .header-image { position: absolute; left: 0; top: 0; }
.leaderboard-header > .leaderboard-selectors { display: flex; flex-direction: column; margin-bottom: 10px; align-items: center; padding: 10px;}
.leaderboard-selectors > ul { list-style: none; display: flex; flex-direction: row; position: relative; flex-wrap: wrap; justify-content: center; }
.leaderboard-selectors > ul:not(:last-child) { margin-bottom: 20px; } 
.leaderboard-selectors > ul > li { cursor: pointer; }
.leaderboard-selectors > ul > li:not(:last-child) { margin-right: 10px; }
.leaderboard-selectors > ul > li > a { opacity: 0.5; color: rgb(255, 255, 255); position: relative; font-size: 14px; padding: 5px 8px; }
.leaderboard-selectors > ul > li > a::after { border-radius: 12px; position: absolute; left: 0; bottom: 0; width: 100%; height: 2px; content: ''; background-color: rgb(93, 214, 174); transition: height 200ms ease-in-out, opacity 200ms ease-in-out; }
.leaderboard-selectors > ul > li > a.active { opacity: 1; font-weight: 500; }
.leaderboard-selectors > ul > li > a.active::after { height: 4px; }

td > a { color: rgb(49, 33, 136); font-weight: bold; }

@media screen and (max-width: 400px) {
    .leaderboard-selectors > ul.leaderboard-mode-selector > li:nth-of-type(2) { margin-bottom: 10px; }
}
</style>