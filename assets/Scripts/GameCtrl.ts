import { _decorator, CCInteger, Collider2D, Component, Contact2DType, director, EventKeyboard, Input, input, IPhysics2DContact, KeyCode, Node } from 'cc';
import { Eu } from "./Eu";
import { Results } from "./Results";
import { TagPool } from "./TagPool";
const { ccclass, property } = _decorator;

@ccclass('GameCtrl')
export class GameCtrl extends Component {

    @property({
        type: CCInteger
    })
    public speed: number = 300;

    @property({
        type: CCInteger
    })
    public badTagSpeed: number = 200;

    @property({
        type: Eu
    })
    public eu: Eu;

    @property({
        type: TagPool
    })
    public tagQueue: TagPool;

    @property({
        type: Results,
        tooltip: 'Results here'
    })
    public results: Results;

    public isOver: boolean;

    protected onLoad(): void {
        this.initListener();
        this.results.resetScore();
        this.isOver = true;
        director.pause();
    }

    initListener() {
        this.node.on(Node.EventType.TOUCH_START, () => {
            if (this.isOver) {
                this.resetGame();
                this.eu.resetEu();
                this.startGame();
            } else this.eu.fly();
        })
    }

    startGame() {
        this.results.hideResults();
        director.resume();
    }

    gameOver() {
        this.results.showResults();
        this.isOver = true
        director.pause();
    }
    resetGame() {
        this.results.resetScore();
        this.tagQueue.reset();
        this.isOver = false;
        this.startGame();
    }

    passTag() {
        this.results.addScore()
    }

    createTag() {
        this.tagQueue.addPool();
    }

    contactGroundTag() {
        let collider = this.eu.getComponent(Collider2D);

        if (collider) collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        this.eu.hitSomething = true;
    }

    euStruck() {
        this.contactGroundTag();

        if (this.eu.hitSomething) this.gameOver();
    }

    protected update(deltaTime: number): void {
        if (!this.isOver) this.euStruck();
    }

}