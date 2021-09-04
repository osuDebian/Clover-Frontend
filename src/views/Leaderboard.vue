<template>
<div>
    <section>
        <div class="leaderboard-header">
            <div class="header-image"></div>
            <div>
                <ul class="leaderboard-mods-selector">
                    <li>
                        <a v-on:click="select_relax = 'vanilla'">Vanilla</a>
                    </li>
                    <li>
                        <a v-on:click="select_relax = 'relax'">Relax</a>
                    </li>
                </ul>
                <ul class="leaderboard-type-selector">
                    <li>
                        <a v-on:click="select_type = 'performance'">Performance</a>
                    </li>
                    <li>
                        <a v-on:click="select_type = 'score'">Score</a>
                    </li>
                </ul>
            </div>
            <ul class="leaderboard-mode-selector">
                <li>
                    <a v-on:click="select_mode = 'osu'">osu!</a>
                </li>
                <li>
                    <a v-on:click="select_mode = 'taiko'">Taiko</a>
                </li>
                <li>
                    <a v-on:click="select_mode = 'catch'">Catch the Beat</a>
                </li>
                <li>
                    <a v-on:click="select_mode = 'mania'">Mania</a>
                </li>
            </ul>
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
                        <td>{{ score.username }}</td>
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

</style>