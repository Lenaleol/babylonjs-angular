import {Component, NgZone, OnInit} from '@angular/core';
import {
    ArcRotateCamera,
    Color3, CSG, DirectionalLight,
    Mesh, MultiMaterial,
    Scene,
    StandardMaterial,
    Vector3
} from '@babylonjs/core';
import {Renderer} from '../../interfaces/renderer';

@Component({
    selector: 'app-geometries',
    templateUrl: './geometries.component.html'
})
export class GeometriesComponent  extends Renderer implements OnInit {

    constructor(public zone: NgZone) {
        super(zone)
    }

    ngOnInit() {
        super.ngOnInit();
        this.initScene(this.scene);
        this.createCamera(this.scene);
    }

    public createCamera(scene: Scene) {
        this.camera = new ArcRotateCamera('Camera', 0, 0, 10, new Vector3(0, 0, 0), scene);
        this.camera.setPosition(new Vector3(10, 10, 10));
        this.camera.minZ = 10.0;
        this.camera.attachControl(this.canvasElement.nativeElement, true);
    }

    public initScene(scene: Scene) {
        const light = new DirectionalLight('dir01', new Vector3(0, -0.5, -1.0), scene);
        light.position = new Vector3(20, 150, 70);

        scene.ambientColor = new Color3(0.3, 0.3, 0.3);

        const sourceMat = new StandardMaterial('sourceMat', scene);
        sourceMat.wireframe = true;
        sourceMat.backFaceCulling = false;

        const a = Mesh.CreateSphere('sphere', 16, 4, scene);
        const b = Mesh.CreateBox('box', 4, scene);
        const c = Mesh.CreateBox('box', 4, scene);

        a.material = sourceMat;
        b.material = sourceMat;
        c.material = sourceMat;

        a.position.y += 5;
        b.position.y += 2.5;
        c.position.y += 3.5;
        c.rotation.y += Math.PI / 8.0;

        const aCSG = CSG.FromMesh(a);
        const bCSG = CSG.FromMesh(b);
        const cCSG = CSG.FromMesh(c);

        const mat0 = new StandardMaterial('mat0', scene);
        const mat1 = new StandardMaterial('mat1', scene);

        mat0.diffuseColor.copyFromFloats(0.8, 0.2, 0.2);
        mat0.backFaceCulling = false;

        mat1.diffuseColor.copyFromFloats(0.2, 0.8, 0.2);
        mat1.backFaceCulling = false;

        let subCSG = bCSG.subtract(aCSG);
        let newMesh = subCSG.toMesh('csg', mat0, scene);
        newMesh.position = new Vector3(-10, 0, 0);

        subCSG = aCSG.subtract(bCSG);
        newMesh = subCSG.toMesh('csg2', mat0, scene);
        newMesh.position = new Vector3(10, 0, 0);

        subCSG = aCSG.intersect(bCSG);
        newMesh = subCSG.toMesh('csg3', mat0, scene);
        newMesh.position = new Vector3(0, 0, 10);

        const multiMat = new MultiMaterial('multiMat', scene);
        multiMat.subMaterials.push(mat0, mat1);

        subCSG = bCSG.subtract(cCSG);
        newMesh = subCSG.toMesh('csg4', multiMat, scene, true);
        newMesh.position = new Vector3(0, 0, -10);
    };

}
