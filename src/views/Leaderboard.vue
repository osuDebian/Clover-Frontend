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
                        <a :class="select_mode == 'mania' ? 'active' : ''" v-on:click="setMania()">
                            <i class="faa fa-extra-mode-mania expert"></i> Mania
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </section>
    <section class="leaderboard--body">
        <div class="leaderboard-body">
            <table>
                <thead>
                    <tr>
                        <th class="index"></th>
                        <th class="username"></th>
                        <th class="acc">Accuracy</th>
                        <th>Play Count</th>
                        <th :class="select_type == 'performance' ? 'force' : '' + ' performance'">Performance</th>
                        <th :class="select_type == 'score' ? 'force' : '' + ' score'">Score</th>
                        <!-- <th>SS</th>
                        <th>S</th>
                        <th>A</th> -->
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(score, index) in data" v-bind:key="index.id">
                        <td class="index">{{ index + 1 }}</td>
                        <td class="username">
                            <div>
                                <el-tooltip placement="top" effect="dark">
                                    <div slot="content">
                                        {{ convertFlags(score.country) }}
                                    </div>
                                    <span class="flags" :style="'background-image: url(' + '/img/flags/' + (score.country != 'XX' ? score.country : '__') + '.png)'"></span>
                                </el-tooltip>
                                <a :href="'https://debian.moe/u/' + score.id">{{ score.username }}</a>
                            </div>
                        </td>
                        <td>{{ score.accuracy.toFixed(2) }}%</td>
                        <td>{{ addCommas(score.playcount) }}</td>
                        <td :class="select_type == 'performance' ? 'force' : ''">{{ addCommas(score.pp) }}</td>
                        <td :class="select_type == 'score' ? 'force' : ''">{{ addCommas(score.score) }}</td>
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
        select_relax() { this.checkMania() },
        select_type() { this.checkMania() },
        select_mode() { this.checkMania() },
        page() { this.checkMania() },
    },
    created() {
        this.checkMania()
    },
    methods: {
        checkMania(){
            var vm = this
            if (vm.select_relax === 'relax' && vm.select_mode === 'mania') {
                vm.select_mode = 'mania'
                vm.select_relax = 'vanilla'
                return this.getAllData()
            }
            return this.getAllData()
        },
        convertFlags(flag){
            switch (flag.toUpperCase()) {
                case("XX"):
                    return "Unknown"
                case("AP"):
                    return "Oceania"
                case("EU"):
                    return "Europe"
                case("AD"):
                    return "Andorra"
                case("AE"):
                    return "UAE - United Arab Emirates"
                case("AF"):
                    return "Afghanistan"
                case("AG"):
                    return "Antigua"
                case("AI"):
                    return "Anguilla"
                case("AL"):
                    return "Albania"
                case("AM"):
                    return "Armenia"
                case("AN"):
                    return "Netherlands Antilles"
                case("AO"):
                    return "Angola"
                case("AQ"):
                    return "Antarctica"
                case("AR"):
                    return "Argentina"
                case("AS"):
                    return "American Samoa"
                case("AT"):
                    return "Austria"
                case("AU"):
                    return "Australia"
                case("AW"):
                    return "Aruba"
                case("AZ"):
                    return "Azerbaijan"
                case("BA"):
                    return "Bosnia"
                case("BB"):
                    return "Barbados"
                case("BD"):
                    return "Bangladesh"
                case("BE"):
                    return "Belgium"
                case("BF"):
                    return "Burkina Faso"
                case("BG"):
                    return "Bulgaria"
                case("BH"):
                    return "Bahrain"
                case("BI"):
                    return "Burundi"
                case("BJ"):
                    return "Benin"
                case("BM"):
                    return "Bermuda"
                case("BN"):
                    return "Brunei Darussalam"
                case("BO"):
                    return "Bolivia"
                case("BR"):
                    return "Brazil"
                case("BS"):
                    return "Bahamas"
                case("BT"):
                    return "Bhutan"
                case("BV"):
                    return "Bouvet Island"
                case("BW"):
                    return "Botswana"
                case("BY"):
                    return "Belarus"
                case("BZ"):
                    return "Belize"
                case("CA"):
                    return "Canada"
                case("CC"):
                    return "Cocos Islands"
                case("CD"):
                    return "Congo"
                case("CF"):
                    return "Central African Republic"
                case("CG"):
                    return "Congo, Democratic Republic of"
                case("CH"):
                    return "Switzerland"
                case("CI"):
                    return "Cote D'Ivoire"
                case("CK"):
                    return "Cook Islands"
                case("CL"):
                    return "Chile"
                case("CM"):
                    return "Cameroon"
                case("CN"):
                    return "China"
                case("CO"):
                    return "Colombia"
                case("CR"):
                    return "Costa Rica"
                case("CU"):
                    return "Cuba"
                case("CV"):
                    return "Cape Verd"
                case("CX"):
                    return "Christmas Island"
                case("CY"):
                    return "Cyprus"
                case("CZ"):
                    return "Czech Republic"
                case("DE"):
                    return "Germany"
                case("DJ"):
                    return "Djibouti"
                case("DK"):
                    return "Denmark"
                case("DM"):
                    return "Dominica"
                case("DO"):
                    return "Dominican Republic"
                case("DZ"):
                    return "Algeria"
                case("EC"):
                    return "Ecuador"
                case("EE"):
                    return "Estonia"
                case("EG"):
                    return "Egypt"
                case("EH"):
                    return "Western Sahara"
                case("ER"):
                    return "Eritrea"
                case("ES"):
                    return "Spain"
                case("ET"):
                    return "Ethiopia"
                case("FI"):
                    return "Finland"
                case("FJ"):
                    return "Fiji"
                case("FK"):
                    return "Falkland Islands"
                case("FM"):
                    return "Micronesia, Federated States of"
                case("FO"):
                    return "Faroe Islands"
                case("FR"):
                    return "France"
                case("FX"):
                    return "France, Metropolitan"
                case("GA"):
                    return "Gabon"
                case("GB"):
                    return "United Kingdom"
                case("GD"):
                    return "Grenada"
                case("GE"):
                    return "Georgia"
                case("GF"):
                    return "French Guiana"
                case("GH"):
                    return "Ghana"
                case("GI"):
                    return "Gibraltar"
                case("GL"):
                    return "Greenland"
                case("GM"):
                    return "Gambia"
                case("GN"):
                    return "Guinea"
                case("GP"):
                    return "Guadeloupe"
                case("GQ"):
                    return "Equatorial Guinea"
                case("GR"):
                    return "Greece"
                case("GS"):
                    return "South Georgia"
                case("GT"):
                    return "Guatemala"
                case("GU"):
                    return "Guam"
                case("GW"):
                    return "Guinea-Bissau"
                case("GY"):
                    return "Guyana"
                case("HK"):
                    return "Hong Kong"
                case("HM"):
                    return "Heard Island"
                case("HN"):
                    return "Honduras"
                case("HR"):
                    return "Croatia"
                case("HT"):
                    return "Haiti"
                case("HU"):
                    return "Hungary"
                case("ID"):
                    return "Indonesia"
                case("IE"):
                    return "Ireland"
                case("IL"):
                    return "Israel"
                case("IN"):
                    return "India"
                case("IO"):
                    return "British Indian Ocean Territory"
                case("IQ"):
                    return "Iraq"
                case("IR"):
                    return "Iran, Islamic Republic of"
                case("IS"):
                    return "Iceland"
                case("IT"):
                    return "Italy"
                case("JM"):
                    return "Jamaica"
                case("JO"):
                    return "Jordan"
                case("JP"):
                    return "Japan"
                case("KE"):
                    return "Kenya"
                case("KG"):
                    return "Kyrgyzstan"
                case("KH"):
                    return "Cambodia"
                case("KI"):
                    return "Kiribati"
                case("KM"):
                    return "Comoros"
                case("KN"):
                    return "St. Kitts and Nevis"
                case("KP"):
                    return "Korea, Democratic People's Republic of"
                case("KR"):
                    return "Korea"
                case("KW"):
                    return "Kuwait"
                case("KY"):
                    return "Cayman Islands"
                case("KZ"):
                    return "Kazakhstan"
                case("LA"):
                    return "Lao"
                case("LB"):
                    return "Lebanon"
                case("LC"):
                    return "St. Lucia"
                case("LI"):
                    return "Liechtenstein"
                case("LK"):
                    return "Sri Lanka"
                case("LR"):
                    return "Liberia"
                case("LS"):
                    return "Lesotho"
                case("LT"):
                    return "Lithuania"
                case("LU"):
                    return "Luxembourg"
                case("LV"):
                    return "Latvia"
                case("LY"):
                    return "Libyan Arab Jamahiriya"
                case("MA"):
                    return "Morocco"
                case("MC"):
                    return "Monaco"
                case("MD"):
                    return "Moldova, Republic of"
                case("MG"):
                    return "Madagascar"
                case("MH"):
                    return "Marshall Islands"
                case("MK"):
                    return "Macedonia, the Former Yugoslav Republic of"
                case("ML"):
                    return "Mali"
                case("MM"):
                    return "Myanmar"
                case("MN"):
                    return "Mongolia"
                case("MO"):
                    return "Macau"
                case("MP"):
                    return "Northern Mariana Islands"
                case("MQ"):
                    return "Martinique"
                case("MR"):
                    return "Mauritania"
                case("MS"):
                    return "Montserrat"
                case("MT"):
                    return "Malta"
                case("MU"):
                    return "Mauritius"
                case("MV"):
                    return "Maldives"
                case("MW"):
                    return "Malawi"
                case("MX"):
                    return "Mexico"
                case("MY"):
                    return "Malaysia"
                case("MZ"):
                    return "Mozambique"
                case("NA"):
                    return "Namibia"
                case("NC"):
                    return "New Caledonia"
                case("NE"):
                    return "Niger"
                case("NF"):
                    return "Norfolk Island"
                case("NG"):
                    return "Nigeria"
                case("NI"):
                    return "Nicaragua"
                case("NL"):
                    return "Netherlands"
                case("NO"):
                    return "Norway"
                case("NP"):
                    return "Nepal"
                case("NR"):
                    return "Nauru"
                case("NU"):
                    return "Niue"
                case("NZ"):
                    return "New Zealand"
                case("OM"):
                    return "Oman"
                case("PA"):
                    return "Panama"
                case("PE"):
                    return "Peru"
                case("PF"):
                    return "French Polynesia"
                case("PG"):
                    return "Papua New Guinea"
                case("PH"):
                    return "Philippines"
                case("PK"):
                    return "Pakistan"
                case("PL"):
                    return "Poland"
                case("PM"):
                    return "St. Pierre"
                case("PN"):
                    return "Pitcairn"
                case("PR"):
                    return "Puerto Rico"
                case("PS"):
                    return "Palestinian Territory"
                case("PT"):
                    return "Portugal"
                case("PW"):
                    return "Palau"
                case("PY"):
                    return "Paraguay"
                case("QA"):
                    return "Qatar"
                case("RE"):
                    return "Reunion"
                case("RO"):
                    return "Romania"
                case("RU"):
                    return "Russian Federation"
                case("RW"):
                    return "Rwanda"
                case("SA"):
                    return "Saudi Arabia"
                case("SB"):
                    return "Solomon Islands"
                case("SC"):
                    return "Seychelles"
                case("SD"):
                    return "Sudan"
                case("SE"):
                    return "Sweden"
                case("SG"):
                    return "Singapore"
                case("SH"):
                    return "St. Helena"
                case("SI"):
                    return "Slovenia"
                case("SJ"):
                    return "Svalbard and Jan Mayen"
                case("SK"):
                    return "Slovakia"
                case("SL"):
                    return "Sierra Leone"
                case("SM"):
                    return "San Marino"
                case("SN"):
                    return "Senegal"
                case("SO"):
                    return "Somalia"
                case("SR"):
                    return "Suriname"
                case("ST"):
                    return "Sao Tome and Principe"
                case("SV"):
                    return "El Salvador"
                case("SY"):
                    return "Syrian Arab Republic"
                case("SZ"):
                    return "Swaziland"
                case("TC"):
                    return "Turks and Caicos Islands"
                case("TD"):
                    return "Chad"
                case("TF"):
                    return "French Southern Territories"
                case("TG"):
                    return "Togo"
                case("TH"):
                    return "Thailand"
                case("TJ"):
                    return "Tajikistan"
                case("TK"):
                    return "Tokelau"
                case("TM"):
                    return "Turkmenistan"
                case("TN"):
                    return "Tunisia"
                case("TO"):
                    return "Tonga"
                case("TL"):
                    return "Timor-Leste"
                case("TR"):
                    return "Turkey"
                case("TT"):
                    return "Trinidad and Tobago"
                case("TV"):
                    return "Tuvalu"
                case("TW"):
                    return "Taiwan"
                case("TZ"):
                    return "Tanzania"
                case("UA"):
                    return "Ukraine"
                case("UG"):
                    return "Uganda"
                case("UM"):
                    return "US (Island)"
                case("US"):
                    return "United States"
                case("UY"):
                    return "Uruguay"
                case("UZ"):
                    return "Uzbekistan"
                case("VA"):
                    return "Holy See"
                case("VC"):
                    return "St. Vincent"
                case("VE"):
                    return "Venezuela"
                case("VG"):
                    return "Virgin Islands, British"
                case("VI"):
                    return "Virgin Islands, U.S."
                case("VN"):
                    return "Vietnam"
                case("VU"):
                    return "Vanuatu"
                case("WF"):
                    return "Wallis and Futuna"
                case("WS"):
                    return "Samoa"
                case("YE"):
                    return "Yemen"
                case("YT"):
                    return "Mayotte"
                case("RS"):
                    return "Serbia"
                case("ZA"):
                    return "South Africa"
                case("ZM"):
                    return "Zambia"
                case("ME"):
                    return "Montenegro"
                case("ZW"):
                    return "Zimbabwe"
                case("A1"):
                    return "Unknown - Anonymous Proxy"
                case("A2"):
                    return "Satellite Provider"
                case("O1"):
                    return "Other"
                case("AX"):
                    return "Aland Islands"
                case("GG"):
                    return "Guernsey"
                case("IM"):
                    return "Isle of Man"
                case("JE"):
                    return "Jersey"
                case("BL"):
                    return "St. Barthelemy"
                case("MF"):
                    return "Saint Martin"
                default:
                    return "Unknown"
            }
        },
        setMania(){
            var vm = this
            vm.select_mode = 'mania'
            vm.select_relax = 'vanilla'
        },
        checkparams(){
            var vm = this;
            if (vm.page == null) {
                vm.page = 0;
            }
        },
        addCommas(nStr){
            nStr += '';
            var x = nStr.split('.');
            var x1 = x[0];
            var x2 = x.length > 1 ? '.' + x[1] : '';
            var rgx = /(\d+)(\d{3})/;
            while (rgx.test(x1)) {
                x1 = x1.replace(rgx, '$1' + ',' + '$2');
            }
            return x1 + x2;
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
section.leaderboard-section > .leaderboard-header { background-image: linear-gradient(to right, rgba(0, 0, 0, 0.82), rgba(58, 58, 58, 0.7)), url('https://assets.ppy.sh/beatmaps/707032/covers/cover@2x.jpg?1622784772'); background-position: center; background-size: cover; display: flex; position: relative; flex-direction: column; padding: 20px 0; margin-bottom: 10px; }
.leaderboard-header > .header-image { position: absolute; left: 0; top: 0; }
.leaderboard-header > .leaderboard-selectors { display: flex; flex-direction: column; margin-bottom: 10px; align-items: center; padding: 10px;}
.leaderboard-selectors > ul { list-style: none; display: flex; flex-direction: row; position: relative; flex-wrap: wrap; justify-content: center; }
.leaderboard-selectors > ul:not(:last-child) { margin-bottom: 20px; } 
.leaderboard-selectors > ul > li { cursor: pointer; }
.leaderboard-selectors > ul > li:not(:last-child) { margin-right: 10px; }
.leaderboard-selectors > ul > li > a { opacity: 0.5; color: rgb(255, 255, 255); position: relative; font-size: 16px; padding: 5px 8px; transition: opacity 200ms ease-in-out; }
.leaderboard-selectors > ul > li > a::after { border-radius: 12px; position: absolute; left: 0; bottom: 0; width: 100%; height: 2px; content: ''; background-color: rgb(93, 214, 174); transition: height 200ms ease-in-out, opacity 200ms ease-in-out; }
.leaderboard-selectors > ul > li > a:hover { opacity: 0.8; }
.leaderboard-selectors > ul > li > a:hover::after { height: 3px; }
.leaderboard-selectors > ul > li > a > i { color: #fff; }
.leaderboard-selectors > ul > li > a.active { opacity: 1; font-weight: 500; }
.leaderboard-selectors > ul > li > a.active::after { height: 4px; }

section.leaderboard--body { max-width: 95%; margin: 0 auto; box-shadow: 0 0 5px black; }
.force { color: rgb(49, 33, 136); transition: color 200ms ease-in-out; font-weight: bold; }
.leaderboard-body { overflow-x: auto; }
.leaderboard-body > table { padding: 5px 10px 10px 10px; color: #5f5f77; white-space: nowrap; text-align: center; border-spacing: 0 3px; border-collapse: separate; }
.leaderboard-body > table > thead { position: relative; font-size: 13px; }
.leaderboard-body > table > thead > tr > th { padding: 5px 10px; }
.leaderboard-body > table > thead > tr > th.username { width: 100%; }
.leaderboard-body > table > tbody { font-size: 0.95em; }
.leaderboard-body > table > tbody > tr > td { background-color: #d4d4d659; padding: 5px 10px; transition: background-color 200ms ease-in-out; }
.leaderboard-body > table > tbody > tr:nth-child(odd) > td { background-color: #a19fb84b; } 
.leaderboard-body > table > tbody > tr:hover > td { background-color: #a6a6d37a; }
.leaderboard-body > table > tbody > tr > td:first-child { border-radius: 8px 0 0 8px; }
.leaderboard-body > table > tbody > tr > td:last-child { border-radius: 0 8px 8px 0; }
.leaderboard-body > table > tbody > tr > td.index { font-style: italic; }
.leaderboard-body > table > tbody > tr > td.username > div { display: flex; }
.leaderboard-body > table > tbody > tr > td.username > div > span { transition: box-shadow 200ms ease-in-out; }
.leaderboard-body > table > tbody > tr > td.username > div > span:hover { box-shadow: 0 0 4px rgba(0, 0, 0, 0.5); }
.leaderboard-body > table > tbody > tr > td.username > div > a { color: rgb(49, 33, 136); font-weight: bold; }
.leaderboard-body > table > tbody > tr > td.username > div > a:visited { color: rgb(49, 33, 136); }

@media screen and (max-width: 1280px) {
    .leaderboard-selectors > ul > l i> a { font-size: 14px; }
}
@media screen and (max-width: 400px) {
    .leaderboard-selectors > ul.leaderboard-mode-selector > li:nth-of-type(2) { margin-bottom: 10px; }
}
</style>