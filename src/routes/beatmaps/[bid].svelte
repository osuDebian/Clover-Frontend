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
{JSON.stringify(scoreData.Beatmap, null, 4)}
<br>
<br>
<br>
<br>
ㅎ3 {bid}