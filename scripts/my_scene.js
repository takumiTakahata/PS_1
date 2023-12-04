
// MyScene1クラス
// 他のJSファイルから呼び出された場合はシーンを返す
class MyScene extends Phaser.Scene {

    // 継承した「Phaser.Scene」クラスのコンストラクタの呼び出し
    constructor() {
        super({ key: 'MyScene', active: true });
    }

    // シーンの事前読み込み処理
    preload() {
        // 画像の読み込み(使用する時の名前, パス)
        this.load.image('background', 'assets/background.png');
        this.load.image('taro', 'assets/taro.png');
        this.load.image('jori', 'assets/taro.png');
        this.load.image('hanako', 'assets/hanako.png');
    }

    // シーン初期化処理
    create() {
        // 単体画像をシーンに追加(X座標,Y座標,画像名)
        this.add.image(D_WIDTH / 2, D_HEIGHT / 2, 'background');
        this.text = this.add.text(600, 400, 'MyWorld').setFontSize(32).setColor('#ff0');
        this.player = this.add.image(D_WIDTH / 2, D_HEIGHT / 2, 'taro');
        // this.player1 = this.add.image(D_WIDTH / 2, D_HEIGHT / 2, 'jori');

        // プレイヤーの移動方向フラグを設定　１：右向き　−１：左向き
        // this.player_direction = 1;
        // this.player.angle = 0

        this.text = this.add.text(100, 50, '').setFontSize(32).setColor('#ff0');

        ///WASDキーを検知できるようにする
        this.keys = {};
        this.keys.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keys.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keys.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keys.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this._timeCounter = 0; 
        this.time = 0;
        this.player2 = this.add.image(100, 100, 'hanako');
        this.player2.visible = false;

        this.physics.world.enable([this.player, this.player2]);
        
    }

    // 毎フレーム実行される繰り返し処理
    update(time, delta) {
        // // プレイヤーの向きフラグを変更
        // if (this.player.y >= D_HEIGHT - 100) this.player_direction = -1;
        // if (this.player.y <= 100) this.player_direction = 1;
        // // プレイヤーの移動
        // if (this.player_direction == 1) {
        //     this.player.y -= 5;// 横方向へ移動を設定
        //     this.player.x += 5;// 横方向へ移動を設定
        //     // 回転角度を更新
        //     this.player.angle += 5;
        //     // 回転角度を設定
        //     this.player.setAngle(this.player.angle);
        // } else {
        //     this.player.setVelocityX(0);// 横方向の速度を0
        //     this.player.setVelocityY(0);// 縦方向の速度を0
        // }

        // 1-5
        let cursors = this.input.keyboard.createCursorKeys();
        if (cursors.left.isDown) {
            this.player.x -= 5;
        } else if (cursors.right.isDown) {
            this.player.x += 5;
        } else if (cursors.up.isDown) {
            this.player.y -= 5;
        } else if (cursors.down.isDown) {
            this.player.y += 5;
        }

        // 1-6
        // キーボード入力の検知
        if (this.keys.keyA.isDown) {
            this.text.setText('Hello!'); // テキストを設定
        } else if (this.keys.keyS.isDown) {
            this.text.setText('Hey!'); // テキストを設定
        } else if (this.keys.keyD.isDown) {
            this.text.setText(''); // テキストを空にする
        }

        //1-7 
        // if (this.keys.keyW.isDown) {
        //     // hanakoオブジェクトを動的に配置
        //     this.player2 = this.add.image(100, 100, 'hanako');
        //     this.player2.x = Phaser.Math.Between(100, 400);
        // }

        // 毎フレーム事にタイマーを更新
        this._timeCounter += delta;
        // _timeCounterが1000になった1秒
        if (this._timeCounter > 1000) {
        // 3000ミリ秒経過したのでカウンターをリセット
        this._timeCounter = 0;
        // 残り時間を増やす
        this.time++;
        // 3秒経ったらhanakoオブジェクトをランダムな座標に配置
        if (this.time === 3) {
            this.player2.visible = true; // オブジェクトを表示にする
            this.player2.x = Phaser.Math.Between(200, 400);
            this.player2.y = Phaser.Math.Between(100, 200);
        }
        }
        if (this.physics.overlap(this.player, this.player2)) {
            this.handleCollision();
        }
    }
// 1-9
// 衝突時の処理
handleCollision(player, player2) {
    this.text = this.add.text(100, 150, '痛い!').setFontSize(32).setColor('#ff0');
}
}