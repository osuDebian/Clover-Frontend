<script context="module">
    import Api from '../GetApi'
    export async function preload(page, session) {
        const { bid } = page.params;
        const scoreData = await Api.scoreData(bid);
        return { scoreData, bid };
    }
</script>

<script>
    export let scoreData;
    export let bid;
</script>

<style>
    @font-face {
        font-family: FontAwesomeExtra;
        src: url(../fonts/extra.ttf) format("truetype")
    }

    .faa {
        font-family: FontAwesomeExtra;
    }

    .fa-extra-mode-osu:before {
        content: "\E800";
    }

    .fa-extra-mode-fruits:before {
        content: "\E801";
    }

    .fa-extra-mode-mania:before {
        content: "\E802";
    }

    .fa-extra-mode-taiko:before {
        content: "\E803";
    }

    /* ?Beatmap Header */
    div.beatmap-information > div.beatmap-header {
        background-color: #4a121f;
        display: flex;
        position: relative;
        padding: 0.65em 1em;
    }

    div.beatmap-information > div.beatmap-header > div.beatmap-header-info {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    div.beatmap-information > div.beatmap-header > div.beatmap-header-info > div.beatmap-header-icon {
        background-image: url("../images/beatmapsets.svg");
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        width: 44px;
        height: 44px;
        color: white;
        display: flex;
        margin-right: 1em;
    }

    div.beatmap-information > div.beatmap-header > div.beatmap-header-info > span {
        color: white;
        font-size: 1.5em;
    }

    div.beatmap-information > div.beatmap-header > div.beatmap-header-mods {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-left: auto;
    }

    div.beatmap-header-mods > div.beatmap-mods {
        margin-right: 15px;
    }
</style>

<section>
    <div class="beatmap-information">
        <div class="beatmap-header">
            <div class="beatmap-header-info">
                <div class="beatmap-header-icon"></div>
                <span>비트맵 정보</span>
            </div>
            <div class="beatmap-header-mods">
                <div class="beatmap-mods">
                    <a href=".">osu!</a>
                </div>
                <div class="beatmap-mods">
                    <a href=".">osu!taiko</a>
                </div>
                <div class="beatmap-mods">
                    <a href=".">osu!catch</a>
                </div>
                <div class="beatmap-mods">
                    <a href=".">osu!mania</a>
                </div>
            </div>
        </div>
        <div class="beatmap-info">
            <div class="beatmap-stats">
                <div class="beatmap-preview">
                    <i class="fas fa-play"></i>
                </div>
                <div class="beatmap-stats-box">
                    <div class="beatmap-stats-info">
                        <div class="beatmap-stats-line">
                            <!-- total length -->
                        </div>        
                        <div class="beatmap-stats-line">
                            <!-- bpm -->
                        </div>           
                        <div class="beatmap-stats-line">
                            <!-- circle count -->
                        </div>     
                        <div class="beatmap-stats-line">
                            <!-- slider count -->
                        </div>                      
                    </div>
                    <div class="beatmap-stats-more-info">
                        <div class="beatmap-stats-line">
                            <span>Circle Size</span>
                            <span>{scoreData.Beatmap.CS}</span>
                        </div>
                        <div class="beatmap-stats-line">
                            <span>HP Drain</span>
                            <span>{scoreData.Beatmap.HP}</span>
                        </div>
                        <div class="beatmap-stats-line">
                            <span>Accuracy</span>
                            <span>{scoreData.Beatmap.OD}</span>
                        </div>
                        <div class="beatmap-stats-line">
                            <span>Approach Rate</span>
                            <span>{scoreData.Beatmap.AR}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="beatmap-diffs">
                <div class="beatmap-diff">
                    <a href="" class="beatmap-diff-icon faa fa-extra-mode-osu"></a>
                </div>
            </div>
        </div>
    </div>
</section>