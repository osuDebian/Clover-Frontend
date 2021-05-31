<script>

</script>


<style>
    footer{
        margin-top: 10px;
        padding: 25px 0;
        width: 100%;
        background-color: #080428;
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    footer > div:nth-of-type(2):after{content: ''; visibility: hidden; display: block; clear: both;}
    
    footer > div{
        position: relative;
        margin: 0 auto;
        text-align: center;
        display: flex;
    }

    footer > span{
        color: white;
        margin-bottom: 8px;
        font-size: 16px;
    }

    footer > div a {
        text-decoration: none;
        padding: 6px 12px;
        background-color: rgb(16 12 49);
        border-radius: 4px;
        transition: .15s ease-in-out all;
        color: white;
    }

    footer > div a:not(:nth-child( n + 3)) {
        margin-right: 10px;
    }

    footer > div a:hover{
        background-color: #30287a;
        color: white;
    }
</style>

<footer>
    <span>osu!Debian ♥ since 2020.05.05</span>
    <div>
        <a href="terms">
            Terms of service
        </a>
        <a href=".">
            KR
        </a>
        <a href="https://github.com/osuDebian/Clover-Frontend">
            Source Code
        </a>
    </div>
</footer>
