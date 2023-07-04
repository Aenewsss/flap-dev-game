import { _decorator, Canvas, Component, director, Node, UITransform, Vec3 } from 'cc';
import { GameCtrl } from "./GameCtrl";
const { ccclass, property } = _decorator;

@ccclass('background')
export class background extends Component {

    @property({
        type: Node,
        tooltip: 'Background 1 is here'
    })
    public background1: Node;

    @property({
        type: Node,
        tooltip: 'Background 2 is here'
    })
    public background2: Node;

    public backgroundWidth1: number;
    public backgroundWidth2: number;

    public tempStartLocation1 = new Vec3;
    public tempStartLocation2 = new Vec3;

    public gameCtrlSpeed = new GameCtrl;
    public gameSpeed: number;

    protected onLoad(): void {
        this.startUp()
    }

    startUp() {
        this.backgroundWidth1 = this.background1.getComponent(UITransform).width;
        this.backgroundWidth2 = this.background2.getComponent(UITransform).width;

        this.tempStartLocation1.x = 0;
        this.tempStartLocation2.x = this.backgroundWidth1;

        this.background1.setPosition(this.tempStartLocation1);
        this.background2.setPosition(this.tempStartLocation2);
    }

    update(deltaTime: number) {
        this.gameSpeed = this.gameCtrlSpeed.speed;
        
        this.tempStartLocation1 = this.background1.position;
        this.tempStartLocation2 = this.background2.position;

        this.tempStartLocation1.x -= this.gameSpeed * deltaTime;
        this.tempStartLocation2.x -= this.gameSpeed * deltaTime;

        const scene = director.getScene();
        const canvas = scene.getComponentInChildren(Canvas);

        //toda vez que sai da tela o componente volta ao lado direito da tela

        if (this.tempStartLocation1.x <= (0 - this.backgroundWidth1)) {
            this.tempStartLocation1.x = canvas.getComponent(UITransform).width;
        }

        if (this.tempStartLocation2.x <= (0 - this.backgroundWidth2)) {
            this.tempStartLocation2.x = canvas.getComponent(UITransform).width;
        }

        this.background1.setPosition(this.tempStartLocation1)
        this.background2.setPosition(this.tempStartLocation2)
    }
}


