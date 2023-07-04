import { _decorator, Component, find, Node, screen, UITransform, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

const random = (min: number, max: number) => Math.random() * (max - min) + min;

@ccclass('Tags')
export class Tags extends Component {
    @property({
        type: Node,
        tooltip: '<br> tag'
    })
    public brTag: Node;

    @property({
        type: Node,
        tooltip: '<hr> tag'
    })
    public hrTag: Node;

    public tempStartLocationBr: Vec3 = new Vec3(0, 0, 0);
    public tempStartLocationHr: Vec3 = new Vec3(0, 0, 0);
    public scene = screen.windowSize;

    public game;
    public tagSpeed: number;
    public tempSpeed: number;

    private isPass: boolean;

    protected onLoad(): void {
        this.game = find("GameCtrl").getComponent("GameCtrl")
        this.tagSpeed = this.game.badTagSpeed;

        this.initPosition();

        this.isPass = false;
    }

    initPosition() {

        console.log('caiu aqui')

        this.tempStartLocationBr.x = (this.brTag.getComponent(UITransform).width + this.scene.width)
        this.tempStartLocationHr.x = (this.brTag.getComponent(UITransform).width + this.scene.width)

        let gap = random(90, 100);
        let brHeight = random(0, 450);

        this.tempStartLocationBr.y = brHeight;
        this.tempStartLocationHr.y = (brHeight - (gap * 10));

        this.brTag.setPosition(this.tempStartLocationBr);
        this.hrTag.setPosition(this.tempStartLocationHr);
    }

    protected update(deltaTime: number): void {

        this.tempSpeed = this.tagSpeed * deltaTime;

        this.tempStartLocationBr = this.brTag.position;
        this.tempStartLocationHr = this.hrTag.position;

        this.tempStartLocationBr.x -= this.tempSpeed;
        this.tempStartLocationHr.x -= this.tempSpeed;

        this.brTag.setPosition(this.tempStartLocationBr);
        this.hrTag.setPosition(this.tempStartLocationHr);

        if (!this.isPass && this.brTag.position.x <= 0) {
            this.isPass = true;
            this.game.passTag();
        }

        if (this.brTag.position.x < (0 - this.scene.width)) {
            this.game.createTag();
            this.destroy();
        }
    }
}


