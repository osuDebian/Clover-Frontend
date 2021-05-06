<script>

</script>


<style>
    footer{
        min-height: 90px;
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        background-color: #080428;
        display: flex;
        align-items: center;
    }

    footer > div:nth-of-type(2):after{content: ''; visibility: hidden; display: block; clear: both;}
    
    footer > div{
        position: relative;
        margin: 0 auto;
        text-align: center;
        display: inline-block;
    }

    footer > div > div:first-child{
        color: white;
        margin-bottom: 12px;
        font-size: 16px;
    }

    footer > div a{
        text-decoration: none;
        padding: 6px 12px;
        background-color: rgb(16 12 49);
        border-radius: 4px;
        transition: .15s ease-in-out all;
        color: white;
    }

    footer > div a:hover{
        background-color: #30287a;
        color: white;
    }
</style>

<footer>
    <div>
        <div>
            osu!Debian ♥ since 2020.05.05
        </div>
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
    </div>
</footer>
