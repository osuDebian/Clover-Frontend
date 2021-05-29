<script>
	
</script>

<style>
	div.info {
		display: flex;
		position: relative;
		max-height: 440px;
		flex-direction: row;
		padding: 2em 2em 0 2em;
		background-color: #151423;
		border-radius: 20px;
		color: white;
	}

	div.info div.information {
		flex: 2;
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: left;
		font-size: 14.5px;
		margin-left: 15px;
	}

	@media screen and (max-width: 576px) {
		div.info { flex-direction: column; }
	}

	@media screen and (min-width: 578px) {
		div.info { flex-direction: row; }
		div.btns { flex-direction: column !important; }
	}

	@media screen and (min-width: 991px) {
		div.info { flex-direction: row; }
		div.btns { flex-direction: row !important; }
	}

	div.info div.information div.Name h1 {
		display: block;
		font-size: 42px;
	}

	div.info div.Character {
		background: url('/images/chac.png') center / contain no-repeat;
		position: relative;
		display: flex;
		justify-content: right;
		flex: 1.5;
	}

	div.info div.information div.txt {
		/* padding: 0 0 50px 0; */
		padding: 50px 0;
		/* text-align: ; */
	}

	div.info div.information div.btns {
		display: flex;
		flex-direction: row;
		margin-bottom: 40px;
	}

	div.btn {
		padding: 12.5px 55px;
		display: inline-flex;
		text-align: center;
		color: white;
		background-image: url('/images/button.svg');
		background-size: 150%;
		transition: background-position 200ms ease-in-out;
		border-radius: 25px;
		margin-right: 10px;
	}

	div.btn:hover {
		background-position-x: -50px;
	}

	div.btn.pink {
		background-color: #f6a;
		box-shadow: 0 4px #86386b, 0 2px 2px #000;
	}

	div.btn.blue {
		background-color: rgb(102, 117, 255);
		box-shadow: 0 4px #393886, 0 2px 2px #000;
	}

	div.btn.green {
		background-color: rgb(75, 190, 114);
		box-shadow: 0 4px #38864b, 0 2px 2px #000;
	}

	div.beatmaps {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		column-gap: 2em;
		row-gap: 1em;
		margin-top: 100px;
		position: relative;
	}

	div.beatmaps .beatmap-block {
		width: 100%;
		position: relative;
		box-shadow: 0 3px 5px 1 rgb(0 0 0 / 40%);
		transition: 200ms box-shadow;
		overflow: hidden;
		display: flex;
		align-items: center;
		padding: 8px;
		height: 100px;
		background-color: #121123;
		border-radius: 12px;
		transition: background-color 200ms ease-in-out, transform 100ms ease-in-out;
		z-index: 0;
	}

	div.beatmaps .beatmap-block:hover{
		background-color: #0e0e14;
		position: relative;
		transform: scale(1.05);
		z-index: 1233;
	}

	div.beatmaps a.beatmap-block div.beatmap-preview {
		width: 100px;
		height: 100px;
		border-radius: 8px;
		background-position: center;
		background-size: cover;
		margin-right: 10px;
	}

	div.beatmaps a.beatmap-block div.beatmap-info {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	div.beatmaps a.beatmap-block div.beatmap-info .title{
		font-size: 20px;
		font-weight: bold;
	}

	div.beatmaps a.beatmap-block div.beatmap-info .artist{
		font-size: 16px;
	}

	div.beatmaps a.beatmap-block div.beatmap-info div.beatmap-footer{
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		margin-top: 10px;
		font-size: 14px;
	}

	div.beatmaps a.beatmap-block div.beatmap-info div.beatmap-footer .ranked {
		padding: 2px 5px;
		background-color: rgb(29, 117, 63);
		border-radius: 8px;
		padding-right: 8px;
	}

	div.beatmaps a.beatmap-block div.beatmap-info div.beatmap-footer .beatmap-worked {
		display: flex;
		align-items: baseline;
	}

	div.go-button {
		margin-left: 5px;
		padding: 2.5px 5px;
		background-color: #303144;
		border-radius: 8px;
	}
</style>

<svelte:head>
	<title>개발중인 사이트임 ㅇㅇ</title>
</svelte:head>


<div class="info">
	<div class="information">
		<div class="txt">
			<div class="Name">
				<h1>osu!debian</h1>
			</div>
			osu!debian is one of the private server on South Korea.
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit quidem quis ab, tenetur consequatur quae illo voluptatem nostrum architecto excepturi amet aliquid atque reprehenderit, nihil in pariatur iure assumenda inventore!
		</div>
		<div class="btns">
			<a href="." class="href">
				<div class="btn pink">
					회원가입
				</div>
			</a>
			<a href="." class="href">
				<div class="btn blue">
					회원가입
				</div>
			</a>
			<a href="." class="href">
				<div class="btn green">
					회원가입
				</div>
			</a>
		</div>
	</div>
	<div class="Character"></div>
</div>

<div class="beatmaps">
	<a href="/beatmaps/123456" class="beatmap-block">
		<div class="beatmap-preview" style='background-image: url("https://b.ppy.sh/thumb/1274098l.jpg")'></div>
		<div class="beatmap-info">
			<span class="title">kimi no bouken</span>
			<span class="artist">by idkidkidk</span>
			<span class="mapper">mapped by sotarks</span>
			<div class="beatmap-footer">
				<span class="ranked">RANKED</span>
				<div class="beatmap-worked">
					<span>1hours ago</span>
					<div class="go-button">
						<i class="fas fa-arrow-right"></i>
					</div>
				</div>
			</div>
		</div>
	</a>
	<a href="/beatmaps/123456" class="beatmap-block">
		<div class="beatmap-preview" style='background-image: url("https://b.ppy.sh/thumb/1274098l.jpg")'></div>
		<div class="beatmap-info">
			<span class="title">kimi no bouken</span>
			<span class="artist">by idkidkidk</span>
			<span class="mapper">mapped by sotarks</span>
			<div class="beatmap-footer">
				<span class="ranked">RANKED</span>
				<div class="beatmap-worked">
					<span>1hours ago</span>
					<div class="go-button">
						<i class="fas fa-arrow-right"></i>
					</div>
				</div>
			</div>
		</div>
	</a>
	<a href="/beatmaps/123456" class="beatmap-block">
		<div class="beatmap-preview" style='background-image: url("https://b.ppy.sh/thumb/1274098l.jpg")'></div>
		<div class="beatmap-info">
			<span class="title">kimi no bouken</span>
			<span class="artist">by idkidkidk</span>
			<span class="mapper">mapped by sotarks</span>
			<div class="beatmap-footer">
				<span class="ranked">RANKED</span>
				<div class="beatmap-worked">
					<span>1hours ago</span>
					<div class="go-button">
						<i class="fas fa-arrow-right"></i>
					</div>
				</div>
			</div>
		</div>
	</a>
	<a href="/beatmaps/123456" class="beatmap-block">
		<div class="beatmap-preview" style='background-image: url("https://b.ppy.sh/thumb/1274098l.jpg")'></div>
		<div class="beatmap-info">
			<span class="title">kimi no bouken</span>
			<span class="artist">by idkidkidk</span>
			<span class="mapper">mapped by sotarks</span>
			<div class="beatmap-footer">
				<span class="ranked">RANKED</span>
				<div class="beatmap-worked">
					<span>1hours ago</span>
					<div class="go-button">
						<i class="fas fa-arrow-right"></i>
					</div>
				</div>
			</div>
		</div>
	</a>
</div>
