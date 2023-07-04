import { _decorator, Component, instantiate, Node, NodePool, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TagPool')
export class TagPool extends Component {

    @property({
        type: Prefab
    })
    public prefabTags = null;

    @property({
        type: Node
    })
    public tagPoolHome: Node;

    public pool = new NodePool;

    public createTag;

    initPool() {
        let initCount = 3;

        for (let i = 0; i < initCount; i++) {
            this.createTag = instantiate(this.prefabTags);

            if (i == 0) this.tagPoolHome.addChild(this.createTag)
            else this.pool.put(this.createTag)
        }
    }

    addPool() {
        if (this.pool.size() > 0) this.createTag = this.pool.get();
        else this.createTag = instantiate(this.prefabTags);

        this.tagPoolHome.addChild(this.createTag);
    }

    reset(){
        this.tagPoolHome.removeAllChildren();
        this.pool.clear();
        this.initPool();
    }

}


