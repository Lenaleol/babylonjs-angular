import {Component, NgZone, OnInit} from '@angular/core';
import {
    ArcRotateCamera, BezierCurveEase,
    CircleEase,
    Color3, EasingFunction,
    Mesh,
    PointLight,
    Scene,
    StandardMaterial,
    Vector3,
    Animation
} from '@babylonjs/core';
import {Renderer} from '../../interfaces/renderer';


@Component({
    selector: 'app-bagels',
    templateUrl: './bagels.component.html'
})

export class BagelsComponent extends Renderer implements OnInit {

    constructor(public zone: NgZone) {
        super(zone)
    }

    ngOnInit() {
        super.ngOnInit();
        this.initScene(this.scene);
        this.createCamera(this.scene);
    }

    public createCamera(scene: Scene) {
        this.camera = new ArcRotateCamera('Camera', 0, 0.8, 100, Vector3.Zero(), scene);
        this.camera.attachControl(this.canvasElement.nativeElement, true);
    }

    public initScene(scene: Scene) {
        const light = new PointLight('Omni', new Vector3(0, 100, 100), scene);

        const torus = Mesh.CreateTorus('torus', 8, 2, 32, scene, false);
        torus.position.x = 25;
        torus.position.z = 30;

        const materialBox = new StandardMaterial('texture1', scene);
        materialBox.diffuseColor = new Color3(0, 1, 0);

        const animationTorus = new Animation('torusEasingAnimation', 'position', 30, Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CYCLE);

        const nextPos = torus.position.add(new Vector3(-80, 0, 0));

        const keysTorus = [];
        keysTorus.push({frame: 0, value: torus.position});
        keysTorus.push({frame: 120, value: nextPos});
        animationTorus.setKeys(keysTorus);

        const easingFunction = new CircleEase();

        easingFunction.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);

        animationTorus.setEasingFunction(easingFunction);

        torus.animations.push(animationTorus);

        scene.beginAnimation(torus, 0, 120, true);

        const bezierTorus = Mesh.CreateTorus('torus', 8, 2, 32, scene, false);
        bezierTorus.position.x = 25;
        bezierTorus.position.z = 0;

        const animationBezierTorus = new Animation('animationBezierTorus', 'position', 30, Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CYCLE);
        const keysBezierTorus = [];
        keysBezierTorus.push({frame: 0, value: bezierTorus.position});
        keysBezierTorus.push({frame: 120, value: bezierTorus.position.add(new Vector3(-80, 0, 0))});
        animationBezierTorus.setKeys(keysBezierTorus);
        const bezierEase = new BezierCurveEase(0.32, -0.73, 0.69, 1.59);
        animationBezierTorus.setEasingFunction(bezierEase);
        bezierTorus.animations.push(animationBezierTorus);
        scene.beginAnimation(bezierTorus, 0, 120, true);

        const torus0 = Mesh.CreateTorus('torus', 8, 2, 32, scene, false);
        torus0.position.x = 25;
        torus0.position.z = -30;
        torus0.material = materialBox;

        Animation.CreateAndStartAnimation('anim', torus0, 'position', 30, 120,
            torus0.position, torus0.position.add(new Vector3(-80, 0, 0)));
    }
}
