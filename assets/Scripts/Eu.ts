import { _decorator, Animation, CCFloat, Component, easing, Node, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Eu')
export class Eu extends Component {

    @property({
        type: CCFloat,
        tooltip: 'how high can I fly'
    })
    public jumpHeight: number = 3.5;

    @property({
        type: CCFloat,
        tooltip: 'how long can I fly'
    })
    public jumpDuration: number = 3.5;

    public myAnimation: Animation;
    public myLocation: Vec3;

    public hitSomething: boolean;

    protected onLoad(): void {
        this.resetEu();

        this.myAnimation = this.getComponent(Animation);
    }

    resetEu() {
        this.myLocation = new Vec3(0, 0, 0)
        this.node.setPosition(this.myLocation)
        this.hitSomething = false;
    }

    fly() {
        this.myAnimation.stop();

        tween(this.node.position)
            .to(this.jumpDuration, new Vec3(this.node.position.x, this.node.position.y + this.jumpHeight, 0),
                {
                    easing: 'smooth',
                    onUpdate: (target: Vec3, ratio: number) => {
                        this.node.position = target;
                    }
                })
            .start();

        this.myAnimation.play();
    }


}


